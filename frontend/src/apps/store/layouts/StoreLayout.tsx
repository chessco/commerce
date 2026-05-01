import React from 'react';
import { Zap, Globe, Share2, ShoppingCart } from 'lucide-react';
import { Link, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCartStore } from '../../../shared/store/cartStore';
import { useAuthStore } from '../../../shared/store/authStore';
import { User, LogOut, LayoutDashboard } from 'lucide-react';

export const StoreLayout = () => {
  const { t } = useTranslation();
  const cartItemsCount = useCartStore((state) => state.items.length);
  const { isAuthenticated, user, logout } = useAuthStore();
  const isAdmin = user?.role === 'ADMIN' || user?.role === 'SUPERADMIN';

  return (
    <div className="bg-background text-on-surface font-sans selection:bg-brand-600/20 selection:text-brand-600">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-surface-container">
        <nav className="flex justify-between items-center px-6 lg:px-20 h-16 w-full max-w-7xl mx-auto text-on-surface">
          <div className="flex items-center gap-3 text-on-surface">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center shadow-lg shadow-brand-600/20">
                <Zap className="text-white fill-white" size={18} />
              </div>
              <span className="text-xl font-bold tracking-tight text-brand-900 uppercase">Voltia</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-10">
            <a href="/#solutions" className="text-sm font-semibold text-outline hover:text-brand-600 transition-colors tracking-tight">
              {t('common.solutions')}
            </a>
            <Link 
              to="/products"
              className="text-sm font-semibold text-outline hover:text-brand-600 transition-colors tracking-tight"
            >
              {t('common.catalog')}
            </Link>
            <a href="/#projects" className="text-sm font-semibold text-outline hover:text-brand-600 transition-colors tracking-tight">
              {t('common.projects')}
            </a>
            <a href="/#resources" className="text-sm font-semibold text-outline hover:text-brand-600 transition-colors tracking-tight">
              {t('common.resources')}
            </a>
          </div>
          <div className="flex items-center gap-6">
            <Link 
              to="/cart" 
              className="relative p-2 text-on-surface hover:text-brand-600 transition-colors"
              aria-label="Shopping Cart"
            >
              <ShoppingCart size={22} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-600 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                  {cartItemsCount}
                </span>
              )}
            </Link>
            {!isAuthenticated ? (
              <>
                <Link 
                  to="/login" 
                  className="hidden sm:block text-sm font-bold text-slate-500 hover:text-brand-600 transition-colors uppercase tracking-widest"
                >
                  {t('common.clientPortal')}
                </Link>
                <Link 
                  to="/login" 
                  className="hidden sm:block text-sm font-bold text-brand-900 hover:text-brand-600 transition-colors"
                >
                  {t('common.adminAccess', 'Admin')}
                </Link>
                <Link 
                  to="/login"
                  className="px-5 py-2.5 bg-brand-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-brand-600/20 hover:scale-[0.98] transition-all"
                >
                  {t('common.getStarted')}
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-end hidden md:flex">
                  <span className="text-xs font-bold text-brand-900">{user?.firstName} {user?.lastName}</span>
                  <span className="text-[10px] font-medium text-outline uppercase tracking-wider">{user?.role}</span>
                </div>
                {isAdmin ? (
                  <Link 
                    to="/admin/dashboard" 
                    className="p-2 bg-brand-600/5 text-brand-600 rounded-lg hover:bg-brand-600 hover:text-white transition-all shadow-sm"
                    title={t('sidebar.dashboard')}
                  >
                    <LayoutDashboard size={20} />
                  </Link>
                ) : (
                  <Link 
                    to="/cart" 
                    className="p-2 bg-brand-600/5 text-brand-600 rounded-lg hover:bg-brand-600 hover:text-white transition-all shadow-sm"
                    title={t('common.myAccount')}
                  >
                    <User size={20} />
                  </Link>
                )}
                <button 
                  onClick={logout}
                  className="p-2 bg-rose-50 text-rose-600 rounded-full hover:bg-rose-600 hover:text-white transition-all shadow-sm"
                  title={t('common.logout')}
                >
                  <LogOut size={18} />
                </button>
              </div>
            )}
          </div>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white pt-32 pb-12 px-6 lg:px-20 border-t border-surface-container">
        <div className="max-w-7xl mx-auto space-y-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-24">
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center shadow-lg shadow-brand-600/20">
                  <Zap className="text-white fill-white" size={20} />
                </div>
                <span className="text-2xl font-bold tracking-tight text-brand-900 uppercase">Voltia</span>
              </div>
              <p className="text-on-surface-variant leading-relaxed">
                {t('footer.desc')}
              </p>
              <div className="flex items-center gap-5 pt-2">
                {[Globe, Share2, Globe, Share2].map((Icon, i) => (
                  <button key={i} className="text-slate-400 hover:text-brand-600 transition-colors">
                    <Icon size={20} />
                  </button>
                ))}
              </div>
            </div>
            
            {[
              { 
                title: t('common.solutions'), 
                items: ['industrial', 'commercial', 'residential', 'monitoring', 'protection'],
                prefix: 'footer.solutions'
              },
              { 
                title: t('common.resources'), 
                items: ['docs', 'caseStudies', 'standards', 'support', 'api'],
                prefix: 'footer.resources'
              },
              { 
                title: t('common.contact'), 
                items: ['contact@voltia.tech', '+1 (555) 123-4567'],
                prefix: null
              }
            ].map((col, i) => (
              <div key={i} className="space-y-8">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface">{col.title}</h4>
                <ul className="space-y-4">
                  {col.items.map((item) => (
                    <li key={item}>
                      <a href="#" className="text-sm font-semibold text-outline hover:text-brand-600 transition-colors">
                        {!col.prefix ? item : t(`${col.prefix}.${item}`)}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-12 border-t border-surface-container flex flex-col md:flex-row items-center justify-between gap-8">
            <p className="text-[10px] font-bold text-outline uppercase tracking-widest">
              © 2026 Voltia Infrastructure Corp. {t('common.allRightsReserved')}
            </p>
            <div className="flex items-center gap-8">
              {['privacyPolicy', 'termsOfService', 'cookieSettings'].map((item) => (
                <a key={item} href="#" className="text-[10px] font-bold text-outline hover:text-brand-900 transition-colors uppercase tracking-widest">
                  {t(`common.${item}`)}
                </a>
              ))}
              {isAdmin && (
                <Link to="/admin/dashboard" className="text-[10px] font-bold text-brand-600 hover:text-brand-900 transition-colors uppercase tracking-widest border-l border-slate-200 pl-8">
                  {t('common.adminAccess', 'Admin Access')}
                </Link>
              )}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
