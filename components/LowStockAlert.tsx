
import React from 'react';
import { LowStockItem } from '../types';
import { AlertIcon } from './icons/AlertIcon';

interface LowStockAlertProps {
  items: LowStockItem[];
}

const LowStockAlert: React.FC<LowStockAlertProps> = ({ items }) => {
  return (
    <div className="mt-4 border-l-4 border-red-500 bg-red-900/30 p-3 rounded-r-lg">
      <div className="flex items-center mb-2">
        <AlertIcon />
        <h4 className="ml-2 font-bold text-red-400">Low Stock Alert</h4>
      </div>
      <ul className="space-y-2 text-sm">
        {items.map((item) => (
          <li key={item.name} className="flex justify-between items-center text-red-300">
            <span>{item.name}</span>
            <span className="font-mono bg-red-800/50 px-2 py-0.5 rounded">
              {item.stock} / {item.lowStockThreshold}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-red-400/80">Action required: Please restock these items soon.</p>
    </div>
  );
};

export default LowStockAlert;
