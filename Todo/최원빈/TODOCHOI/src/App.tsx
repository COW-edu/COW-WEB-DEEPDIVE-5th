import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './auth/firebase';
import useAuthStore from './store/useAuthStore';
import { router } from './router/router';
import LoadingSpinner from './components/atomic/LoadingSpinner';

function App() {
  const { setUser, setAuthLoading, isAuthLoading } = useAuthStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('자동로그인 감지:', user);
      if (user) {
        setUser(user);
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, [setUser, setAuthLoading]);

  if (isAuthLoading) {
    return (
    //LoadingSpinner는 독립적인 컴포넌트라, 유동적으로 import하는 컴포넌트 내부에서 인라인 스타일링으로 바꿨습니다.
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner message="깃허브 자동 로그인 확인 중..." />
      </div>
    );
  }

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
