
export enum Sender {
  USER = 'user',
  BOT = 'bot',
}

export interface ProductStock {
  id: number;
  name: string;
  stock: number;
  lowStockThreshold: number;
  category: string;
}

export interface LowStockItem {
    name: string;
    stock: number;
    lowStockThreshold: number;
}

export interface BotResponseData {
  naturalResponse: string;
  lowStockItems: LowStockItem[];
}

export interface Message {
  id: string;
  sender: Sender;
  text: string;
  data?: BotResponseData;
}
