import React, { useState, useEffect } from 'react';
import { X, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Product, useCreateProduct, useUpdateProduct } from '../hooks/useProducts';
import { useToastStore } from '../store/toastStore';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  categories: any[];
}

export const ProductModal = ({ isOpen, onClose, product, categories }: ProductModalProps) => {
  const { t } = useTranslation();
  const { addToast } = useToastStore();
  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct();

  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    description: '',
    price: 0,
    stock: 0,
    categoryId: '',
    imageUrl: ''
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        sku: product.sku,
        description: product.description || '',
        price: Number(product.price),
        stock: product.stock,
        categoryId: product.categoryId,
        imageUrl: product.imageUrl || ''
      });
    } else {
      setFormData({ 
        name: '', 
        sku: '', 
        description: '', 
        price: 0, 
        stock: 0, 
        categoryId: categories[0]?.id || '', 
        imageUrl: '' 
      });
    }
  }, [product, categories, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (product) {
        await updateMutation.mutateAsync({ id: product.id, data: formData });
        addToast({ 
          title: t('common.success'), 
          message: t('products.updatedSuccess', 'Producto actualizado'), 
          type: 'success' 
        });
      } else {
        await createMutation.mutateAsync(formData);
        addToast({ 
          title: t('common.success'), 
          message: t('products.createdSuccess', 'Producto creado'), 
          type: 'success' 
        });
      }
      onClose();
    } catch (error) {
      addToast({ 
        title: t('common.error'), 
        message: t('products.saveError', 'No se pudo guardar el producto'), 
        type: 'error' 
      });
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12">
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-brand-900/40 backdrop-blur-md"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-2xl bg-white rounded-[40px] shadow-2xl overflow-hidden"
      >
        <div className="p-10">
          <header className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-black text-gray-900 italic">
                {product ? t('products.editTitle', 'Editar Activo') : t('products.newTitle', 'Nuevo Registro')}
              </h2>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">
                Catálogo Operativo Voltia
              </p>
            </div>
            <button onClick={onClose} className="p-3 hover:bg-gray-100 rounded-2xl transition-colors">
              <X size={20} />
            </button>
          </header>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">{t('products.fields.name', 'Nombre Comercial')}</label>
                <input 
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full px-5 py-3 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-orange-500/10 focus:bg-white transition-all text-sm font-bold" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">{t('products.fields.sku', 'Código SKU')}</label>
                <input 
                  required
                  value={formData.sku}
                  onChange={e => setFormData({...formData, sku: e.target.value})}
                  className="w-full px-5 py-3 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-orange-500/10 focus:bg-white transition-all text-sm font-bold" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">{t('products.fields.description', 'Descripción Técnica')}</label>
              <textarea 
                rows={3}
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                className="w-full px-5 py-3 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-orange-500/10 focus:bg-white transition-all text-sm font-bold resize-none" 
              />
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">{t('products.fields.price', 'Precio (MXN)')}</label>
                <input 
                  type="number"
                  required
                  step="0.01"
                  value={formData.price}
                  onChange={e => setFormData({...formData, price: Number(e.target.value)})}
                  className="w-full px-5 py-3 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-orange-500/10 focus:bg-white transition-all text-sm font-bold" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">{t('products.fields.stock', 'Stock Actual')}</label>
                <input 
                  type="number"
                  required
                  value={formData.stock}
                  onChange={e => setFormData({...formData, stock: Number(e.target.value)})}
                  className="w-full px-5 py-3 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-orange-500/10 focus:bg-white transition-all text-sm font-bold" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">{t('products.fields.category', 'Categoría')}</label>
                <select 
                  value={formData.categoryId}
                  onChange={e => setFormData({...formData, categoryId: e.target.value})}
                  className="w-full px-5 py-3 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-orange-500/10 focus:bg-white transition-all text-sm font-bold appearance-none"
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">{t('products.fields.imageUrl', 'URL de Imagen Assets')}</label>
              <input 
                value={formData.imageUrl}
                onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                placeholder="https://..."
                className="w-full px-5 py-3 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-orange-500/10 focus:bg-white transition-all text-sm font-bold" 
              />
            </div>

            <div className="pt-6 flex gap-4">
              <button 
                type="button"
                onClick={onClose}
                className="flex-1 py-4 bg-gray-100 text-gray-400 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-gray-200 transition-all"
              >
                {t('common.cancel', 'Cancelar')}
              </button>
              <button 
                type="submit"
                disabled={createMutation.isPending || updateMutation.isPending}
                className="flex-[2] py-4 bg-orange-500 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-orange-600 shadow-xl shadow-orange-500/20 transition-all flex items-center justify-center gap-2"
              >
                {product ? t('products.updateAction', 'Actualizar Registro') : t('products.createAction', 'Guardar en Catálogo')}
                <ChevronRight size={16} />
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};
