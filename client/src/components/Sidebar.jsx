import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Receipt, PieChart, LogOut, Plus } from 'lucide-react';

const Sidebar = ({ onOpenAddModal }) => {
  const location = useLocation();

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Receipt, label: 'Transactions', path: '/transactions' },
    // { icon: PieChart, label: 'Reports', path: '/reports' }, // Future feature
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#09090b] border-r border-[#27272a] flex flex-col z-50 hidden md:flex">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-[#27272a]">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-cyan-600 flex items-center justify-center mr-3 shadow-lg shadow-violet-500/20">
          <span className="text-white font-bold text-lg">L</span>
        </div>
        <span className="text-xl font-bold tracking-tight text-white">Lumina</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive 
                  ? 'bg-violet-500/10 text-violet-400' 
                  : 'text-muted hover:bg-[#1c1c1f] hover:text-white'
              }`}
            >
              <item.icon size={20} className={isActive ? 'text-violet-400' : 'text-muted group-hover:text-white transition-colors'} />
              <span className="font-medium">{item.label}</span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(167,139,250,0.6)]" />
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* CTA Button */}
      <div className="p-4 border-t border-[#27272a]">
        <button 
          onClick={onOpenAddModal}
          className="w-full btn-primary justify-center py-3 shadow-glow hover:shadow-glow-lg"
        >
          <Plus size={20} />
          <span>New Transaction</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
