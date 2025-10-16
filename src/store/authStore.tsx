import { USER_STORE_KEY } from '@/data/constants';
import { login ,getProfile} from '@/services/authService';
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
        if (data.success)
          set({ user: data.user, token: data.data.accessToken });
        return data
      },
      logout: () => {
        set({ user: null, token: null, });
      },
        getProfile: async () => {
    try {
        const response = await getProfile(); // استرجاع بيانات المستخدم
        set({ user: response.data }); // تخزين البيانات في Zustand store
    } catch (error) {
        console.error("Error fetching profile:", error);
    }
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