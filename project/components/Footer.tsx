
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-800 text-gray-300 py-8 mt-12">
      <div className="container mx-auto px-6 text-center">
        <p>&copy; {currentYear} 交互式数字科普平台. 版权所有.</p>
        <p className="text-sm mt-1">致力于打造永不落幕的数字科普体验</p>
      </div>
    </footer>
  );
};

export default Footer;
