import React from 'react';
import { NavLink, useNavigate, useLocation, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  FileText, 
  Settings as SettingsIcon, 
  LogOut, 
  Zap,
  ClipboardList,
  BarChart3,
  ShoppingCart
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/utils';

import { useAuthStore } from '../store/authStore';

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const isAdmin = user?.role === 'ADMIN' || user?.role === 'SUPERADMIN';

  const allNavItems = [
    { icon: LayoutDashboard, label: t('sidebar.dashboard'), path: '/admin/dashboard', roles: ['ADMIN', 'SUPERADMIN', 'USER'] },
    { icon: Package, label: t('sidebar.products'), path: '/admin/products', roles: ['ADMIN', 'SUPERADMIN'] },
    { icon: ClipboardList, label: t('sidebar.inventory'), path: '/admin/inventory', roles: ['ADMIN', 'SUPERADMIN'] },
    { icon: FileText, label: t('sidebar.quotations'), path: '/admin/quotations', roles: ['ADMIN', 'SUPERADMIN', 'USER'] },
    { icon: ShoppingCart, label: t('sidebar.orders'), path: '/admin/orders', roles: ['ADMIN', 'SUPERADMIN', 'USER'] },
    { icon: BarChart3, label: t('sidebar.analytics'), path: '/admin/analytics', roles: ['ADMIN', 'SUPERADMIN'] },
  ];

  const navItems = allNavItems.filter(item => item.roles.includes(user?.role || ''));

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <aside className="w-64 bg-brand-900 text-white flex flex-col h-screen sticky top-0 border-r border-white/5">
      <div className="p-8 flex items-center gap-3">
        <NavLink to="/" className="w-9 h-9 bg-brand-600 rounded-lg flex items-center justify-center shadow-lg shadow-brand-600/20">
          <Zap className="text-white fill-white" size={20} />
        </NavLink>
        <span className="text-lg font-bold tracking-tight uppercase letter-spacing-1">Voltia</span>
      </div>

      <nav className="flex-1 px-4 py-8 space-y-1.5">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 group text-sm font-medium",
                isActive 
                  ? "bg-brand-600 text-white shadow-lg shadow-brand-600/20" 
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              )
            }
          >
            {({ isActive }) => (
              <>
                <item.icon size={18} className={cn("transition-colors", isActive ? "text-white" : "text-slate-500 group-hover:text-white")} />
                <span>{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 mt-auto border-t border-white/5 space-y-1.5">
        <Link 
          to="/admin/settings"
          className={cn(
            "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all group/settings",
            location.pathname === '/admin/settings'
              ? "bg-white/10 text-white"
              : "text-slate-400 hover:bg-white/5 hover:text-white"
          )}
        >
          <SettingsIcon size={18} className={cn(
            "transition-colors",
            location.pathname === '/admin/settings' ? "text-brand-600" : "text-slate-500 group-hover/settings:text-white"
          )} />
          <span>{t('common.settings')}</span>
        </Link>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2.5 w-full text-slate-400 hover:bg-red-500/10 hover:text-red-400 rounded-lg transition-all text-sm font-medium group"
        >
          <LogOut size={18} className="text-slate-500 group-hover:text-red-400 transition-colors" />
          <span>{t('common.logout')}</span>
        </button>
      </div>
    </aside>
  );
};
