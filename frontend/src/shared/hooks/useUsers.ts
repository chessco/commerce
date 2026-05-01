import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await api.get<User[]>('/users');
      return response.data;
    },
  });
};
