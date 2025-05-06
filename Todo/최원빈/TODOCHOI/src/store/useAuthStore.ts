import { create } from 'zustand';
import { User } from 'firebase/auth';

type AuthState = {
  user: User | null;
  isAuthLoading: boolean;
  setUser: (user: User) => void;
  setAuthLoading: (loading: boolean) => void;
};

//여기서 user, setUser이 react의 상태와 비슷하다고 생각해도 좋다.
//보다시피, useAuthStore은 우리가 정의해둔 전역 상태와 상태변경함수들을 모아놓은 객체 덩어리
//set은 zustand에서 제공해주는 특별한 함수, 지정한 전역상태 (user,isAuthLoading의 값을 바꾸는 녀석)
const useAuthStore = create<AuthState>((set) => {
  return {
    user: null,
    isAuthLoading: true,
    setUser: (user) => set({ user }),
    setAuthLoading: (loading) => set({ isAuthLoading: loading }),
  };
});

export default useAuthStore;
