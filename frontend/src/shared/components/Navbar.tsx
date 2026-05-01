import React from 'react';
import { Search, Bell, User, Zap, Globe } from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/utils';

export const Navbar = () => {
  const { t } = useTranslation();

  return (
    <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-8 sticky top-0 z-50">
      {/* High-Density Search Area */}
      <div className="flex items-center gap-6 flex-1 max-w-2xl">
        <div className="relative w-full group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={16} />
          <input 
            type="text" 
            placeholder={t('common.searchPlaceholder', 'Buscar proyectos, productos o pedidos...')}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg focus:ring-2 focus:ring-blue-600/10 transition-all text-xs font-bold text-slate-900 placeholder:text-slate-400 placeholder:font-medium"
          />
        </div>
      </div>

      {/* Global Controls & Profile */}
      <div className="flex items-center gap-5">
        
        {/* Language & Utilities */}
        <div className="flex items-center gap-2 pr-4 border-r border-slate-100">
          <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50/50 rounded-lg transition-all" title="Language Configuration">
            <Globe size={18} />
          </button>
          <LanguageSwitcher />
        </div>

        {/* Notifications */}
        <button className="relative p-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-all group">
          <Bell size={18} />
          <span className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-blue-600 rounded-full border-2 border-white shadow-[0_0_5px_rgba(37,99,235,0.4)] transition-transform group-hover:scale-125" />
        </button>
        
        {/* User Identity */}
        <div className="flex items-center gap-3 pl-2 group cursor-pointer active:scale-95 transition-transform">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-black text-slate-900 leading-none">Alex Rivera</p>
            <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">
              {t('common.projectManager')}
            </p>
          </div>
          <div className="relative">
            <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center border border-slate-200 group-hover:border-blue-600/30 transition-all overflow-hidden shadow-sm">
              <User size={16} className="text-slate-500 group-hover:text-blue-600 transition-colors" />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
          </div>
        </div>
      </div>
    </header>
  );
};
