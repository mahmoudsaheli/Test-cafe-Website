import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Menu from './components/Menu';
import Footer from './components/Footer';
import Cart from './components/Cart';
import Kitchen from './components/Kitchen';
import BaristaBot from './components/BaristaBot';
import { MenuItem, CartItem } from './types';

function App() {
  const [view, setView] = useState<'customer' | 'kitchen'>('customer');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (item: MenuItem) => {
    const newItem: CartItem = {
      ...item,
      cartId: crypto.randomUUID()
    };
    setCartItems(prev => [...prev, newItem]);
  };

  const removeFromCart = (cartId: string) => {
    setCartItems(prev => prev.filter(item => item.cartId !== cartId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  if (view === 'kitchen') {
    return <Kitchen onBack={() => setView('customer')} />;
  }

  return (
    <div className="min-h-screen bg-coffee-900 text-stone-100 font-sans selection:bg-gold-DEFAULT selection:text-black">
      <Header 
        onOpenCart={() => setIsCartOpen(true)} 
        cartCount={cartItems.length}
      />
      
      <Cart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemove={removeFromCart}
        onClear={clearCart}
      />

      <main>
        <Hero />
        <Menu onAddToCart={addToCart} />
        <BaristaBot />
      </main>
      <Footer onOpenKitchen={() => setView('kitchen')} />
    </div>
  );
}

export default App;