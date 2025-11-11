
import { ProductStock, Message, Sender } from './types';

export const PRODUCT_DATABASE: ProductStock[] = [
  { id: 1, name: 'Organic Apples', stock: 15, lowStockThreshold: 20, category: 'Fruits' },
  { id: 2, name: 'Whole Milk (1L)', stock: 5, lowStockThreshold: 10, category: 'Dairy' },
  { id: 3, name: 'Sourdough Bread', stock: 35, lowStockThreshold: 25, category: 'Bakery' },
  { id: 4, name: 'Cheddar Cheese', stock: 8, lowStockThreshold: 15, category: 'Dairy' },
  { id: 5, name: 'Ground Coffee (500g)', stock: 40, lowStockThreshold: 20, category: 'Pantry' },
  { id: 6, name: 'Free-range Eggs (12)', stock: 3, lowStockThreshold: 10, category: 'Dairy' },
  { id: 7, name: 'Avocados', stock: 22, lowStockThreshold: 15, category: 'Fruits' },
  { id: 8, name: 'Pasta (500g)', stock: 50, lowStockThreshold: 30, category: 'Pantry' },
  { id: 9, name: 'Chicken Breast (1kg)', stock: 9, lowStockThreshold: 10, category: 'Meat' },
];

export const INITIAL_BOT_MESSAGE: Message = {
    id: 'initial-message',
    sender: Sender.BOT,
    text: "Hello! I'm your stock analysis assistant. Ask me to check stock levels for any product, and I'll alert you if anything is running low. For example, you can ask: 'Are milk and eggs running low?'"
};
