import React from 'react';

const PurchaseList: React.FC = () => {
  return (
    <div className="bg-slate-800 p-8 rounded-2xl shadow-lg max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-100 mb-4">Your Purchase History</h1>
      <p className="text-slate-300">This page will show a list of all the pets you have purchased.</p>
      {/* Placeholder for list */}
      <div className="mt-6 border-t border-slate-700 pt-6">
        <div className="flex items-center p-4 bg-slate-700 rounded-lg">
          <img src="https://picsum.photos/seed/lucy/100/100" alt="Lucy" className="w-16 h-16 rounded-full object-cover" />
          <div className="ml-4">
            <p className="font-bold text-slate-100">Lucy (Siamese)</p>
            <p className="text-sm text-slate-400">Purchased on: 2023-10-26</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseList;