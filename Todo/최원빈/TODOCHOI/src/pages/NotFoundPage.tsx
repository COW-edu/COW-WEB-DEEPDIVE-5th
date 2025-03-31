import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 px-4">
      <h1 className="text-[120px] font-bold leading-none">404</h1>
      <p className="text-xl mb-4">이런! 찾으시는 페이지가 없어요.</p>
      <p className="text-sm text-gray-500 mb-8">
        주소를 다시 확인해보시거나, 홈으로 돌아가볼까요?
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition duration-200"
      >
        홈으로 가기
      </Link>

      <div className="absolute bottom-6 text-xs text-gray-400 italic">
        혹시 우주에 버려진 페이지인가요?
      </div>
    </div>
  );
};

export default NotFoundPage;
