import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../hooks/useProducts';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addToCart: (product, quantity = 1) => set((state) => {
        const existingItem = state.items.find(item => item.product.id === product.id);
        if (existingItem) {
          return {
            items: state.items.map(item => 
              item.product.id === product.id 
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          };
        }
        return { items: [...state.items, { product, quantity }] };
      }),
      removeFromCart: (productId) => set((state) => ({
        items: state.items.filter(item => item.product.id !== productId)
      })),
      updateQuantity: (productId, delta) => set((state) => ({
        items: state.items.map(item => 
          item.product.id === productId 
            ? { ...item, quantity: Math.max(1, item.quantity + delta) }
            : item
        )
      })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'voltia-cart-storage',
    }
  )
);
