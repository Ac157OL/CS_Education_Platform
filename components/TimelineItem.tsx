
import React from 'react';
import { PracticeMedia, StudentWork } from '../types';
import { PlayCircleIcon, DocumentTextIcon } from './icons'; // Assuming DocumentTextIcon for student work

interface TimelineItemProps {
  date: string;
  title: string;
  description: string;
  media: PracticeMedia[];
  studentWorks?: StudentWork[];
  isLast?: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ date, title, description, media, studentWorks, isLast }) => {
  return (
    <div className="relative pl-8 sm:pl-32 py-6 group">
      {/* Vertical line */}
      {!isLast && (
        <div className="absolute left-0 sm:left-16 top-0 bottom-0 w-0.5 bg-blue-300 group-hover:bg-blue-500 transition-colors duration-300"></div>
      )}
      {/* Dot */}
      <div className="absolute left-[-5.5px] sm:left-[58.5px] top-7 w-4 h-4 bg-blue-500 rounded-full border-4 border-white group-hover:scale-110 transition-transform duration-300"></div>
      
      {/* Date */}
      <div className="absolute left-8 sm:left-0 top-7 sm:text-right sm:pr-8 w-28 text-sm text-gray-500 group-hover:text-blue-600 font-medium">
        {date}
      </div>

      {/* Content */}
      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
        <h3 className="text-2xl font-semibold text-blue-700 mb-2">{title}</h3>
        <p className="text-gray-700 mb-4">{description}</p>
        
        {media.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {media.map((item, index) => (
              <div key={index} className="rounded-lg overflow-hidden shadow">
                {item.type === 'image' ? (
                  <img src={item.url} alt={item.caption || title} className="w-full h-40 object-cover" />
                ) : (
                  <div className="relative w-full h-40 bg-black flex items-center justify-center">
                    <video controls src={item.url} className="max-h-full max-w-full">
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}
                {item.caption && <p className="text-xs text-gray-500 p-2 bg-gray-50">{item.caption}</p>}
              </div>
            ))}
          </div>
        )}

        {studentWorks && studentWorks.length > 0 && (
          <div>
            <h4 className="text-md font-semibold text-gray-700 mb-2">学生作品：</h4>
            <ul className="list-disc list-inside space-y-1">
              {studentWorks.map((work, index) => (
                <li key={index} className="text-sm">
                  <a href={work.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline flex items-center">
                    <DocumentTextIcon className="w-4 h-4 mr-1.5 flex-shrink-0" />
                    {work.title} {work.author && `(作者: ${work.author})`}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimelineItem;
