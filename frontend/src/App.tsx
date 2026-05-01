import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import { AdminLayout } from './apps/admin/layouts/AdminLayout';
import { StoreLayout } from './apps/store/layouts/StoreLayout';
import { ToastContainer } from './shared/components/ToastContainer';

// Store Pages
import { Landing } from './apps/store/pages/Landing';
import { Products } from './apps/store/pages/Products';
import { ProductDetail } from './apps/store/pages/ProductDetail';
import { Cart } from './apps/store/pages/Cart';

// Admin Pages
import { Dashboard } from './apps/admin/pages/Dashboard';
import { Inventory } from './apps/admin/pages/Inventory';
import { Orders } from './apps/admin/pages/Orders';
import { Quotations } from './apps/admin/pages/Quotations';
import { Settings } from './apps/admin/pages/Settings';
import { AdminProducts } from './apps/admin/pages/AdminProducts';

// Shared Pages
import { Login } from './shared/pages/Login';
import { Register } from './shared/pages/Register';

import { useAuthStore } from './shared/store/authStore';

const ProtectedRoute = ({ 
  children, 
  allowedRoles 
}: { 
  children: React.ReactNode;
  allowedRoles?: string[];
}) => {
  const { isAuthenticated, user } = useAuthStore();
  
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

export default function App() {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <Router>
      <ToastContainer />
      <Routes>
        {/* STORE ROUTES */}
        <Route element={<StoreLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* ADMIN ROUTES */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['ADMIN', 'SUPERADMIN']}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="orders" element={<Orders />} />
          <Route path="quotations" element={<Quotations />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
