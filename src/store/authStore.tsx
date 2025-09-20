import { USER_STORE_KEY } from '@/data/constants';
import { login } from '@/services/authService';
import type { AuthStoreType, UserLoginType } from '@/types/user.type';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create<AuthStoreType>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      loading: false,
      error: null,
      login: async (user: UserLoginType) => {
        const data = await login(user);
        if (data.status !== 'error')          
          set({ user: data.user, token: data.token });
        return data
      },
      logout: () => {
        set({ user: null, token: null, });
      },
    }),
    {
      name: USER_STORE_KEY,
      partialize(state) {
        const { user, token } = state;
        return { user, token };
      }
    }
  )
);