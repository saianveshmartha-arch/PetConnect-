import React, { useState, useEffect, useCallback } from 'react';
import { Page, Pet, User, Geolocation } from './types';
import { getNearbyPets, getUserProfile } from './services/petService';
import { getUserLocation } from './services/locationService';
import SideNav from './components/SideNav';
import PetCard from './components/PetCard';
import PetProfileModal from './components/PetProfileModal';
import SellPetForm from './components/SellPetForm';
import SearchModal from './components/SearchModal';
import UserProfile from './components/UserProfile';
import PurchaseList from './components/PurchaseList';
import AboutUs from './components/AboutUs';
import BottomBar from './components/BottomBar';
import { MenuIcon, LogoIcon } from './components/Icons';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Home);
  const [pets, setPets] = useState<Pet[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSellOpen, setIsSellOpen] = useState(false);
  const [location, setLocation] = useState<Geolocation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const userLocation = await getUserLocation();
      setLocation(userLocation);
      const [fetchedPets, fetchedUser] = await Promise.all([
        getNearbyPets(),
        getUserProfile()
      ]);
      setPets(fetchedPets);
      setUser(fetchedUser);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch data.');
      // Load mock data even if location fails
      const [fetchedPets, fetchedUser] = await Promise.all([
        getNearbyPets(),
        getUserProfile()
      ]);
      setPets(fetchedPets);
      setUser(fetchedUser);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handlePetAdded = (newPet: Pet) => {
    setPets(prevPets => [newPet, ...prevPets]);
    setIsSellOpen(false);
    setCurrentPage(Page.Home);
  };
  
  const renderContent = () => {
    if (isLoading) {
      return <div className="flex justify-center items-center h-full"><div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-teal-500"></div></div>;
    }
    if (error && !pets.length) {
      return <div className="text-center text-red-400">{error}</div>;
    }

    switch (currentPage) {
      case Page.Home:
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {pets.map(pet => (
              <PetCard key={pet.id} pet={pet} onViewProfile={() => setSelectedPet(pet)} />
            ))}
          </div>
        );
      case Page.Profile:
        return user ? <UserProfile user={user} /> : <div>Loading profile...</div>;
      case Page.Purchases:
        return <PurchaseList />;
      case Page.About:
        return <AboutUs />;
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div className="flex h-screen bg-slate-900 text-slate-200 font-sans">
      <SideNav
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        onSearchClick={() => setIsSearchOpen(true)}
        onSellClick={() => setIsSellOpen(true)}
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="flex md:hidden items-center justify-between p-4 bg-slate-800 border-b border-slate-700 shadow-sm">
          <div className="flex items-center gap-2">
            <LogoIcon className="h-8 w-8 text-teal-400" />
            <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-teal-400 to-cyan-400 text-transparent bg-clip-text">PetConnect</h1>
          </div>
          <button onClick={() => setIsMenuOpen(true)} className="p-2 text-slate-300">
            <MenuIcon className="h-6 w-6" />
          </button>
        </header>
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
            {renderContent()}
        </div>
      </main>

      <BottomBar 
        onSearchClick={() => setIsSearchOpen(true)}
        onSellClick={() => setIsSellOpen(true)}
      />

      {selectedPet && (
        <PetProfileModal pet={selectedPet} onClose={() => setSelectedPet(null)} />
      )}
      {isSearchOpen && (
        <SearchModal onSearch={(query, filters) => console.log(query, filters)} onClose={() => setIsSearchOpen(false)} />
      )}
      {isSellOpen && (
        <SellPetForm onPetAdded={handlePetAdded} onClose={() => setIsSellOpen(false)} />
      )}
    </div>
  );
};

export default App;