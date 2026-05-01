import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit3, 
  Trash2, 
  Package, 
  LayoutGrid, 
  List,
  AlertCircle,
  CheckCircle2,
  PackageX,
  X,
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useProducts, useCreateProduct, useUpdateProduct, useDeleteProduct, Product } from '../../../shared/hooks/useProducts';
import { useCategories } from '../../../shared/hooks/useCategories';
import { useUIStore } from '../../../shared/store/uiStore';
import { cn } from '../../../shared/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { useToastStore } from '../../../shared/store/toastStore';

export const AdminProducts = () => {
  const { t } = useTranslation();
  const { adminViewType } = useUIStore();
  const { data: products, isLoading } = useProducts();
  const { data: categories } = useCategories();
  const { addToast } = useToastStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct();
  const deleteMutation = useDeleteProduct();

  const filteredProducts = products?.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenCreate = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm(t('common.confirmDelete', '¿Está seguro de eliminar este producto?'))) {
      try {
        await deleteMutation.mutateAsync(id);
        addToast({ title: t('common.success'), message: t('products.deletedSuccess', 'Producto eliminado'), type: 'success' });
      } catch (error) {
        addToast({ title: t('common.error'), message: t('products.deleteError', 'Error al eliminar'), type: 'error' });
      }
    }
  };

  return (
    <div className="space-y-8 pb-20">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-orange-500 mb-1">
            <Package size={16} className="fill-orange-500/10" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">{t('sidebar.products')}</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 italic lowercase first-letter:uppercase">
            {t('products.management', 'Gestión de Catálogo')}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-gray-100 p-1 rounded-2xl border border-gray-200 shadow-inner">
            <button 
              onClick={() => useUIStore.getState().setAdminViewType('table')}
              className={cn(
                "p-2 rounded-xl transition-all flex items-center gap-2 px-3",
                adminViewType === 'table' ? "bg-white text-orange-500 shadow-sm font-bold" : "text-gray-400 hover:text-gray-600"
              )}
            >
              <List size={18} />
              <span className="text-[10px] uppercase tracking-widest leading-none">Lista</span>
            </button>
            <button 
              onClick={() => useUIStore.getState().setAdminViewType('kanban')}
              className={cn(
                "p-2 rounded-xl transition-all flex items-center gap-2 px-3",
                adminViewType === 'kanban' ? "bg-white text-orange-500 shadow-sm font-bold" : "text-gray-400 hover:text-gray-600"
              )}
            >
              <LayoutGrid size={18} />
              <span className="text-[10px] uppercase tracking-widest leading-none">Kanban</span>
            </button>
          </div>

          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors" size={16} />
            <input 
              type="text" 
              placeholder={t('products.searchPlaceholder')} 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-2xl focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all text-sm font-bold w-64 shadow-sm"
            />
          </div>
          <button 
            onClick={handleOpenCreate}
            className="px-6 py-3 bg-orange-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20 flex items-center gap-2 active:scale-95"
          >
            <Plus size={18} />
            {t('inventory.addNew')}
          </button>
        </div>
      </header>

      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="py-40 flex flex-col items-center justify-center gap-4 text-orange-500"
          >
            <div className="w-12 h-12 rounded-full border-4 border-orange-100 border-t-orange-500 animate-spin"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">{t('products.fetching')}</span>
          </motion.div>
        ) : (
          <motion.div
            key={adminViewType}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {adminViewType === 'table' ? (
              <TableView products={filteredProducts || []} onEdit={handleOpenEdit} onDelete={handleDelete} />
            ) : (
              <KanbanView products={filteredProducts || []} onEdit={handleOpenEdit} onDelete={handleDelete} />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <ProductModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        product={editingProduct}
        categories={categories || []}
      />
    </div>
  );
};

const TableView = ({ products, onEdit, onDelete }: { products: Product[], onEdit: (p: Product) => void, onDelete: (id: string) => void }) => {
  const { t } = useTranslation();
  
  return (
    <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">{t('inventory.table.product')}</th>
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">{t('inventory.table.category')}</th>
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">{t('inventory.table.stock')}</th>
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">{t('inventory.table.price')}</th>
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">{t('inventory.table.status')}</th>
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">{t('inventory.table.actions')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-orange-50/20 transition-colors group">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gray-100 overflow-hidden border border-gray-100 flex-shrink-0 group-hover:scale-105 transition-transform duration-500">
                      <img 
                        src={product.imageUrl || `https://picsum.photos/seed/${product.id}/200/200`} 
                        alt={product.name} 
                        className="w-full h-full object-cover" 
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-black text-gray-900 truncate">{product.name}</p>
                      <p className="text-[10px] font-bold text-gray-400 tracking-wider">SKU: {product.sku}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className="inline-flex px-3 py-1 bg-gray-100 text-[10px] font-black text-gray-600 rounded-lg uppercase tracking-widest">
                    {product.category?.name || 'Uncategorized'}
                  </span>
                </td>
                <td className="px-8 py-6 text-center">
                  <span className={cn(
                    "text-sm font-black",
                    product.stock === 0 ? "text-red-500" : product.stock < 10 ? "text-orange-500" : "text-gray-900"
                  )}>
                    {product.stock}
                  </span>
                </td>
                <td className="px-8 py-6">
                  <p className="text-sm font-black text-gray-900">${Number(product.price).toLocaleString()}</p>
                </td>
                <td className="px-8 py-6">
                  <StatusBadge stock={product.stock} />
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => onEdit(product)}
                      className="p-2.5 text-gray-400 hover:text-orange-500 hover:bg-orange-50 rounded-xl transition-all"
                    >
                      <Edit3 size={18} />
                    </button>
                    <button 
                      onClick={() => onDelete(product.id)}
                      className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const KanbanView = ({ products, onEdit, onDelete }: { products: Product[], onEdit: (p: Product) => void, onDelete: (id: string) => void }) => {
  const categories = Array.from(new Set(products.map(p => p.category?.name || 'Otros')));
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {['IN_STOCK', 'LOW_STOCK', 'OUT_OF_STOCK'].map((status) => {
        const filtered = products.filter(p => {
          if (status === 'IN_STOCK') return p.stock >= 10;
          if (status === 'LOW_STOCK') return p.stock > 0 && p.stock < 10;
          return p.stock === 0;
        });
        
        return (
          <div key={status} className="flex flex-col gap-6">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                <div className={cn(
                  "w-1.5 h-1.5 rounded-full",
                  status === 'IN_STOCK' ? "bg-green-500" : status === 'LOW_STOCK' ? "bg-orange-500" : "bg-red-500"
                )} />
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                  {status.replace('_', ' ')}
                </h3>
              </div>
              <span className="px-2 py-0.5 bg-gray-100 text-[10px] font-black text-gray-400 rounded-md">
                {filtered.length}
              </span>
            </div>

            <div className="space-y-4">
              {filtered.map(product => (
                <motion.div 
                  key={product.id}
                  whileHover={{ y: -4, scale: 1.01 }}
                  className="bg-white p-5 rounded-[24px] border border-gray-100 shadow-sm hover:shadow-premium transition-all group"
                >
                  <div className="flex gap-4 mb-4">
                    <div className="w-16 h-16 rounded-xl bg-gray-50 overflow-hidden border border-gray-50 flex-shrink-0">
                      <img 
                        src={product.imageUrl || `https://picsum.photos/seed/${product.id}/200/200`} 
                        alt={product.name} 
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" 
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-black text-gray-900 truncate leading-tight mb-1">{product.name}</h4>
                      <p className="text-[10px] font-bold text-orange-500 truncate">{product.category?.name}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                    <div className="flex flex-col">
                      <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Precio/Stock</span>
                      <span className="text-xs font-black text-gray-900">
                        ${Number(product.price).toLocaleString()} <span className="text-gray-300 font-medium mx-1">/</span> {product.stock}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => onEdit(product)} className="p-2 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-all">
                        <Edit3 size={14} />
                      </button>
                      <button onClick={() => onDelete(product.id)} className="p-2 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {filtered.length === 0 && (
                <div className="h-24 border-2 border-dashed border-gray-100 rounded-[24px] flex items-center justify-center">
                  <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Vacío</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const StatusBadge = ({ stock }: { stock: number }) => {
  if (stock === 0) return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-600 rounded-full border border-red-100">
      <PackageX size={12} />
      <span className="text-[10px] font-black uppercase tracking-widest">Sin Stock</span>
    </div>
  );
  if (stock < 10) return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-50 text-orange-600 rounded-full border border-orange-100">
      <AlertCircle size={12} />
      <span className="text-[10px] font-black uppercase tracking-widest">Stock Bajo</span>
    </div>
  );
  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-600 rounded-full border border-green-100">
      <CheckCircle2 size={12} />
      <span className="text-[10px] font-black uppercase tracking-widest">En Stock</span>
    </div>
  );
};

import { ProductModal } from '../../../shared/components/ProductModal';
