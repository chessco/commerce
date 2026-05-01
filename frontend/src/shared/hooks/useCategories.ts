import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';

export interface Category {
  id: string;
  name: string;
  description?: string;
}

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async (): Promise<Category[]> => {
      const response = await api.get('/categories');
      return response.data;
    },
  });
};
