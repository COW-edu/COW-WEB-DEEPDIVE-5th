import { create } from 'zustand';

import { User } from 'firebase/auth';

type AuthState = {
  user: User | null;
  isAuthLoading: boolean;
  setUser: (user: User) => void;
  setAuthLoading: (loading: boolean) => void;
};

//store의 상태는 객체형태로 되어있다.
const useAuthStore = create<AuthState>((set) => {
  return {
    user: null,
    isAuthLoading: true,
    setUser: (user) => set({ user }),
    setAuthLoading: (loading) => set({ isAuthLoading: loading }),
  };
});

export default useAuthStore;
