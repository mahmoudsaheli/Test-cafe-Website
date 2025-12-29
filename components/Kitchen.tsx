import React, { useState, useEffect } from 'react';
import { Order } from '../types';

interface KitchenProps {
  onBack: () => void;
}

const Kitchen: React.FC<KitchenProps> = ({ onBack }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [now, setNow] = useState(Date.now());

  // Load orders and listen for updates
  useEffect(() => {
    const loadOrders = () => {
      try {
        const stored = JSON.parse(localStorage.getItem('mr-beans-orders') || '[]');
        // Sort by time: oldest first
        setOrders(stored.filter((o: Order) => o.status === 'pending').sort((a: Order, b: Order) => a.timestamp - b.timestamp));
      } catch (e) {
        console.error("Kitchen load error", e);
      }
    };

    loadOrders();
    
    const handleStorage = () => loadOrders();
    window.addEventListener('storage', handleStorage);
    
    // Auto refresh timer for "Time Ago" display
    const timer = setInterval(() => setNow(Date.now()), 1000 * 60);

    return () => {
      window.removeEventListener('storage', handleStorage);
      clearInterval(timer);
    };
  }, []);

  const completeOrder = (orderId: string) => {
    try {
      const allOrders = JSON.parse(localStorage.getItem('mr-beans-orders') || '[]');
      const updatedOrders = allOrders.map((o: Order) => 
        o.id === orderId ? { ...o, status: 'completed' } : o
      );
      localStorage.setItem('mr-beans-orders', JSON.stringify(updatedOrders));
      
      // Update local state
      setOrders(prev => prev.filter(o => o.id !== orderId));
      window.dispatchEvent(new Event('storage'));
    } catch (e) {
      console.error("Error completing order", e);
    }
  };

  const getTimeAgo = (timestamp: number) => {
    const diff = Math.floor((now - timestamp) / 60000);
    if (diff < 1) return 'Just now';
    return `${diff}m ago`;
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-200 font-mono">
      {/* KDS Header */}
      <div className="bg-stone-900 border-b border-stone-800 p-4 flex justify-between items-center sticky top-0 z-10 shadow-md">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold text-white tracking-widest uppercase">
            <span className="text-gold-DEFAULT mr-2">●</span>
            Kitchen Display System
          </h1>
          <span className="bg-stone-800 text-stone-400 text-xs px-2 py-1 rounded">
            {orders.length} Active Tickets
          </span>
        </div>
        <button 
          onClick={onBack}
          className="text-sm text-stone-400 hover:text-white hover:underline uppercase tracking-wider"
        >
          Exit Kitchen View
        </button>
      </div>

      {/* Tickets Grid */}
      <div className="p-6">
        {orders.length === 0 ? (
          <div className="h-[70vh] flex flex-col items-center justify-center text-stone-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-xl tracking-widest uppercase">No Active Orders</p>
            <p className="text-sm mt-2">Waiting for new tickets...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-stone-900 border border-stone-700 flex flex-col shadow-lg animate-fade-in">
                {/* Ticket Header */}
                <div className={`p-3 flex justify-between items-center border-b border-stone-700 ${
                  order.type === 'delivery' ? 'bg-blue-900/30' : 'bg-gold-900/10'
                }`}>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded uppercase ${
                     order.type === 'delivery' ? 'bg-blue-600 text-white' : 'bg-gold-DEFAULT text-black'
                  }`}>
                    {order.type}
                  </span>
                  <span className="text-xs font-bold text-stone-400">
                    {getTimeAgo(order.timestamp)}
                  </span>
                </div>

                {/* Ticket Body */}
                <div className="p-4 flex-1">
                  <h3 className="text-lg font-bold text-white mb-1">{order.customerName}</h3>
                  {order.address && (
                    <p className="text-xs text-stone-500 mb-4 truncate italic">
                      📍 {order.address}
                    </p>
                  )}
                  <div className="space-y-3 mt-4">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex gap-2 text-sm text-stone-300">
                        <span className="text-stone-600">1x</span>
                        <span className="font-medium">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ticket Footer */}
                <div className="p-3 border-t border-stone-800 bg-black/20">
                  <button 
                    onClick={() => completeOrder(order.id)}
                    className="w-full bg-stone-800 hover:bg-green-700 text-stone-300 hover:text-white py-3 font-bold uppercase tracking-widest text-xs transition-colors rounded-sm flex items-center justify-center gap-2"
                  >
                    <span>Mark Ready</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Kitchen;