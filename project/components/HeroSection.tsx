
import React from 'react';
import { Link } from 'react-router-dom';
import { LightBulbIcon } from './icons';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  imageUrl?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ title, subtitle, ctaText, ctaLink, imageUrl }) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
          <LightBulbIcon className="w-16 h-16 text-yellow-400 mx-auto md:mx-0 mb-4" />
          <h2 className="text-4xl font-extrabold sm:text-5xl mb-4">
            {title}
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            {subtitle}
          </p>
          <Link
            to={ctaLink}
            className="inline-block bg-yellow-400 text-blue-800 font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-yellow-300 transition-colors transform hover:scale-105"
          >
            {ctaText}
          </Link>
        </div>
        {imageUrl && (
          <div className="md:w-1/2 flex justify-center">
            <img src={imageUrl} alt="Hero Illustration" className="rounded-lg shadow-2xl max-w-md w-full" />
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroSection;
