import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ShoppingCart, 
  Download, 
  ShieldCheck, 
  Truck, 
  RotateCcw,
  Star,
  Plus,
  Minus,
  Share2,
  Heart
} from 'lucide-react';
import { PRODUCTS } from '../../../shared/constants';
import { cn } from '../../../shared/lib/utils';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

export const ProductDetail = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const product = PRODUCTS.find(p => p.id === id) || PRODUCTS[0];
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('specs');

  return (
    <div className="space-y-12 py-6">
      <Link to="/products" className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-orange-500 transition-colors group">
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        {t('products.details.back')}
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Product Gallery */}
        <div className="space-y-6">
          <div className="aspect-square bg-white rounded-[40px] border border-gray-100 overflow-hidden shadow-2xl shadow-gray-200/50 group relative">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-6 right-6 flex flex-col gap-3">
              <button className="p-3 bg-white/90 backdrop-blur-md rounded-full text-gray-400 hover:text-red-500 transition-colors shadow-sm">
                <Heart size={20} />
              </button>
              <button className="p-3 bg-white/90 backdrop-blur-md rounded-full text-gray-400 hover:text-blue-500 transition-colors shadow-sm">
                <Share2 size={20} />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square bg-white rounded-2xl border border-gray-100 overflow-hidden cursor-pointer hover:border-orange-500 transition-all">
                <img src={`https://picsum.photos/seed/breaker${i}/200/200`} alt="Gallery" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-[10px] font-bold uppercase tracking-widest border border-orange-100">
                {product.category}
              </span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={14} className="fill-orange-400 text-orange-400" />
                ))}
                <span className="text-xs font-bold text-gray-400 ml-2">4.9 {t('products.reviews', { count: 124 })}</span>
              </div>
            </div>
            <h1 className="text-5xl font-black text-gray-900 leading-tight uppercase tracking-tighter italic">{product.name}</h1>
            <p className="text-lg text-gray-500 leading-relaxed">{product.description}</p>
          </div>

          <div className="flex items-center gap-8 mb-10">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{t('products.details.unitPrice')}</p>
              <p className="text-4xl font-black text-gray-900">${product.price.toLocaleString()}</p>
            </div>
            <div className="h-12 w-px bg-gray-100"></div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{t('products.details.availability')}</p>
              <p className={cn(
                "text-lg font-black uppercase italic",
                product.status === 'In Stock' ? "text-green-600" : "text-orange-600"
              )}>{product.status === 'In Stock' ? t('inventory.status.inStock') : t('inventory.status.lowStock')}</p>
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <div className="flex items-center gap-6">
              <div className="flex items-center bg-gray-100 rounded-2xl p-1">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 text-gray-500 hover:text-gray-900 hover:bg-white rounded-xl transition-all"
                >
                  <Minus size={20} />
                </button>
                <span className="w-12 text-center font-black text-lg">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 text-gray-500 hover:text-gray-900 hover:bg-white rounded-xl transition-all"
                >
                  <Plus size={20} />
                </button>
              </div>
              <button className="flex-1 py-5 bg-orange-500 text-white rounded-2xl font-black uppercase tracking-widest italic hover:bg-orange-600 transition-all shadow-2xl shadow-orange-500/30 flex items-center justify-center gap-3 group">
                <ShoppingCart size={24} />
                {t('products.details.addToCart')}
              </button>
            </div>
            <button className="w-full py-4 bg-white border-2 border-gray-100 rounded-2xl font-black uppercase tracking-widest italic text-gray-900 hover:bg-gray-50 hover:border-orange-200 transition-all flex items-center justify-center gap-3">
              <Download size={20} />
              {t('products.details.downloadDatasheet')}
            </button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-3 gap-4 p-6 bg-gray-50 rounded-3xl border border-gray-100">
            <div className="flex flex-col items-center text-center gap-2">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-orange-500 shadow-sm">
                <ShieldCheck size={20} />
              </div>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{t('products.details.warranty')}</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-orange-500 shadow-sm">
                <Truck size={20} />
              </div>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{t('products.details.shipping')}</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-orange-500 shadow-sm">
                <RotateCcw size={20} />
              </div>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{t('products.details.returns')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="space-y-8">
        <div className="flex items-center gap-12 border-b border-gray-100">
          {['specs', 'description', 'reviews', 'support'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "pb-6 text-sm font-black uppercase tracking-widest italic transition-all relative",
                activeTab === tab ? "text-orange-500" : "text-gray-400 hover:text-gray-900"
              )}
            >
              {t(`products.details.tabs.${tab}`)}
              {activeTab === tab && (
                <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 w-full h-1 bg-orange-500 rounded-full" />
              )}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <div className="space-y-8">
            <h3 className="text-2xl font-black text-gray-900 uppercase italic tracking-tight">{t('products.details.technicalSpecs')}</h3>
            <div className="space-y-4">
              <p className="text-xs font-bold text-blue-800 uppercase tracking-widest mb-2">{t('products.details.techSupport')}</p>
              <p className="text-sm text-blue-700 leading-relaxed">{t('products.details.techSupportDesc')}</p>
              <button className="mt-4 text-sm font-black text-blue-900 uppercase tracking-widest italic hover:underline">{t('products.details.contactEngineering')}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

