
import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import { PracticeRecord, PracticeMedia, StudentWork } from '../../types';
import { CloudArrowUpIcon } from '../../components/icons';
import LoadingSpinner from '../../components/LoadingSpinner';

const AdminUploadPracticeRecordPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Default to today
  const [description, setDescription] = useState('');
  // Simplified media and student works for this form
  const [mediaUrl, setMediaUrl] = useState('');
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');
  const [mediaCaption, setMediaCaption] = useState('');
  const [studentWorkTitle, setStudentWorkTitle] = useState('');
  const [studentWorkUrl, setStudentWorkUrl] = useState('');
  const [studentWorkAuthor, setStudentWorkAuthor] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const { addPracticeRecord } = useData();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    if (!title || !date || !description) {
      setError("请填写所有必填字段 (标题, 日期, 描述)。");
      setIsLoading(false);
      return;
    }

    const mediaItems: PracticeMedia[] = [];
    if (mediaUrl) {
      mediaItems.push({ type: mediaType, url: mediaUrl, caption: mediaCaption || undefined });
    }

    const studentWorksItems: StudentWork[] = [];
    if (studentWorkTitle && studentWorkUrl) {
      studentWorksItems.push({ title: studentWorkTitle, url: studentWorkUrl, author: studentWorkAuthor || undefined });
    }

    const newRecord: PracticeRecord = {
      id: `pr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      title,
      date,
      description,
      media: mediaItems,
      studentWorks: studentWorksItems.length > 0 ? studentWorksItems : undefined,
    };

    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API
      addPracticeRecord(newRecord);
      setSuccess("实践纪实上传成功！");
      // Reset form
      setTitle('');
      setDate(new Date().toISOString().split('T')[0]);
      setDescription('');
      setMediaUrl('');
      setMediaType('image');
      setMediaCaption('');
      setStudentWorkTitle('');
      setStudentWorkUrl('');
      setStudentWorkAuthor('');
      setTimeout(() => navigate('/practice-records'), 1500);
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
        <h1 className="text-3xl font-bold text-gray-800">上传新实践纪实</h1>
      </header>
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <div className="p-3 bg-red-100 text-red-700 border border-red-300 rounded-md">{error}</div>}
          {success && <div className="p-3 bg-green-100 text-green-700 border border-green-300 rounded-md">{success}</div>}

          <div>
            <label htmlFor="pr-title" className="block text-sm font-medium text-gray-700">标题 <span className="text-red-500">*</span></label>
            <input type="text" name="pr-title" id="pr-title" value={title} onChange={(e) => setTitle(e.target.value)} required className={commonInputClass} />
          </div>

          <div>
            <label htmlFor="pr-date" className="block text-sm font-medium text-gray-700">日期 <span className="text-red-500">*</span></label>
            <input type="date" name="pr-date" id="pr-date" value={date} onChange={(e) => setDate(e.target.value)} required className={commonInputClass} />
          </div>

          <div>
            <label htmlFor="pr-description" className="block text-sm font-medium text-gray-700">描述 <span className="text-red-500">*</span></label>
            <textarea name="pr-description" id="pr-description" rows={4} value={description} onChange={(e) => setDescription(e.target.value)} required className={commonInputClass}></textarea>
          </div>
          
          <fieldset className="border p-4 rounded-md">
            <legend className="text-lg font-medium text-gray-700 px-2">主要媒体 (可选)</legend>
            <div className="space-y-4">
                 <div>
                    <label htmlFor="mediaUrl" className="block text-sm font-medium text-gray-700">媒体 URL</label>
                    <input type="url" name="mediaUrl" id="mediaUrl" value={mediaUrl} onChange={(e) => setMediaUrl(e.target.value)} className={commonInputClass} placeholder="https://example.com/image.jpg or video.mp4" />
                     {mediaUrl && mediaType === 'image' && <img src={mediaUrl} alt="媒体预览" className="mt-2 rounded-md max-h-40 object-contain border" />}
                </div>
                <div>
                    <label htmlFor="mediaType" className="block text-sm font-medium text-gray-700">媒体类型</label>
                    <select name="mediaType" id="mediaType" value={mediaType} onChange={(e) => setMediaType(e.target.value as 'image' | 'video')} className={commonInputClass}>
                        <option value="image">图片</option>
                        <option value="video">视频</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="mediaCaption" className="block text-sm font-medium text-gray-700">媒体说明 (可选)</label>
                    <input type="text" name="mediaCaption" id="mediaCaption" value={mediaCaption} onChange={(e) => setMediaCaption(e.target.value)} className={commonInputClass} />
                </div>
            </div>
          </fieldset>

           <fieldset className="border p-4 rounded-md">
            <legend className="text-lg font-medium text-gray-700 px-2">学生作品 (可选)</legend>
            <div className="space-y-4">
                <div>
                    <label htmlFor="studentWorkTitle" className="block text-sm font-medium text-gray-700">作品标题</label>
                    <input type="text" name="studentWorkTitle" id="studentWorkTitle" value={studentWorkTitle} onChange={(e) => setStudentWorkTitle(e.target.value)} className={commonInputClass} />
                </div>
                 <div>
                    <label htmlFor="studentWorkUrl" className="block text-sm font-medium text-gray-700">作品链接/URL</label>
                    <input type="url" name="studentWorkUrl" id="studentWorkUrl" value={studentWorkUrl} onChange={(e) => setStudentWorkUrl(e.target.value)} className={commonInputClass} />
                </div>
                 <div>
                    <label htmlFor="studentWorkAuthor" className="block text-sm font-medium text-gray-700">作者 (可选)</label>
                    <input type="text" name="studentWorkAuthor" id="studentWorkAuthor" value={studentWorkAuthor} onChange={(e) => setStudentWorkAuthor(e.target.value)} className={commonInputClass} />
                </div>
            </div>
          </fieldset>


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

export default AdminUploadPracticeRecordPage;
