
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import TeachingCaseLibraryPage from './pages/TeachingCaseLibraryPage';
import PracticeRecordHallPage from './pages/PracticeRecordHallPage';
import ScienceResourceStationPage from './pages/ScienceResourceStationPage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminUploadTeachingCasePage from './pages/admin/AdminUploadTeachingCasePage';
import AdminUploadPracticeRecordPage from './pages/admin/AdminUploadPracticeRecordPage';
import AdminUploadScienceResourcePage from './pages/admin/AdminUploadScienceResourcePage';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './hooks/useAuth';

const App: React.FC = () => {
  const { currentUser } = useAuth(); // Used for redirecting logged-in users from login/register

  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/teaching-cases" element={<TeachingCaseLibraryPage />} />
            <Route path="/practice-records" element={<PracticeRecordHallPage />} />
            <Route path="/science-resources" element={<ScienceResourceStationPage />} />
            
            <Route path="/login" element={currentUser ? <Navigate to="/" replace /> : <LoginPage />} />
            <Route path="/register" element={currentUser ? <Navigate to="/" replace /> : <RegisterPage />} />

            {/* Admin Routes */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute adminOnly={true}>
                  <AdminDashboardPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/upload-teaching-case" 
              element={
                <ProtectedRoute adminOnly={true}>
                  <AdminUploadTeachingCasePage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/upload-practice-record" 
              element={
                <ProtectedRoute adminOnly={true}>
                  <AdminUploadPracticeRecordPage />
                </ProtectedRoute>
              } 
            />
             <Route 
              path="/admin/upload-science-resource" 
              element={
                <ProtectedRoute adminOnly={true}>
                  <AdminUploadScienceResourcePage />
                </ProtectedRoute>
              } 
            />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;
