import React from 'react';
import { Pet } from '../types';
import { CloseIcon, LocationIcon } from './Icons';

interface PetProfileModalProps {
  pet: Pet;
  onClose: () => void;
}

const DetailSection: React.FC<{ title: string; content: string }> = ({ title, content }) => (
  <div>
    <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">{title}</h4>
    <p className="mt-1 text-slate-200">{content}</p>
  </div>
);

const PetProfileModal: React.FC<PetProfileModalProps> = ({ pet, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4">
      <div className="bg-slate-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row overflow-hidden text-slate-200">
        <div className="md:w-1/2">
          <img src={pet.photos[0]} alt={pet.name} className="w-full h-64 md:h-full object-cover" />
        </div>
        <div className="md:w-1/2 flex flex-col p-6 md:p-8 overflow-y-auto">
          <div className="flex justify-between items-start">
            <div>
              <div className="uppercase tracking-wide text-sm text-teal-400 font-bold">{pet.breed}</div>
              <h2 className="text-4xl font-extrabold text-slate-50">{pet.name}</h2>
              <div className="mt-2 flex items-center text-slate-400">
                <LocationIcon className="h-5 w-5 mr-2" />
                <span>{pet.location.city}, {pet.location.state}</span>
              </div>
            </div>
            <button onClick={onClose} className="p-2 -mr-2 text-slate-400 hover:text-white">
              <CloseIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="mt-6 flex items-center space-x-4 text-center">
            <div className="bg-slate-700 p-3 rounded-lg flex-1">
              <div className="text-xs text-slate-400">Age</div>
              <div className="font-bold text-slate-100">{pet.age} years</div>
            </div>
            <div className="bg-slate-700 p-3 rounded-lg flex-1">
              <div className="text-xs text-slate-400">Gender</div>
              <div className="font-bold text-slate-100">{pet.gender}</div>
            </div>
             <div className="bg-slate-700 p-3 rounded-lg flex-1">
              <div className="text-xs text-slate-400">Type</div>
              <div className="font-bold text-slate-100">{pet.type}</div>
            </div>
          </div>
          
          <p className="mt-6 text-slate-300">{pet.description}</p>
          
          <div className="mt-8 space-y-6">
            <h3 className="text-lg font-bold text-slate-100 border-b border-slate-600 pb-2">Care Instructions</h3>
            <DetailSection title="Feeding" content={pet.careInstructions.feeding} />
            <DetailSection title="Grooming" content={pet.careInstructions.grooming} />
            <DetailSection title="Exercise" content={pet.careInstructions.exercise} />
            <DetailSection title="Medical Needs" content={pet.careInstructions.medicalNeeds} />
          </div>

          <div className="mt-auto pt-8">
            <button className="w-full bg-teal-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-teal-600 transition-colors duration-200">
              Adopt {pet.name}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetProfileModal;