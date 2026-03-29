import { useEffect, useState } from 'react';
import { auth, provider } from '../auth/firebase.ts';
import { signInWithPopup, signOut } from 'firebase/auth';
import type { User } from 'firebase/auth';
import LoadingSpinner from '../components/atomic/LoadingSpinner.tsx';
import AuthRedirect from '../util/AuthRedirect.tsx';
import Button from '../components/atomic/Button.tsx';

const Homepage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] =
    useState('인증 상태 확인 중입니다...');
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log('홈페이지 내부 auth 상태 변화:', user);
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async () => {
    setLoadingMessage('로그인 처리 중입니다...');
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error('GitHub 로그인 실패:', err);
    }
  };

  const logout = async () => {
    setLoadingMessage('로그아웃 처리 중입니다...');
    try {
      await signOut(auth);
    } catch (err) {
      console.error('로그아웃 실패:', err);
    }
  };

  if (redirect) return <AuthRedirect />;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
        <LoadingSpinner message={loadingMessage} />
      </div>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="text-center px-4 py-6 rounded-lg shadow-md bg-white dark:bg-gray-800 w-full max-w-sm">
        {user ? (
          <>
            <p className="text-gray-800 dark:text-gray-100 mb-4 text-lg">
              환영합니다, <strong>{user.displayName}</strong>님!
            </p>
            <img
              src={user?.photoURL ?? ''}
              alt="프로필"
              className="w-16 h-16 rounded-full mx-auto mb-4 border"
            />
            <div className="flex flex-col gap-3">
              <Button onClick={() => setRedirect(true)} variant="primary">
                시작하기
              </Button>
              <Button onClick={logout} variant="danger">
                로그아웃
              </Button>
            </div>
          </>
        ) : (
          <button
            onClick={login}
            className="w-full px-4 py-3 rounded bg-black text-white hover:bg-gray-800 transition"
          >
            GitHub로 로그인
          </button>
        )}
      </div>
    </main>
  );
};

export default Homepage;
