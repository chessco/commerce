import React from 'react';
import { useToastStore } from '../store/toastStore';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ToastContainer = () => {
  const { toasts, removeToast } = useToastStore();

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="text-green-500" size={18} />;
      case 'error': return <AlertCircle className="text-red-500" size={18} />;
      default: return <Info className="text-blue-500" size={18} />;
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className="flex items-center gap-3 bg-white/90 backdrop-blur-xl border border-surface-container p-4 rounded-2xl shadow-xl min-w-[320px] pointer-events-auto"
          >
            <div className="flex-shrink-0">{getIcon(toast.type)}</div>
            <p className="text-sm font-bold text-on-surface flex-grow">{toast.message}</p>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-outline hover:text-on-surface transition-colors p-1"
            >
              <X size={16} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
