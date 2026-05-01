import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';

export interface DashboardStats {
  products: number;
  orders: number;
  quotations: number;
  users: number;
  revenue: number;
}

export const useStats = () => {
  return useQuery({
    queryKey: ['stats'],
    queryFn: async (): Promise<DashboardStats> => {
      const response = await api.get('/stats');
      return response.data;
    },
  });
};
