
import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import { TeachingCase, ResourceCategory } from '../../types';
import { CloudArrowUpIcon } from '../../components/icons';
import LoadingSpinner from '../../components/LoadingSpinner';

const AdminUploadTeachingCasePage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<ResourceCategory>(ResourceCategory.AI);
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [教案Link, set教案Link] = useState('');
  const [课件Link, set课件Link] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const { addTeachingCase } = useData();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    // Basic validation
    if (!title || !description || !category || !thumbnailUrl) {
      setError("请填写所有必填字段 (标题, 描述, 分类, 缩略图URL)。");
      setIsLoading(false);
      return;
    }

    const newCase: TeachingCase = {
      id: `tc_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`, // More unique ID
      title,
      description,
      category,
      thumbnailUrl,
      教案Link: 教案Link || undefined,
      课件Link: 课件Link || undefined,
    };

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      addTeachingCase(newCase);
      setSuccess("教学案例上传成功！");
      // Reset form
      setTitle('');
      setDescription('');
      setCategory(ResourceCategory.AI);
      setThumbnailUrl('');
      set教案Link('');
      set课件Link('');
      setTimeout(() => navigate('/teaching-cases'), 1500); // Redirect after a short delay
    } catch (err) {
      console.error("Upload failed:", err);
      setError("上传失败，请稍后再试。");
    } finally {
      setIsLoading(false);
    }
  };

  const commonInputClass = "mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm";

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800">上传新教学案例</h1>
      </header>
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <div className="p-3 bg-red-100 text-red-700 border border-red-300 rounded-md">{error}</div>}
          {success && <div className="p-3 bg-green-100 text-green-700 border border-green-300 rounded-md">{success}</div>}

          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">标题 <span className="text-red-500">*</span></label>
            <input type="text" name="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required className={commonInputClass} />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">描述 <span className="text-red-500">*</span></label>
            <textarea name="description" id="description" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} required className={commonInputClass}></textarea>
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">分类 <span className="text-red-500">*</span></label>
            <select name="category" id="category" value={category} onChange={(e) => setCategory(e.target.value as ResourceCategory)} required className={commonInputClass}>
              {Object.values(ResourceCategory).map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="thumbnailUrl" className="block text-sm font-medium text-gray-700">缩略图 URL <span className="text-red-500">*</span></label>
            <input type="url" name="thumbnailUrl" id="thumbnailUrl" value={thumbnailUrl} onChange={(e) => setThumbnailUrl(e.target.value)} required className={commonInputClass} placeholder="https://example.com/image.jpg" />
            {thumbnailUrl && <img src={thumbnailUrl} alt="缩略图预览" className="mt-2 rounded-md max-h-40 object-contain border" />}
          </div>
          
          <div>
            <label htmlFor="教案Link" className="block text-sm font-medium text-gray-700">教案链接 (可选)</label>
            <input type="url" name="教案Link" id="教案Link" value={教案Link} onChange={(e) => set教案Link(e.target.value)} className={commonInputClass} placeholder="https://example.com/document.pdf"/>
          </div>

          <div>
            <label htmlFor="课件Link" className="block text-sm font-medium text-gray-700">课件链接 (可选)</label>
            <input type="url" name="课件Link" id="课件Link" value={课件Link} onChange={(e) => set课件Link(e.target.value)} className={commonInputClass} placeholder="https://example.com/slides.ppt"/>
          </div>

          <div className="flex items-center justify-end space-x-3">
             <button
              type="button"
              onClick={() => navigate(-1)} // Go back
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              取消
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400"
            >
              {isLoading ? <LoadingSpinner size="sm" /> : <CloudArrowUpIcon className="w-5 h-5 mr-2" />}
              {isLoading ? '上传中...' : '确认上传'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminUploadTeachingCasePage;
