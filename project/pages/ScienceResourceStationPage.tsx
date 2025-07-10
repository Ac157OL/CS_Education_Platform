
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Modal from '../components/Modal';
import { ScienceResource, ScienceResourceType } from '../types';
import { PlayCircleIcon, PuzzlePieceIcon, DocumentTextIcon, CloudArrowUpIcon } from '../components/icons';
import { useAuth } from '../hooks/useAuth';
import { useData } from '../contexts/DataContext';

const ScienceResourceStationPage: React.FC = () => {
  const { currentUser } = useAuth();
  const { scienceResources } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState<ScienceResource | null>(null);

  const openModal = (resource: ScienceResource) => {
    setSelectedResource(resource);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedResource(null);
  };

  const getResourceIcon = (type: ScienceResourceType) => {
    switch (type) {
      case ScienceResourceType.INTERACTIVE_LESSON:
        return <PuzzlePieceIcon className="w-5 h-5 mr-1.5" />;
      case ScienceResourceType.VIDEO:
        return <PlayCircleIcon className="w-5 h-5 mr-1.5" />;
      case ScienceResourceType.ARTICLE:
        return <DocumentTextIcon className="w-5 h-5 mr-1.5" />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-yellow-600 mb-3">科普资源站</h1>
        <p className="text-lg text-gray-600">探索互动微课、科普视频与趣味文章</p>
      </header>

      {currentUser && currentUser.role === 'admin' && (
        <div className="mb-8 text-center">
          <Link
            to="/admin/upload-science-resource"
            className="inline-flex items-center px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition-colors"
          >
            <CloudArrowUpIcon className="w-5 h-5 mr-2" />
            添加新资源
          </Link>
        </div>
      )}
      
      {scienceResources.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {scienceResources.map((resource: ScienceResource) => (
            <Card
              key={resource.id}
              title={resource.title}
              description={resource.description}
              imageUrl={resource.thumbnailUrl}
              tags={[resource.type]}
              onClick={() => openModal(resource)}
              actions={[
                <button 
                  onClick={() => openModal(resource)}
                  className="flex items-center text-sm text-yellow-700 hover:text-yellow-900 hover:underline p-2 rounded-md hover:bg-yellow-50 transition-colors"
                  aria-label={`View ${resource.title}`}
                >
                  {getResourceIcon(resource.type)}
                  {resource.type === ScienceResourceType.INTERACTIVE_LESSON ? "开始互动" : "查看资源"}
                </button>
              ]}
            />
          ))}
        </div>
      ) : (
         <p className="text-center text-gray-500 text-xl py-10">
            暂无科普资源。
          </p>
      )}

      {selectedResource && (
        <Modal isOpen={isModalOpen} onClose={closeModal} title={selectedResource.title}>
          {selectedResource.type === ScienceResourceType.INTERACTIVE_LESSON && selectedResource.interactiveId === "computer_parts_puzzle" && (
            <div>
              <h3 className="text-xl font-semibold mb-2">《计算机部件解谜》</h3>
              <p className="mb-4">这是一个模拟的互动课程内容。在一个真实的应用中，这里会嵌入一个互动游戏或者 P5.js, Three.js 等实现的互动场景。</p>
              <img src="https://picsum.photos/seed/interactive_mock/500/300" alt="互动课程模拟" className="rounded-lg mb-4 w-full" />
              <p className="text-sm text-gray-600">请想象您正在拖拽部件到计算机主板上，并了解它们的功能。</p>
              <button 
                onClick={closeModal} 
                className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors"
              >
                完成互动
              </button>
            </div>
          )}
          {selectedResource.type === ScienceResourceType.VIDEO && selectedResource.contentUrl && (
            <div>
              <video controls autoPlay src={selectedResource.contentUrl} className="w-full rounded-lg" aria-label={`Video player for ${selectedResource.title}`}>
                您的浏览器不支持视频播放。
              </video>
              <p className="mt-4 text-gray-700">{selectedResource.description}</p>
            </div>
          )}
          {selectedResource.type === ScienceResourceType.ARTICLE && selectedResource.contentUrl && (
             <div>
              <p className="mb-4">您将被引导至外部文章页面。在一个真实的应用中，这里可能会直接显示文章内容，或者提供更丰富的阅读体验。</p>
              <a 
                href={selectedResource.contentUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition-colors"
              >
                阅读文章
              </a>
              <p className="mt-4 text-gray-700">{selectedResource.description}</p>
            </div>
          )}
           {selectedResource.type === ScienceResourceType.INTERACTIVE_LESSON && selectedResource.interactiveId !== "computer_parts_puzzle" && (
             <div>
                <p className="mb-4">这是一个模拟的其他互动课程。真实应用中会加载具体内容。</p>
                <img src="https://picsum.photos/seed/other_interactive/500/300" alt="其他互动课程模拟" className="rounded-lg mb-4 w-full" />
                 <button 
                    onClick={closeModal} 
                    className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors"
                >
                    关闭
                </button>
             </div>
           )}
        </Modal>
      )}
    </div>
  );
};

export default ScienceResourceStationPage;
