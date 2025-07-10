
import React from 'react';
import { Link } from 'react-router-dom';
import { CloudArrowUpIcon, CollectionIcon, LightBulbIcon, PuzzlePieceIcon } from '../../components/icons'; // Adjust icons as needed

const AdminDashboardPage: React.FC = () => {
  const adminLinks = [
    { name: "上传教学案例", path: "/admin/upload-teaching-case", icon: CollectionIcon, description: "添加新的教学案例、教案和课件。" },
    { name: "上传实践纪实", path: "/admin/upload-practice-record", icon: LightBulbIcon, description: "记录并分享新的实践活动和学生作品。" },
    { name: "上传科普资源", path: "/admin/upload-science-resource", icon: PuzzlePieceIcon, description: "发布新的互动微课、视频或文章。" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">管理后台</h1>
        <p className="text-lg text-gray-600">管理平台内容资源</p>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {adminLinks.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.path}
              className="block p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center text-blue-600 mb-3">
                <Icon className="w-8 h-8 mr-3" />
                <h2 className="text-xl font-semibold">{item.name}</h2>
              </div>
              <p className="text-gray-600 text-sm">{item.description}</p>
              <div className="mt-4 text-right">
                 <span className="inline-flex items-center text-sm text-blue-500 hover:text-blue-700">
                    前往上传 <CloudArrowUpIcon className="w-4 h-4 ml-1" />
                 </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default AdminDashboardPage;
