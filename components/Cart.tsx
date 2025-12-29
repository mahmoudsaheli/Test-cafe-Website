import React, { useState } from 'react';
import { CartItem, Order } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (cartId: string) => void;
  onClear: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, onRemove, onClear }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [orderType, setOrderType] = useState<'pickup' | 'delivery'>('pickup');
  const [address, setAddress] = useState('');

  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  const deliveryFee = orderType === 'delivery' ? 5.00 : 0;
  const total = subtotal + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    
    // Basic validation
    if (!customerName.trim()) return;
    if (orderType === 'delivery' && !address.trim()) return;

    setIsSubmitting(true);
    
    // Create the order object
    const newOrder: Order = {
      id: crypto.randomUUID(),
      customerName,
      items,
      type: orderType,
      address: orderType === 'delivery' ? address : undefined,
      status: 'pending',
      timestamp: Date.now(),
      total
    };

    // Simulate Network Request & Save to "Database" (LocalStorage)
    setTimeout(() => {
      try {
        const existingOrders = JSON.parse(localStorage.getItem('mr-beans-orders') || '[]');
        localStorage.setItem('mr-beans-orders', JSON.stringify([...existingOrders, newOrder]));
        
        // Dispatch event so Kitchen view updates if open in another tab/window
        window.dispatchEvent(new Event('storage'));
        
        setIsSubmitting(false);
        setIsSuccess(true);
      } catch (err) {
        console.error("Failed to save order", err);
        setIsSubmitting(false);
      }
    }, 1500);
  };

  const handleClose = () => {
    if (isSuccess) {
      onClear();
      setIsSuccess(false);
      setCustomerName('');
      setAddress('');
      setOrderType('pickup');
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      ></div>

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-stone-900 border-l border-stone-800 h-full shadow-2xl flex flex-col transform transition-transform duration-300">
        
        {/* Header */}
        <div className="p-6 border-b border-stone-800 flex justify-between items-center bg-[#1a1818]">
          <h2 className="text-2xl font-serif text-gold-DEFAULT">Your Order</h2>
          <button 
            onClick={handleClose}
            className="text-stone-400 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
          {isSuccess ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 animate-fade-in-up">
              <div className="w-20 h-20 rounded-full bg-gold-DEFAULT/20 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gold-DEFAULT" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-serif text-white mb-2">Order Received!</h3>
                <p className="text-stone-400">Thank you, {customerName}.</p>
                <p className="text-stone-400 text-sm mt-2">
                  {orderType === 'delivery' 
                    ? `Your coffee is on its way to ${address}.` 
                    : 'Your coffee is being crafted. See you soon!'}
                  <br/>Estimated time: {orderType === 'delivery' ? '30-45' : '10-15'} mins.
                </p>
              </div>
              <button 
                onClick={handleClose}
                className="px-8 py-3 bg-gold-DEFAULT text-black font-bold uppercase tracking-widest text-sm hover:bg-white transition-colors rounded-sm"
              >
                Close
              </button>
            </div>
          ) : (
            <>
              {items.length === 0 ? (
                <div className="text-center text-stone-500 mt-20">
                  <p>Your cart is empty.</p>
                  <p className="text-sm mt-2">Start adding some delicious brews!</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.cartId} className="flex gap-4 items-start animate-fade-in">
                      <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className="text-white font-serif">{item.name}</h4>
                          <span className="text-gold-DEFAULT text-sm font-bold">${item.price.toFixed(2)}</span>
                        </div>
                        <p className="text-stone-500 text-xs mt-1 line-clamp-1">{item.description}</p>
                        <button 
                          onClick={() => onRemove(item.cartId)}
                          className="text-stone-600 hover:text-red-400 text-xs mt-2 transition-colors uppercase tracking-wider"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer / Checkout */}
        {!isSuccess && items.length > 0 && (
          <div className="p-6 bg-[#1a1818] border-t border-stone-800 space-y-6">
            
            {/* Order Type Selector */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-stone-900 rounded-lg border border-stone-700">
              <button
                type="button"
                onClick={() => setOrderType('pickup')}
                className={`py-2 text-xs font-bold uppercase tracking-widest rounded-md transition-all ${
                  orderType === 'pickup' 
                    ? 'bg-gold-DEFAULT text-black shadow-sm' 
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                Pickup
              </button>
              <button
                type="button"
                onClick={() => setOrderType('delivery')}
                className={`py-2 text-xs font-bold uppercase tracking-widest rounded-md transition-all ${
                  orderType === 'delivery' 
                    ? 'bg-gold-DEFAULT text-black shadow-sm' 
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                Delivery
              </button>
            </div>

            {/* Totals */}
            <div className="space-y-2 text-sm text-stone-400 border-b border-stone-800 pb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {orderType === 'delivery' && (
                <div className="flex justify-between text-gold-DEFAULT">
                  <span>Delivery Fee</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-white text-xl font-serif pt-2">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">Name for Order</label>
                  <input 
                    type="text" 
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-700 rounded px-4 py-3 text-white focus:outline-none focus:border-gold-DEFAULT transition-colors placeholder-stone-600"
                    placeholder="e.g. John Doe"
                  />
                </div>

                {orderType === 'delivery' && (
                  <div className="animate-fade-in">
                    <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">Delivery Address</label>
                    <textarea 
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      rows={2}
                      className="w-full bg-stone-900 border border-stone-700 rounded px-4 py-3 text-white focus:outline-none focus:border-gold-DEFAULT transition-colors placeholder-stone-600 resize-none"
                      placeholder="Street address, Apt, City..."
                    />
                  </div>
                )}
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gold-DEFAULT text-black font-bold uppercase tracking-widest text-sm hover:bg-white transition-colors rounded-sm disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
              >
                {isSubmitting ? 'Processing...' : `Place ${orderType === 'pickup' ? 'Pickup' : 'Delivery'} Order`}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;