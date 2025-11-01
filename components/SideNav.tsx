import React from 'react';
import { Page } from '../types';
import { HomeIcon, ProfileIcon, PurchaseIcon, AboutIcon, LogoIcon, SearchIcon, SellIcon, CloseIcon } from './Icons';

interface SideNavProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onSearchClick: () => void;
  onSellClick: () => void;
  isOpen: boolean;
  onClose: () => void;
}

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: Page;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
      isActive
        ? 'bg-teal-500 text-white'
        : 'text-slate-300 hover:bg-slate-700 hover:text-white'
    }`}
  >
    {icon}
    <span className="ml-3">{label}</span>
  </button>
);

const SideNav: React.FC<SideNavProps> = ({ currentPage, onNavigate, onSearchClick, onSellClick, isOpen, onClose }) => {
  const navItems = [
    { icon: <HomeIcon className="h-5 w-5" />, label: Page.Home },
    { icon: <ProfileIcon className="h-5 w-5" />, label: Page.Profile },
    { icon: <PurchaseIcon className="h-5 w-5" />, label: Page.Purchases },
    { icon: <AboutIcon className="h-5 w-5" />, label: Page.About },
  ];

  const navContent = (
      <div className="flex flex-col h-full p-4 bg-slate-800 border-r border-slate-700 shadow-lg md:shadow-none">
        <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
                <LogoIcon className="h-8 w-8 text-teal-400" />
                <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-teal-400 to-cyan-400 text-transparent bg-clip-text">PetConnect</h1>
            </div>
             <button onClick={onClose} className="md:hidden p-1 text-slate-400 hover:text-white">
                <CloseIcon className="h-6 w-6" />
            </button>
        </div>
        
        <nav className="flex flex-col space-y-2">
          {navItems.map((item) => (
            <NavItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              isActive={currentPage === item.label}
              onClick={() => {
                onNavigate(item.label);
                onClose();
              }}
            />
          ))}
        </nav>

        <div className="mt-auto pt-8">
             <div className="hidden md:flex flex-col space-y-2">
                <button
                    onClick={() => { onSearchClick(); onClose(); }}
                    className="flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 text-slate-300 hover:bg-slate-700 hover:text-white"
                >
                    <SearchIcon className="w-5 h-5" />
                    <span className="ml-3">Search Pets</span>
                </button>
                <button
                    onClick={() => { onSellClick(); onClose(); }}
                    className="flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 bg-teal-500 text-white hover:bg-teal-600"
                >
                    <SellIcon className="w-5 h-5" />
                    <span className="ml-3">Sell a Pet</span>
                </button>
            </div>
        </div>
      </div>
  );

  return (
    <>
      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="relative w-64 h-full">
            {navContent}
        </div>
      </div>
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-70 z-30 md:hidden" onClick={onClose}></div>}
      
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 flex-shrink-0">
        {navContent}
      </aside>
    </>
  );
};

export default SideNav;