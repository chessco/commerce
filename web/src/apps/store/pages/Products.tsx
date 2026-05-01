import React, { useState } from 'react';
import { 
  Filter, 
  ChevronDown, 
  Search, 
  ShoppingCart, 
  ArrowRight, 
  Download,
  Star,
  Plus,
  Zap,
  Info
} from 'lucide-react';
import { useProducts } from '../../../shared/hooks/useProducts';
import { useCartStore } from '../../../shared/store/cartStore';
import { useToastStore } from '../../../shared/store/toastStore';
import { cn } from '../../../shared/lib/utils';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const Products = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState(t('products.categories.all'));
  
  const categories = [
    t('products.categories.all'),
    t('products.categories.powerDistribution'),
    t('products.categories.monitoring'),
    t('products.categories.protection'),
    t('products.categories.lighting')
  ];
  
  const { data: products, isLoading, isError } = useProducts();
  const { addToCart } = useCartStore();
  const { addToast } = useToastStore();

  return (
    <div className="space-y-12">
      {/* High-Density Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-brand-600">
            <Zap size={16} className="fill-brand-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">{t('common.catalog')}</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-on-surface">{t('products.catalogTitle')}</h1>
          <p className="text-on-surface-variant text-lg max-w-2xl">{t('products.catalogSubtitle')}</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-brand-600 transition-colors" size={16} />
            <input 
              type="text" 
              placeholder={t('products.searchPlaceholder')} 
              className="pl-12 pr-4 py-3 bg-surface-container-low border-none rounded-2xl focus:ring-2 focus:ring-brand-600/10 transition-all text-sm font-bold text-on-surface placeholder:text-outline placeholder:font-medium w-72"
            />
          </div>
          <button className="p-3 bg-surface-container-low text-on-surface hover:bg-surface-container-high rounded-2xl transition-all border border-transparent hover:border-brand-600/10 shadow-sm">
            <Filter size={20} />
          </button>
        </div>
      </header>

      {/* Tonal Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-8 pb-4 border-b border-surface-container">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 whitespace-nowrap",
                activeCategory === cat 
                  ? "bg-brand-600 text-white shadow-lg shadow-brand-600/20 scale-[0.98]" 
                  : "bg-surface-container-low text-outline hover:text-brand-600 hover:bg-surface-container-high"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.15em] text-outline">
          <div className="flex items-center gap-3">
            <span>{t('products.sortBy')}</span>
            <button className="flex items-center gap-1 text-on-surface hover:text-brand-600 transition-colors">
              {t('products.popularity')} <ChevronDown size={14} />
            </button>
          </div>
          <div className="h-4 w-px bg-surface-container-highest"></div>
          <div className="flex items-center gap-3">
            <span>{t('products.priceSort')}</span>
            <button className="flex items-center gap-1 text-on-surface hover:text-brand-600 transition-colors">
              {t('products.lowToHigh')} <ChevronDown size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Corporate Asset Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {isLoading && (
          <div className="col-span-full py-40 flex flex-col items-center justify-center gap-4 text-brand-600">
            <span className="w-12 h-12 rounded-full border-4 border-brand-600/10 border-t-brand-600 animate-spin"></span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">{t('products.fetching')}</span>
          </div>
        )}
        {isError && (
          <div className="col-span-full py-20 text-center">
            <p className="text-red-500 font-bold uppercase tracking-widest">{t('products.error')}</p>
          </div>
        )}
        
        {products?.map((product) => (
          <div 
            key={product.id} 
            className="group bg-surface-container-lowest rounded-[32px] border border-transparent hover:border-brand-600/10 hover:shadow-premium transition-all duration-500 overflow-hidden flex flex-col"
          >
            {/* Tonal Image Surface */}
            <div className="relative aspect-[4/3] bg-surface-container-low m-4 rounded-[24px] overflow-hidden group-hover:bg-surface-container-high transition-colors">
              <img 
                src={product.imageUrl || `https://picsum.photos/seed/${product.id}/400/400`} 
                alt={product.name} 
                className="w-full h-full object-cover mix-blend-multiply opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-lg text-[8px] font-black uppercase tracking-widest text-brand-900 shadow-sm">
                  {product.category?.name || 'Varios'}
                </span>
                {product.status === 'LOW_STOCK' && (
                  <span className="px-3 py-1 bg-red-500 text-white rounded-lg text-[8px] font-black uppercase tracking-widest shadow-lg shadow-red-500/20">
                    {t('products.lowStock')}
                  </span>
                )}
              </div>
              <Link 
                to={`/products/${product.id}`}
                className="absolute inset-0 flex items-center justify-center bg-brand-900/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <button className="px-6 py-2.5 bg-white text-brand-900 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center gap-2 hover:scale-105 transition-transform">
                  <Info size={14} />
                  {t('common.viewMore')}
                </button>
              </Link>
            </div>

            {/* Content with Surgical Precision */}
            <div className="px-8 pb-8 flex-1 flex flex-col">
              <div className="flex items-center gap-0.5 mb-4 opacity-40 group-hover:opacity-100 transition-opacity">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={10} className="fill-brand-600 text-brand-600" />
                ))}
                <span className="text-[8px] font-black text-outline ml-2 uppercase tracking-widest">
                  {t('products.reviews', { count: 32 })}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-on-surface leading-tight mb-2 group-hover:text-brand-600 transition-colors">
                {product.name}
              </h3>
              <p className="text-xs text-on-surface-variant leading-relaxed line-clamp-2 mb-6">
                {product.description}
              </p>
              
              <div className="mt-auto pt-6 border-t border-surface-container flex items-center justify-between">
                <div>
                  <p className="text-[8px] font-black text-outline uppercase tracking-[0.2em] mb-1">{t('products.price')}</p>
                  <p className="text-2xl font-bold text-on-surface tracking-tight">${Number(product.price).toLocaleString()}</p>
                </div>
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    addToCart(product);
                    addToast({
                      title: t('common.cart'),
                      message: t('products.addedToCart', { name: product.name }),
                      type: 'success'
                    });
                  }}
                  className="w-12 h-12 bg-brand-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-brand-600/20 hover:scale-[0.98] transition-all"
                >
                  <ShoppingCart size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Engineering Quote Blocks (Remodeled) */}
      <div className="mt-20 py-16 px-10 lg:px-20 bg-brand-900 rounded-[50px] relative overflow-hidden group">
        <div className="absolute inset-0 bg-brand-600/5 mix-blend-overlay -z-10"></div>
        <div className="absolute top-0 right-0 w-2/3 h-full bg-surface-container-highest/5 skew-x-12 translate-x-1/2 group-hover:translate-x-1/3 transition-transform duration-1000"></div>
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-12">
          <div className="max-w-xl space-y-6">
            <div className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 rounded-full">
              <span className="text-[8px] font-black text-brand-600 uppercase tracking-[0.3em]">Engineering Support</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight lowercase first-letter:uppercase">
              {t('landing.ctaTitle')}
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              {t('landing.ctaDesc')}
            </p>
          </div>
          <div className="flex flex-wrap gap-5">
            <button className="px-10 py-5 bg-brand-600 text-white rounded-2xl font-bold shadow-2xl shadow-brand-600/40 hover:scale-[0.98] transition-all flex items-center gap-3">
              {t('landing.ctaQuoteButton')}
              <ArrowRight size={24} />
            </button>
            <button className="px-10 py-5 bg-white/5 text-white border border-white/10 rounded-2xl font-bold hover:bg-white/10 transition-all flex items-center gap-3">
              <Download size={22} />
              {t('landing.ctaCatalogButton')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

