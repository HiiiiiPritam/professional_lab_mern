import React, { useState } from 'react';
import { Menu, Plus } from 'lucide-react';
import Sidebar from './Sidebar';

const Layout = ({ children, onOpenAddModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#000000]">
      <Sidebar onOpenAddModal={onOpenAddModal} />
      
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 w-full bg-[#09090b]/80 backdrop-blur-md border-b border-[#27272a] z-40 px-4 h-16 flex items-center justify-between">
         <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-cyan-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
              <span className="text-white font-bold text-lg">L</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-white">Lumina</span>
         </div>
         <button className="text-muted p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
           <Menu size={24} />
         </button>
      </div>

      {/* Main Content Area */}
      <main className="md:ml-64 min-h-screen transition-all duration-300">
        <div className="max-w-6xl mx-auto p-6 md:p-8 pt-20 md:pt-8">
          {children}
        </div>
      </main>
      
      {/* Floating Action Button for Mobile */}
      <button 
        onClick={onOpenAddModal}
        className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-violet-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-violet-600/30 z-50 hover:scale-110 active:scale-95 transition-all"
      >
        <Plus size={28} />
      </button>
    </div>
  );
};

export default Layout;
