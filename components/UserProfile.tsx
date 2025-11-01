import React from 'react';
import { User } from '../types';

interface UserProfileProps {
  user: User;
}

const InfoField: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div>
    <h3 className="text-sm font-medium text-slate-400">{label}</h3>
    <p className="mt-1 text-lg text-slate-100">{value}</p>
  </div>
);

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <div className="bg-slate-800 p-8 rounded-2xl shadow-lg max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        <img
          src={`https://i.pravatar.cc/150?u=${user.id}`}
          alt="User avatar"
          className="w-32 h-32 rounded-full ring-4 ring-teal-500/50"
        />
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl font-extrabold text-slate-50">{user.fullName}</h1>
          <p className="mt-2 text-slate-400">Share ID: <span className="font-mono bg-slate-700 text-slate-300 p-1 rounded">{user.shareId}</span></p>
        </div>
      </div>
      
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-slate-700 pt-8">
        <InfoField label="Location" value={`${user.location.city}, ${user.location.state}`} />
        <InfoField label="Contact Number" value={user.contactNumber} />
        <InfoField label="Your Pet Listings" value={`${user.listings.length} active`} />
        <InfoField label="Purchase History" value={`${user.purchaseHistory.length} pets`} />
      </div>

      <div className="mt-10 flex flex-wrap justify-center md:justify-start gap-4 border-t border-slate-700 pt-8">
        <button className="px-6 py-2 bg-teal-500 text-white font-semibold rounded-lg shadow-md hover:bg-teal-600">
          Edit Profile
        </button>
        <button className="px-6 py-2 bg-slate-700 text-slate-200 font-semibold rounded-lg hover:bg-slate-600">
          View Your Listings
        </button>
        <button className="px-6 py-2 bg-slate-700 text-slate-200 font-semibold rounded-lg hover:bg-slate-600">
          View Purchase History
        </button>
      </div>
    </div>
  );
};

export default UserProfile;