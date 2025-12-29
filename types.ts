export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'coffee' | 'tea' | 'pastry' | 'specialty';
  image: string;
}

export interface CartItem extends MenuItem {
  cartId: string;
}

export interface Order {
  id: string;
  customerName: string;
  items: CartItem[];
  type: 'pickup' | 'delivery';
  address?: string;
  status: 'pending' | 'completed';
  timestamp: number;
  total: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export interface RecommendationRequest {
  mood: string;
  preferences?: string;
}