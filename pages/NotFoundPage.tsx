
import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center px-4">
      <img src="https://picsum.photos/seed/404page/300/300" alt="Not Found" className="rounded-full shadow-lg w-64 h-64 object-cover mb-8" />
      <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
      <h2 className="text-3xl font-semibold text-gray-700 mb-6">哎呀！页面飞走了</h2>
      <p className="text-gray-600 mb-8 max-w-md">
        您要找的页面似乎不存在，或者它正在宇宙的某个角落进行一次意外的太空旅行。
      </p>
      <Link
        to="/"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-colors transform hover:scale-105"
      >
        返回首页
      </Link>
    </div>
  );
};

export default NotFoundPage;
