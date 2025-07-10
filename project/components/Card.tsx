
import React from 'react';

interface CardProps {
  title: string;
  description: string;
  imageUrl?: string;
  tags?: string[];
  actions?: React.ReactNode[];
  onClick?: () => void;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, description, imageUrl, tags, actions, onClick, className }) => {
  return (
    <div 
      className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl flex flex-col ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      {imageUrl && (
        <div className="w-full h-48 overflow-hidden">
          <img className="w-full h-full object-cover" src={imageUrl} alt={title} />
        </div>
      )}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4 flex-grow">{description}</p>
        {tags && tags.length > 0 && (
          <div className="mb-4">
            {tags.map((tag) => (
              <span key={tag} className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}
        {actions && actions.length > 0 && (
          <div className="mt-auto pt-4 border-t border-gray-200 flex space-x-3">
            {actions.map((action, index) => (
              <div key={index}>{action}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
