import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

const AuthRedirect = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      console.log('로그인 감지했습니다. Home으로 갑니다.');
      navigate('/todo');
    }
  }, [user, navigate]);

  return null;
};

export default AuthRedirect;
