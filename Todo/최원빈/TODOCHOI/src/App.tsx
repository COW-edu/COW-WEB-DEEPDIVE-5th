import { useEffect, useState } from 'react';
import { auth, provider } from './auth/firebase.ts';
import { signInWithPopup, signOut } from 'firebase/auth';

function App() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // 로그인 상태 감지 (앱 켰을 때 자동 로그인 유지)
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  const login = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error('GitHub 로그인 실패:', err);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error('로그아웃 실패:', err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-gray-100">
      <h1 className="text-3xl font-bold">📝 TODOCHOI - GitHub 로그인</h1>

      {user ? (
        <div className="text-center">
          <p className="mb-4">
            환영합니다, <strong>{user.displayName}</strong>님!
          </p>
          <img
            src={user.photoURL}
            alt="프로필"
            className="w-16 h-16 rounded-full mx-auto mb-4"
          />
          <button
            onClick={logout}
            className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            로그아웃
          </button>
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
  );
}

export default App;
