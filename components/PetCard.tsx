import React from 'react';
import { Pet } from '../types';
import { LocationIcon } from './Icons';

interface PetCardProps {
  pet: Pet;
  onViewProfile: (pet: Pet) => void;
}

const PetCard: React.FC<PetCardProps> = ({ pet, onViewProfile }) => {
  return (
    <div className="bg-slate-800 rounded-xl shadow-lg overflow-hidden hover:shadow-teal-500/20 transition-shadow duration-300 ease-in-out transform hover:-translate-y-1 flex flex-col">
      <div className="relative">
        <img className="h-56 w-full object-cover" src={pet.photos[0]} alt={`Photo of ${pet.name}`} />
        <div className="absolute top-2 right-2 bg-teal-600 text-white text-xs font-semibold px-2 py-1 rounded-full">{pet.type}</div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="uppercase tracking-wide text-sm text-teal-400 font-bold">{pet.breed}</div>
        <h2 className="block mt-1 text-2xl leading-tight font-extrabold text-slate-50">{pet.name}</h2>
        <div className="mt-2 flex items-center text-slate-400">
          <LocationIcon className="h-4 w-4 mr-1" />
          <span className="text-sm">{pet.location.city}, {pet.location.state}</span>
          {pet.location.distance && <span className="text-sm ml-2 font-medium text-slate-300">({pet.location.distance} mi away)</span>}
        </div>
        <div className="mt-auto pt-4">
          <button
            onClick={() => onViewProfile(pet)}
            className="w-full bg-teal-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-teal-600 transition-colors duration-200"
          >
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default PetCard;