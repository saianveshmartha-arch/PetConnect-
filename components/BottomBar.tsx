import React from 'react';
import { SearchIcon, SellIcon } from './Icons';

interface BottomBarProps {
  onSearchClick: () => void;
  onSellClick: () => void;
}

const BottomBar: React.FC<BottomBarProps> = ({ onSearchClick, onSellClick }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-800 border-t border-slate-700 p-4 flex justify-around items-center z-20 md:hidden">
      <button 
        onClick={onSearchClick}
        className="flex flex-col items-center gap-1 text-slate-300 hover:text-teal-400 transition-colors"
      >
        <SearchIcon className="w-6 h-6" />
        <span className="text-xs font-medium">Search</span>
      </button>
      <button 
        onClick={onSellClick}
        className="flex items-center gap-2 px-6 py-3 bg-teal-500 text-white rounded-full shadow-lg hover:bg-teal-600 transition-colors transform hover:scale-105"
      >
        <SellIcon className="w-5 h-5" />
        <span className="font-bold">Sell</span>
      </button>
    </div>
  );
};

export default BottomBar;