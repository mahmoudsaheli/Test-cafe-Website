import { MenuItem } from './types';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: '1',
    name: 'Gold Leaf Espresso',
    description: 'Our signature single-origin espresso with a delicate crema.',
    price: 3.50,
    category: 'coffee',
    image: 'https://picsum.photos/id/1060/400/300'
  },
  {
    id: '2',
    name: 'Velvet Latte',
    description: 'Silky steamed milk poured over rich espresso with a touch of vanilla.',
    price: 4.75,
    category: 'coffee',
    image: 'https://picsum.photos/id/1083/400/300'
  },
  {
    id: '3',
    name: 'Midnight Cold Brew',
    description: 'Steeped for 24 hours for a smooth, bold, chocolatey finish.',
    price: 5.00,
    category: 'coffee',
    image: 'https://picsum.photos/id/766/400/300'
  },
  {
    id: '4',
    name: 'Caramel Macchiato',
    description: 'Freshly steamed milk with vanilla-flavored syrup marked with espresso and topped with a caramel drizzle.',
    price: 5.50,
    category: 'specialty',
    image: 'https://picsum.photos/id/425/400/300'
  },
  {
    id: '5',
    name: 'Golden Croissant',
    description: 'Buttery, flaky, and baked fresh every morning.',
    price: 3.25,
    category: 'pastry',
    image: 'https://picsum.photos/id/656/400/300'
  },
  {
    id: '6',
    name: 'Matcha Bliss',
    description: 'Premium ceremonial grade matcha whisked with oat milk.',
    price: 5.25,
    category: 'tea',
    image: 'https://picsum.photos/id/431/400/300'
  }
];

export const AI_SYSTEM_INSTRUCTION = `
You are the "Virtual Barista" for Mr. Beans Cafe. Your tone is warm, sophisticated, and inviting. 
You are an expert on coffee flavors.
Your goal is to recommend ONE specific item from the provided menu based on the user's input (mood, weather, or flavor preference).
Always mention the name of the item from the menu exactly as written.
Briefly explain why it fits their vibe.
Keep the response short (under 50 words).

Here is the Menu:
${MENU_ITEMS.map(item => `- ${item.name}: ${item.description}`).join('\n')}
`;
