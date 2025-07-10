
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import { TeachingCase, ResourceCategory } from '../types';
import { DownloadIcon, DocumentTextIcon, CloudArrowUpIcon } from '../components/icons';
import { useAuth } from '../hooks/useAuth';
import { useData } from '../contexts/DataContext';

const TeachingCaseLibraryPage: React.FC = () => {
  const { currentUser } = useAuth();
  const { teachingCases } = useData();
  const [selectedCategory, setSelectedCategory] = useState<ResourceCategory | 'all'>('all');

  const filteredCases = useMemo(() => {
    if (selectedCategory === 'all') {
      return teachingCases;
    }
    return teachingCases.filter(tc => tc.category === selectedCategory);
  }, [selectedCategory, teachingCases]);

  const categories = useMemo(() => ['all', ...Object.values(ResourceCategory)], []);

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-blue-700 mb-3">教学案例库</h1>
        <p className="text-lg text-gray-600">探索丰富的教学案例、教案与课件资源</p>
      </header>

      {currentUser && currentUser.role === 'admin' && (
        <div className="mb-8 text-center">
          <Link
            to="/admin/upload-teaching-case"
            className="inline-flex items-center px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition-colors"
          >
            <CloudArrowUpIcon className="w-5 h-5 mr-2" />
            上传新案例
          </Link>
        </div>
      )}

      <div className="mb-8 flex justify-center space-x-2 flex-wrap">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category as ResourceCategory | 'all')}
            className={`px-4 py-2 my-1 rounded-full text-sm font-medium transition-colors
              ${selectedCategory === category 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-gray-200 text-gray-700 hover:bg-blue-100 hover:text-blue-700'
              }`}
          >
            {category === 'all' ? '全部案例' : category}
          </button>
        ))}
      </div>

      {filteredCases.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCases.map((tc: TeachingCase) => (
            <Card
              key={tc.id}
              title={tc.title}
              description={tc.description}
              imageUrl={tc.thumbnailUrl}
              tags={[tc.category]}
              actions={[
                ...(tc.教案Link ? [<a href={tc.教案Link} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm text-blue-600 hover:text-blue-800 hover:underline p-2 rounded-md hover:bg-blue-50 transition-colors">
                  <DocumentTextIcon className="w-5 h-5 mr-1.5" /> 教案下载
                </a>] : []),
                ...(tc.课件Link ? [<a href={tc.课件Link} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm text-green-600 hover:text-green-800 hover:underline p-2 rounded-md hover:bg-green-50 transition-colors">
                  <DownloadIcon className="w-5 h-5 mr-1.5" /> 课件下载
                </a>] : [])
              ]}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-xl py-10">
          该分类下暂无教学案例。
        </p>
      )}
    </div>
  );
};

export default TeachingCaseLibraryPage;
