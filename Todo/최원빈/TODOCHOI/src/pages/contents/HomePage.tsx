import { useEffect, useState } from 'react';
import { auth, provider } from '../../auth/firebase.ts';
import { signInWithPopup, signOut } from 'firebase/auth';
import type { User } from 'firebase/auth'; //firebase type alias
import LoadingSpinner from '../../components/atomic/LoadingSpinner';
import AuthRedirect from '../../util/AuthRedirect.tsx';

const Homepage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMessage, setLoadingMessage] = useState<string>('');

  //자동로그인은 좋다 이거야. 근데 너무 자동이라 사용자 입장에선 힘들듯
  const [redirect, setRedirect] = useState<boolean>(false);

  useEffect(() => {
    const authListener = auth.onAuthStateChanged((user) => {
      console.log('홈페이지 내부 auth 상태 변화:', user);
      setUser(user);
      setLoading(false);
    });

    return () => authListener();
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

  const handleRedirect = () => {
    setRedirect(true);
  };

  if (loading) {
    return (
      <>
        <div className="flex justify-center items-center h-screen">
          <LoadingSpinner message={loadingMessage}></LoadingSpinner>
        </div>
      </>
    );
  }

  return (
    <>
      {redirect ? <AuthRedirect /> : null}
      <div className="  flex-1 flex flex-col items-center justify-center gap-6 bg-gray-100">
        {user ? (
          <div className="text-center">
            <p className="mb-4">
              환영합니다, <strong>{user.displayName}</strong>님!
            </p>
            <img
              src={user?.photoURL ?? ''}
              alt="프로필"
              className="w-16 h-16 rounded-full mx-auto mb-4"
            />
            <div className="flex flex-col justify-center items-center gap-3">
              <button
                onClick={logout}
                className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                로그아웃
              </button>
              <button
                onClick={handleRedirect}
                className="px-6 py-2 bg-blue-400 text-white rounded hover:bg-red-600 transition"
              >
                TODO 시작하기 !
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={login}
            className="px-6 py-3 bg-black text-white rounded hover:bg-gray-800 transition"
          >
            GitHub로 로그인
          </button>
        )}
      </div>
    </>
  );
};

export default Homepage;
