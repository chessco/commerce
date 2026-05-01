import { useMutation } from '@tanstack/react-query';
import { api } from '../services/api';
import { useAuthStore } from '../store/authStore';

export const useLoginMutation = () => {
  const login = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: async (credentials: { email: string; pass: string }) => {
      // NOTE: Our backend expects { email, password }
      // The auth.service.ts login signature is (email: string, pass: string) 
      // but in the controller we receive (@Body() signInDto) where usually it's {email, password}
      const response = await api.post('/auth/login', {
        email: credentials.email,
        password: credentials.pass,
      });
      return response.data;
    },
    onSuccess: (data) => {
      // Assuming backend returns { access_token, user: { ... } }
      login(data.user, data.access_token);
    },
  });
};
