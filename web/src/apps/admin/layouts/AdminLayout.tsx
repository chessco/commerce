import React from 'react';
import { Sidebar } from '../../../shared/components/Sidebar';
import { Navbar } from '../../../shared/components/Navbar';
import { motion, AnimatePresence } from 'motion/react';
import { useLocation, Outlet } from 'react-router-dom';

export const AdminLayout = () => {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-[#F9FAFB] font-sans text-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />
        <main className="flex-1 p-8 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="max-w-7xl mx-auto w-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};
