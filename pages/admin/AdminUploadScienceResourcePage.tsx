
import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import { ScienceResource, ScienceResourceType } from '../../types';
import { CloudArrowUpIcon } from '../../components/icons';
import LoadingSpinner from '../../components/LoadingSpinner';

const AdminUploadScienceResourcePage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<ScienceResourceType>(ScienceResourceType.VIDEO);
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [contentUrl, setContentUrl] = useState('');
  const [interactiveId, setInteractiveId] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const { addScienceResource } = useData();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    if (!title || !description || !type || !thumbnailUrl) {
      setError("请填写所有必填字段 (标题, 描述, 类型, 缩略图URL)。");
      setIsLoading(false);
      return;
    }
    if ((type === ScienceResourceType.VIDEO || type === ScienceResourceType.ARTICLE) && !contentUrl) {
        setError("视频和文章类型需要内容URL。");
        setIsLoading(false);
        return;
    }
    if (type === ScienceResourceType.INTERACTIVE_LESSON && !interactiveId) {
        setError("互动微课类型需要互动ID。");
        setIsLoading(false);
        return;
    }


    const newResource: ScienceResource = {
      id: `sr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      title,
      description,
      type,
      thumbnailUrl,
      contentUrl: (type === ScienceResourceType.VIDEO || type === ScienceResourceType.ARTICLE) ? contentUrl : undefined,
      interactiveId: type === ScienceResourceType.INTERACTIVE_LESSON ? interactiveId : undefined,
    };

    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API
      addScienceResource(newResource);
      setSuccess("科普资源上传成功！");
      // Reset form
      setTitle('');
      setDescription('');
      setType(ScienceResourceType.VIDEO);
      setThumbnailUrl('');
      setContentUrl('');
      setInteractiveId('');
      setTimeout(() => navigate('/science-resources'), 1500);
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
        <h1 className="text-3xl font-bold text-gray-800">上传新科普资源</h1>
      </header>
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <div className="p-3 bg-red-100 text-red-700 border border-red-300 rounded-md">{error}</div>}
          {success && <div className="p-3 bg-green-100 text-green-700 border border-green-300 rounded-md">{success}</div>}

          <div>
            <label htmlFor="sr-title" className="block text-sm font-medium text-gray-700">标题 <span className="text-red-500">*</span></label>
            <input type="text" name="sr-title" id="sr-title" value={title} onChange={(e) => setTitle(e.target.value)} required className={commonInputClass} />
          </div>

          <div>
            <label htmlFor="sr-description" className="block text-sm font-medium text-gray-700">描述 <span className="text-red-500">*</span></label>
            <textarea name="sr-description" id="sr-description" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} required className={commonInputClass}></textarea>
          </div>

          <div>
            <label htmlFor="sr-type" className="block text-sm font-medium text-gray-700">类型 <span className="text-red-500">*</span></label>
            <select name="sr-type" id="sr-type" value={type} onChange={(e) => setType(e.target.value as ScienceResourceType)} required className={commonInputClass}>
              {Object.values(ScienceResourceType).map(rtype => (
                <option key={rtype} value={rtype}>{rtype}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="sr-thumbnailUrl" className="block text-sm font-medium text-gray-700">缩略图 URL <span className="text-red-500">*</span></label>
            <input type="url" name="sr-thumbnailUrl" id="sr-thumbnailUrl" value={thumbnailUrl} onChange={(e) => setThumbnailUrl(e.target.value)} required className={commonInputClass} placeholder="https://example.com/image.jpg"/>
            {thumbnailUrl && <img src={thumbnailUrl} alt="缩略图预览" className="mt-2 rounded-md max-h-40 object-contain border" />}
          </div>
          
          {(type === ScienceResourceType.VIDEO || type === ScienceResourceType.ARTICLE) && (
            <div>
              <label htmlFor="sr-contentUrl" className="block text-sm font-medium text-gray-700">内容 URL (视频/文章链接) <span className="text-red-500">*</span></label>
              <input type="url" name="sr-contentUrl" id="sr-contentUrl" value={contentUrl} onChange={(e) => setContentUrl(e.target.value)} required={type === ScienceResourceType.VIDEO || type === ScienceResourceType.ARTICLE} className={commonInputClass} />
            </div>
          )}

          {type === ScienceResourceType.INTERACTIVE_LESSON && (
            <div>
              <label htmlFor="sr-interactiveId" className="block text-sm font-medium text-gray-700">互动ID (微课标识) <span className="text-red-500">*</span></label>
              <input type="text" name="sr-interactiveId" id="sr-interactiveId" value={interactiveId} onChange={(e) => setInteractiveId(e.target.value)} required={type === ScienceResourceType.INTERACTIVE_LESSON} className={commonInputClass} placeholder="e.g., computer_parts_game" />
            </div>
          )}


          <div className="flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
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

export default AdminUploadScienceResourcePage;

