import React, { useState } from 'react';
import { Pet, Gender, CareInstructions } from '../types';
import { CloseIcon, SparklesIcon } from './Icons';
import { generatePetDescription, generateCareInstructions } from '../services/geminiService';
import { addPetListing } from '../services/petService';

interface SellPetFormProps {
  onPetAdded: (newPet: Pet) => void;
  onClose: () => void;
}

const SellPetForm: React.FC<SellPetFormProps> = ({ onPetAdded, onClose }) => {
  const [petName, setPetName] = useState('');
  const [breed, setBreed] = useState('');
  const [type, setType] = useState<'Dog' | 'Cat' | 'Parrot' | 'Rabbit' | 'Other'>('Dog');
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState<Gender>(Gender.Male);
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [careInstructions, setCareInstructions] = useState<CareInstructions>({ feeding: '', grooming: '', exercise: '', medicalNeeds: '' });
  const [contactInfo, setContactInfo] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGeneratingDesc, setIsGeneratingDesc] = useState(false);
  const [isGeneratingCare, setIsGeneratingCare] = useState(false);

  const handleGenerateDescription = async () => {
    if (!petName || !breed || !age) {
      alert('Please fill in Pet Name, Breed, and Age to generate a description.');
      return;
    }
    setIsGeneratingDesc(true);
    try {
      const generatedDesc = await generatePetDescription(petName, breed, age);
      setDescription(generatedDesc);
    } catch (error) {
      console.error(error);
      alert('Failed to generate description.');
    } finally {
      setIsGeneratingDesc(false);
    }
  };

  const handleGenerateCare = async () => {
    if (!breed || !type) {
      alert('Please fill in Breed and Type to generate care instructions.');
      return;
    }
    setIsGeneratingCare(true);
    try {
      const generatedCare = await generateCareInstructions(breed, type);
      setCareInstructions(generatedCare);
    } catch (error) {
      console.error(error);
      alert('Failed to generate care instructions.');
    } finally {
      setIsGeneratingCare(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const [city, state] = location.split(',').map(s => s.trim());

    const newPetData = {
      name: petName,
      breed,
      type,
      age,
      gender,
      location: { city: city || 'Unknown', state: state || '' },
      description,
      careInstructions,
      photos: [`https://picsum.photos/seed/${petName.toLowerCase()}/800/600`],
    };

    try {
        const addedPet = await addPetListing(newPetData);
        onPetAdded(addedPet);
    } catch (error) {
        console.error("Failed to add pet:", error);
        alert("There was an error listing your pet. Please try again.");
    } finally {
        setIsSubmitting(false);
    }
  };

  const inputClass = "mt-1 block w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 text-slate-100";
  const labelClass = "block text-sm font-medium text-slate-300";
  const aIButtonClass = "flex items-center gap-1 text-xs text-teal-400 hover:text-teal-300 font-semibold";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4">
      <div className="bg-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-6 border-b border-slate-700">
          <h2 className="text-2xl font-bold text-slate-100">List Your Pet for Sale</h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white">
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div><label className={labelClass}>Pet Name</label><input type="text" value={petName} onChange={(e) => setPetName(e.target.value)} className={inputClass} required /></div>
            <div><label className={labelClass}>Breed</label><input type="text" value={breed} onChange={(e) => setBreed(e.target.value)} className={inputClass} required /></div>
            <div><label className={labelClass}>Type</label><select value={type} onChange={(e) => setType(e.target.value as any)} className={inputClass}><option>Dog</option><option>Cat</option><option>Parrot</option><option>Rabbit</option><option>Other</option></select></div>
            <div><label className={labelClass}>Age (years)</label><input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} className={inputClass} required /></div>
            <div><label className={labelClass}>Gender</label><select value={gender} onChange={(e) => setGender(e.target.value as Gender)} className={inputClass}><option>Male</option><option>Female</option><option>Unknown</option></select></div>
            <div><label className={labelClass}>Location (City, ST)</label><input type="text" value={location} onChange={(e) => setLocation(e.target.value)} className={inputClass} required /></div>
          </div>
          <div>
            <div className="flex justify-between items-center"><label className={labelClass}>Description</label><button type="button" onClick={handleGenerateDescription} disabled={isGeneratingDesc} className={aIButtonClass}>{isGeneratingDesc ? 'Generating...' : <><SparklesIcon className="h-4 w-4" />Generate with AI</>}</button></div>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className={inputClass + " h-24"} required />
          </div>
          <div>
            <div className="flex justify-between items-center mb-2"><label className={labelClass}>Care Instructions</label><button type="button" onClick={handleGenerateCare} disabled={isGeneratingCare} className={aIButtonClass}>{isGeneratingCare ? 'Generating...' : <><SparklesIcon className="h-4 w-4" />Generate with AI</>}</button></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className="text-xs text-slate-400">Feeding</label><textarea value={careInstructions.feeding} onChange={e => setCareInstructions({...careInstructions, feeding: e.target.value})} className={inputClass} /></div>
              <div><label className="text-xs text-slate-400">Grooming</label><textarea value={careInstructions.grooming} onChange={e => setCareInstructions({...careInstructions, grooming: e.target.value})} className={inputClass} /></div>
              <div><label className="text-xs text-slate-400">Exercise</label><textarea value={careInstructions.exercise} onChange={e => setCareInstructions({...careInstructions, exercise: e.target.value})} className={inputClass} /></div>
              <div><label className="text-xs text-slate-400">Medical</label><textarea value={careInstructions.medicalNeeds} onChange={e => setCareInstructions({...careInstructions, medicalNeeds: e.target.value})} className={inputClass} /></div>
            </div>
          </div>
          <div><label className={labelClass}>Contact Info</label><input type="text" value={contactInfo} onChange={(e) => setContactInfo(e.target.value)} className={inputClass} required /></div>
          <div><label className={labelClass}>Upload Photos</label><input type="file" className={`${inputClass} p-0 file:mr-4 file:py-2 file:px-4 file:rounded-l-md file:border-0 file:text-sm file:font-semibold file:bg-slate-600 file:text-teal-300 hover:file:bg-slate-500`} /></div>
          <div className="flex justify-end gap-4 pt-4 border-t border-slate-700">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-200 bg-slate-600 rounded-lg hover:bg-slate-500">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="px-6 py-2 text-sm font-medium text-white bg-teal-500 rounded-lg hover:bg-teal-600 disabled:bg-teal-800 disabled:cursor-not-allowed">
                {isSubmitting ? 'Submitting...' : 'Submit Listing'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellPetForm;