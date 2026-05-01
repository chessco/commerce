import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';
import { Product } from './useProducts';

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async (): Promise<Product> => {
      const response = await api.get(`/products/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
};
