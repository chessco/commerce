import React, { useState } from 'react';
import { 
  User, 
  Calendar, 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  Clock,
  List,
  LayoutGrid,
  CheckCircle2,
  AlertCircle,
  Package,
  ArrowUpDown,
  ExternalLink
} from 'lucide-react';
import { cn } from '../../../shared/lib/utils';
import { useTranslation, Trans } from 'react-i18next';
import { useUIStore } from '../../../shared/store/uiStore';
import { useOrders, Order, OrderStatus } from '../../../shared/hooks/useOrders';
import { motion, AnimatePresence } from 'motion/react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { OrderModal } from '../../../shared/components/OrderModal';

export const Orders = () => {
  const { t } = useTranslation();
  const { adminViewType, setAdminViewType } = useUIStore();
  const { data: orders, isLoading } = useOrders();
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredOrders = orders?.filter(o => 
    o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (o.user ? `${o.user.firstName} ${o.user.lastName}` : '').toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  return (
    <div className="space-y-10 pb-20">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-orange-500 mb-1">
            <Package size={16} className="fill-orange-500/10" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">{t('sidebar.orders')}</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 italic lowercase first-letter:uppercase">
            {t('orders.title')}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-gray-100 p-1 rounded-2xl border border-gray-200 shadow-inner">
            <button 
              onClick={() => setAdminViewType('table')}
              className={cn(
                "p-2 rounded-xl transition-all flex items-center gap-2 px-3",
                adminViewType === 'table' ? "bg-white text-orange-500 shadow-sm font-bold" : "text-gray-400 hover:text-gray-600"
              )}
            >
              <List size={18} />
              <span className="text-[10px] uppercase tracking-widest leading-none">Lista</span>
            </button>
            <button 
              onClick={() => setAdminViewType('kanban')}
              className={cn(
                "p-2 rounded-xl transition-all flex items-center gap-2 px-3",
                adminViewType === 'kanban' ? "bg-white text-orange-500 shadow-sm font-bold" : "text-gray-400 hover:text-gray-600"
              )}
            >
              <LayoutGrid size={18} />
              <span className="text-[10px] uppercase tracking-widest leading-none">Kanban</span>
            </button>
          </div>

          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 bg-orange-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20 flex items-center gap-2 active:scale-95"
          >
            <Plus size={18} />
            {t('orders.newOrder')}
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
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Cargando Pedidos...</span>
          </motion.div>
        ) : (
          <motion.div
            key={adminViewType}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative group">
                  <input 
                    type="text" 
                    placeholder={t('orders.searchPlaceholder')} 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all w-72 shadow-sm"
                  />
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500" size={16} />
                </div>
              </div>
              <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] bg-white px-6 py-3 rounded-2xl border border-gray-100 shadow-sm">
                <Trans i18nKey="orders.showingCount" count={filteredOrders.length}>
                  Mostrando <span className="text-orange-500">{filteredOrders.length}</span> pedidos
                </Trans>
              </div>
            </div>

            {adminViewType === 'table' ? (
              <OrdersTableView orders={filteredOrders} />
            ) : (
              <OrdersKanbanView orders={filteredOrders} />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <OrderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

const OrdersTableView = ({ orders }: { orders: Order[] }) => {
  const { t } = useTranslation();
  
  return (
    <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">{t('orders.table.id', 'ID')}</th>
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">{t('orders.table.customer', 'Cliente')}</th>
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">{t('orders.table.amount', 'Monto')}</th>
              <th className="px-8 py-5 text-[10px) font-black text-gray-400 uppercase tracking-widest text-center">{t('orders.table.status', 'Estado')}</th>
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">{t('orders.table.date', 'Fecha')}</th>
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">{t('orders.table.actions', 'Acciones')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-orange-50/20 transition-colors group">
                <td className="px-8 py-6">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest font-mono">
                    #{order.id.split('-')[0]}
                  </span>
                </td>
                <td className="px-8 py-6">
                  <div className="flex flex-col">
                    <span className="text-sm font-black text-gray-900 leading-tight">
                      {order.user ? `${order.user.firstName} ${order.user.lastName}` : 'Cliente Genérico'}
                    </span>
                    <span className="text-[10px] font-bold text-gray-400">{order.user?.email}</span>
                  </div>
                </td>
                <td className="px-8 py-6 text-center">
                  <p className="text-sm font-black text-gray-900">${Number(order.total).toLocaleString()}</p>
                </td>
                <td className="px-8 py-6 text-center">
                  <OrderStatusBadge status={order.status} />
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-2 text-gray-500 italic text-xs">
                    <Calendar size={12} />
                    {format(new Date(order.createdAt), 'dd MMM, yyyy', { locale: es })}
                  </div>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2.5 text-gray-400 hover:text-orange-500 hover:bg-orange-50 rounded-xl transition-all">
                      <ExternalLink size={18} />
                    </button>
                    <button className="p-2.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all">
                      <MoreVertical size={18} />
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

const OrdersKanbanView = ({ orders }: { orders: Order[] }) => {
  const { t } = useTranslation();
  const columns: { id: OrderStatus; label: string; color: string }[] = [
    { id: 'PENDING', label: t('orders.columns.pending'), color: 'bg-orange-500' },
    { id: 'PROCESSING', label: t('orders.columns.review'), color: 'bg-blue-500' },
    { id: 'COMPLETED' as any, label: t('orders.columns.completed'), color: 'bg-green-500' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {columns.map((col) => {
        const filtered = orders.filter(o => o.status === col.id || (col.id === 'COMPLETED' as any && o.status === 'DELIVERED'));
        
        return (
          <div key={col.id} className="flex flex-col gap-6">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                <div className={cn("w-2 h-6 rounded-full", col.color)} />
                <h3 className="text-lg font-bold text-gray-900 italic">{col.label}</h3>
              </div>
              <span className="px-3 py-1 bg-gray-100 text-[10px] font-black text-gray-400 rounded-xl">
                {filtered.length}
              </span>
            </div>

            <div className="space-y-4">
              {filtered.map(order => (
                <motion.div 
                  key={order.id}
                  layout
                  whileHover={{ y: -4 }}
                  className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-premium transition-all group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest font-mono">#{order.id.split('-')[0]}</span>
                    <OrderStatusBadge status={order.status} />
                  </div>
                  <h4 className="text-base font-black text-gray-900 group-hover:text-orange-500 transition-colors mb-2 leading-tight">
                    {order.user ? `${order.user.firstName} ${order.user.lastName}` : 'Cliente Genérico'}
                  </h4>
                  <div className="flex items-center gap-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">
                    <div className="flex items-center gap-1">
                      <Clock size={12} />
                      {format(new Date(order.createdAt), 'HH:mm')}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={12} />
                      {format(new Date(order.createdAt), 'dd MMM')}
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                    <div className="flex -space-x-2">
                      {order.items.slice(0, 3).map((item, idx) => (
                        <div key={idx} className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center overflow-hidden">
                          <Package size={14} className="text-gray-400" />
                        </div>
                      ))}
                      {order.items.length > 3 && (
                        <div className="w-8 h-8 rounded-full bg-gray-50 border-2 border-white flex items-center justify-center text-[8px] font-black text-gray-400">
                          +{order.items.length - 3}
                        </div>
                      )}
                    </div>
                    <p className="text-xl font-black text-gray-900">${Number(order.total).toLocaleString()}</p>
                  </div>
                </motion.div>
              ))}
              
              {filtered.length === 0 && (
                <div className="h-32 border-2 border-dashed border-gray-100 rounded-[32px] flex items-center justify-center">
                  <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest italic">No hay pedidos</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const OrderStatusBadge = ({ status }: { status: OrderStatus }) => {
  const { t } = useTranslation();
  
  const config = {
    PENDING: { color: 'bg-orange-50 text-orange-600 border-orange-100', icon: Clock },
    PROCESSING: { color: 'bg-blue-50 text-blue-600 border-blue-100', icon: AlertCircle },
    SHIPPED: { color: 'bg-purple-50 text-purple-600 border-purple-100', icon: Package },
    DELIVERED: { color: 'bg-green-50 text-green-600 border-green-100', icon: CheckCircle2 },
    CANCELLED: { color: 'bg-red-50 text-red-600 border-red-100', icon: AlertCircle }
  };

  const { color, icon: Icon } = (config[status] || config.PENDING) as any;

  return (
    <div className={cn("inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-widest", color)}>
      <Icon size={12} />
      {t(`orders.statuses.${status}`)}
    </div>
  );
};
