
import React from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import { AcademicCapIcon, CollectionIcon, LightBulbIcon } from '../components/icons';
import { NAV_LINKS } from '../constants';

const HomePage: React.FC = () => {
  const features = [
    {
      name: NAV_LINKS[1].name, // Teaching Case Library
      description: "精选教学案例与课件，助力计算机科学与AI教育。",
      icon: AcademicCapIcon,
      link: NAV_LINKS[1].path,
      bgColor: 'bg-sky-100',
      textColor: 'text-sky-700',
      iconColor: 'text-sky-500',
    },
    {
      name: NAV_LINKS[2].name, // Practice Record Hall
      description: "图文并茂的实践活动记录，展示学习成果与精彩瞬间。",
      icon: CollectionIcon,
      link: NAV_LINKS[2].path,
      bgColor: 'bg-green-100',
      textColor: 'text-green-700',
      iconColor: 'text-green-500',
    },
    {
      name: NAV_LINKS[3].name, // Science Resource Station
      description: "互动微课与科普视频，点燃科学探索的兴趣火花。",
      icon: LightBulbIcon,
      link: NAV_LINKS[3].path,
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-700',
      iconColor: 'text-yellow-500',
    },
  ];

  return (
    <div>
      <HeroSection
        title="欢迎来到交互式数字科普平台"
        subtitle="汇聚优质教学案例、生动实践纪实与趣味科普资源，打造永不落幕的互动学习乐园。"
        ctaText="开始探索"
        ctaLink="/teaching-cases"
        imageUrl="https://picsum.photos/seed/welcome/600/400"
      />
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">平台核心模块</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <Link to={feature.link} key={feature.name} className={`block p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1 ${feature.bgColor}`}>
                <feature.icon className={`w-12 h-12 mb-4 ${feature.iconColor}`} />
                <h3 className={`text-2xl font-semibold mb-3 ${feature.textColor}`}>{feature.name}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">解决科普“三难”困境</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
                我们致力于克服传统科普资源分散难聚合、城乡共享渠道匮乏、以及单向输出缺乏互动性的挑战，提供一站式、互动化、云共享的数字科普新体验。
            </p>
            <div className="grid md:grid-cols-3 gap-8 text-left">
                <div className="p-6 border border-blue-200 rounded-lg bg-blue-50">
                    <h3 className="text-xl font-semibold text-blue-700 mb-2">资源集中共享</h3>
                    <p className="text-gray-700">整合优质教学案例、实践记录与科普视频，打破信息孤岛，实现云端便捷访问。</p>
                </div>
                <div className="p-6 border border-green-200 rounded-lg bg-green-50">
                    <h3 className="text-xl font-semibold text-green-700 mb-2">弥合数字鸿沟</h3>
                    <p className="text-gray-700">提供线上平台，促进城乡教育资源均衡，让优质科普内容触手可及。</p>
                </div>
                <div className="p-6 border border-yellow-200 rounded-lg bg-yellow-50">
                    <h3 className="text-xl font-semibold text-yellow-700 mb-2">增强学习互动</h3>
                    <p className="text-gray-700">引入互动微课和社区点播功能，变被动接收为主动探索，提升学习趣味性。</p>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
