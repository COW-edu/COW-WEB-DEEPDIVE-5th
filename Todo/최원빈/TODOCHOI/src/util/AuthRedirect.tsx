import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

const AuthRedirect = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      console.log('로그인 감지했습니다. Home으로 갑니다.');
      navigate('/home');
    }
  }, [user, navigate]);

  return null; // 굳이 div 안 써도 됩니다
};

export default AuthRedirect;
