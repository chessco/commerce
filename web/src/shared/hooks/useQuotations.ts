import { useMutation } from '@tanstack/react-query';
import { api } from '../services/api';

export interface CreateQuotationPayload {
  projectName: string;
  description?: string;
}

export const useCreateQuotation = () => {
  return useMutation({
    mutationFn: async (payload: CreateQuotationPayload) => {
      const response = await api.post('/quotations', payload);
      return response.data;
    },
  });
};
