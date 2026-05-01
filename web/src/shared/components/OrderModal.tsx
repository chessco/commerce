import React, { useState } from 'react';
import { X, ChevronRight, Plus, Minus, Trash2, Search, User, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { useUsers } from '../hooks/useUsers';
import { useProducts, Product } from '../hooks/useProducts';
import { useCreateOrder } from '../hooks/useOrders';
import { useToastStore } from '../store/toastStore';
import { cn } from '../lib/utils';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SelectedItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

export const OrderModal = ({ isOpen, onClose }: OrderModalProps) => {
  const { t } = useTranslation();
  const { addToast } = useToastStore();
  const { data: users, isLoading: loadingUsers } = useUsers();
  const { data: products, isLoading: loadingProducts } = useProducts();
  const createOrder = useCreateOrder();

  const [selectedUserId, setSelectedUserId] = useState('');
  const [items, setItems] = useState<SelectedItem[]>([]);
  const [productSearch, setProductSearch] = useState('');

  if (!isOpen) return null;

  const filteredProducts = products?.filter(p => 
    p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.sku.toLowerCase().includes(productSearch.toLowerCase())
  ).slice(0, 5) || [];

  const addItem = (product: Product) => {
    const existing = items.find(i => i.productId === product.id);
    if (existing) {
      setItems(items.map(i => i.productId === product.id ? { ...i, quantity: i.quantity + 1 } : i));
    } else {
      setItems([...items, { 
        productId: product.id, 
        name: product.name, 
        price: Number(product.price), 
        quantity: 1,
        imageUrl: product.imageUrl
      }]);
    }
    setProductSearch('');
  };

  const removeItem = (productId: string) => {
    setItems(items.filter(i => i.productId !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setItems(items.map(i => {
      if (i.productId === productId) {
        const newQty = Math.max(1, i.quantity + delta);
        return { ...i, quantity: newQty };
      }
      return i;
    }));
  };

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUserId) {
      addToast({ title: t('common.error'), message: t('orders.modal.errorNoUser', 'Seleccione un cliente'), type: 'error' });
      return;
    }
    if (items.length === 0) {
      addToast({ title: t('common.error'), message: t('orders.modal.errorNoItems', 'Añada al menos un producto'), type: 'error' });
      return;
    }

    try {
      await createOrder.mutateAsync({
        userId: selectedUserId,
        items: items.map(i => ({ productId: i.productId, quantity: i.quantity }))
      });
      addToast({ title: t('common.success'), message: t('orders.modal.success', 'Pedido creado correctamente'), type: 'success' });
      onClose();
      // Reset form
      setSelectedUserId('');
      setItems([]);
    } catch (error) {
      addToast({ title: t('common.error'), message: t('orders.modal.errorSave', 'Error al crear el pedido'), type: 'error' });
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-12">
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-brand-900/60 backdrop-blur-xl"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-4xl bg-white rounded-[40px] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
      >
        <div className="p-8 lg:p-12 flex flex-col h-full">
          <header className="flex justify-between items-center mb-10">
            <div>
              <div className="flex items-center gap-2 text-orange-500 mb-1">
                <Package size={16} className="fill-orange-500/10" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Procurement System</span>
              </div>
              <h2 className="text-3xl font-black text-gray-900 italic lowercase first-letter:uppercase">
                {t('orders.modal.title', 'Nuevo Pedido Operativo')}
              </h2>
            </div>
            <button onClick={onClose} className="p-4 hover:bg-gray-100 rounded-2xl transition-all">
              <X size={24} />
            </button>
          </header>

          <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0 gap-10">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 overflow-hidden">
              {/* Left Column: Selection */}
              <div className="lg:col-span-2 space-y-8 overflow-y-auto pr-4">
                {/* User Selector */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1 flex items-center gap-2">
                    <User size={12} /> {t('orders.modal.selectUser', 'Cliente Final')}
                  </label>
                  <select 
                    required
                    value={selectedUserId}
                    onChange={e => setSelectedUserId(e.target.value)}
                    className="w-full px-6 py-4 bg-gray-50 border-none rounded-3xl focus:ring-4 focus:ring-orange-500/10 focus:bg-white transition-all text-sm font-bold appearance-none shadow-sm cursor-pointer"
                  >
                    <option value="">{t('orders.modal.chooseUser', 'Seleccionar un cliente...')}</option>
                    {users?.map(user => (
                      <option key={user.id} value={user.id}>
                        {user.firstName} {user.lastName} ({user.email})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Product Search */}
                <div className="space-y-3 relative">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1 flex items-center gap-2">
                    <Search size={12} /> {t('orders.modal.addProduct', 'Buscador de Activos')}
                  </label>
                  <div className="relative">
                    <input 
                      type="text"
                      value={productSearch}
                      onChange={e => setProductSearch(e.target.value)}
                      placeholder={t('orders.modal.searchPlaceholder', 'Buscar por nombre o SKU...')}
                      className="w-full px-6 py-4 bg-gray-50 border-none rounded-3xl focus:ring-4 focus:ring-orange-500/10 focus:bg-white transition-all text-sm font-bold shadow-sm"
                    />
                    {productSearch && (
                      <div className="absolute top-full left-0 right-0 mt-3 bg-white rounded-3xl shadow-2xl border border-gray-100 p-2 z-50">
                        {filteredProducts.length > 0 ? (
                          filteredProducts.map(p => (
                            <button
                              key={p.id}
                              type="button"
                              onClick={() => addItem(p)}
                              className="w-full text-left p-3 hover:bg-orange-50 rounded-2xl transition-all flex items-center gap-3 group"
                            >
                              <div className="w-10 h-10 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0">
                                <img src={p.imageUrl || `https://picsum.photos/seed/${p.id}/200/200`} alt="" className="w-full h-full object-cover" />
                              </div>
                              <div>
                                <p className="text-xs font-black text-gray-900">{p.name}</p>
                                <p className="text-[10px] font-bold text-gray-400">SKU: {p.sku} • ${p.price}</p>
                              </div>
                              <Plus size={16} className="ml-auto text-gray-300 group-hover:text-orange-500 transition-colors" />
                            </button>
                          ))
                        ) : (
                          <div className="p-4 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">Sin resultados</div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: Cart */}
              <div className="lg:col-span-3 flex flex-col bg-gray-50/50 rounded-[40px] p-8 min-h-0 border border-gray-100/50">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                    Artículos Seleccionados ({items.length})
                  </h3>
                  {items.length > 0 && (
                    <button 
                      type="button" 
                      onClick={() => setItems([])}
                      className="text-[10px] font-black text-red-500 uppercase tracking-widest hover:underline"
                    >
                      Limpiar todo
                    </button>
                  )}
                </div>

                <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                  <AnimatePresence mode="popLayout">
                    {items.map(item => (
                      <motion.div 
                        key={item.productId}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4 group"
                      >
                        <div className="w-12 h-12 rounded-2xl bg-gray-50 overflow-hidden flex-shrink-0">
                          <img src={item.imageUrl || `https://picsum.photos/seed/${item.productId}/200/200`} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-black text-gray-900 truncate">{item.name}</p>
                          <p className="text-[10px] font-bold text-orange-500">${item.price}</p>
                        </div>
                        <div className="flex items-center bg-gray-50 rounded-2xl p-1 px-2 gap-3 border border-gray-100">
                          <button 
                            type="button" 
                            onClick={() => updateQuantity(item.productId, -1)}
                            className="p-1 hover:text-orange-500 transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-xs font-black w-4 text-center">{item.quantity}</span>
                          <button 
                            type="button" 
                            onClick={() => updateQuantity(item.productId, 1)}
                            className="p-1 hover:text-orange-500 transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button 
                          type="button" 
                          onClick={() => removeItem(item.productId)}
                          className="p-2 text-gray-300 hover:text-red-500 transition-colors ml-2"
                        >
                          <Trash2 size={16} />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {items.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center text-gray-300 italic opacity-50">
                      <Package size={48} className="mb-4 stroke-[1px]" />
                      <p className="text-xs font-bold uppercase tracking-widest">No hay artículos</p>
                    </div>
                  )}
                </div>

                {/* Footer / Total */}
                <div className="mt-8 pt-8 border-t border-gray-100 space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-gray-500">Monto Total Estimado</span>
                    <span className="text-2xl font-black text-gray-900 italic">${total.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex gap-4">
                    <button 
                      type="button"
                      onClick={onClose}
                      className="flex-1 py-5 bg-white text-gray-400 rounded-3xl text-[10px] font-black uppercase tracking-widest border border-gray-100 hover:bg-gray-50 transition-all"
                    >
                      {t('common.cancel', 'Descartar')}
                    </button>
                    <button 
                      type="submit"
                      disabled={createOrder.isPending || items.length === 0}
                      className="flex-[2] py-5 bg-orange-500 text-white rounded-3xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-600 shadow-premium transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:grayscale"
                    >
                      {createOrder.isPending ? 'Procesando...' : t('orders.modal.create', 'Confirmar Pedido')}
                      <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};
