
import React from 'react';
import { Link } from 'react-router-dom';
import TimelineItem from '../components/TimelineItem';
import { CloudArrowUpIcon } from '../components/icons';
import { useAuth } from '../hooks/useAuth';
import { useData } from '../contexts/DataContext';


const PracticeRecordHallPage: React.FC = () => {
  const { currentUser } = useAuth();
  const { practiceRecords } = useData();

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-green-700 mb-3">实践纪实馆</h1>
        <p className="text-lg text-gray-600">回顾精彩的实践活动，见证学习与成长的足迹</p>
      </header>

      {currentUser && currentUser.role === 'admin' && (
        <div className="mb-8 text-center">
          <Link
            to="/admin/upload-practice-record"
            className="inline-flex items-center px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition-colors"
          >
            <CloudArrowUpIcon className="w-5 h-5 mr-2" />
            添加新纪实
          </Link>
        </div>
      )}
      
      <div className="relative">
        {practiceRecords.length > 0 ? (
          practiceRecords.map((record, index) => (
            <TimelineItem
              key={record.id}
              date={record.date}
              title={record.title}
              description={record.description}
              media={record.media}
              studentWorks={record.studentWorks}
              isLast={index === practiceRecords.length - 1}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 text-xl py-10">
            暂无实践纪实。
          </p>
        )}
      </div>
    </div>
  );
};

export default PracticeRecordHallPage;
