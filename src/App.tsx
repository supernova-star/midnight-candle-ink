import React from 'react';
import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { DesktopHome } from './pages/DesktopHome/DesktopHome';
import { Admin } from './pages/Admin/Admin';
import { AdminLogin } from './pages/Admin/AdminLogin';
import { AdminRoute } from './pages/Admin/AdminRoute';
import { AdminError } from './pages/Admin/AdminError';
import { NotFound } from './pages/NotFound/NotFound';
import { About } from './pages/About/About';
import { Stories } from './pages/Stories/Stories';
import { StoryDetail } from './pages/StoryDetail/StoryDetail';
import { Reader } from './pages/Reader/Reader';

export const App: React.FC = () => {
  useEffect(() => {
    if (window.location.pathname.startsWith('/adminsupa')) {
      return;
    }

    let isDisposed = false;
    let activityInterval: number | undefined;

    const startVisitorTracking = async () => {
      const { recordVisitorActivity } = await import('./utils/visitorTracking');

      if (isDisposed) return;

      void recordVisitorActivity();
      activityInterval = window.setInterval(() => {
        void recordVisitorActivity();
      }, 60 * 1000);
    };

    void startVisitorTracking();

    return () => {
      isDisposed = true;

      if (activityInterval !== undefined) {
        window.clearInterval(activityInterval);
      }
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DesktopHome />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/stories" element={<Stories />} />
        <Route
          path="/stories/:storyId/chapters/:chapterId"
          element={<Reader />}
        />
        <Route path="/stories/:storyId" element={<StoryDetail />} />
        <Route path="/about" element={<About />} />

        <Route path="/adminsupa" element={<AdminLogin />} />
        <Route path="/adminsupa/error" element={<AdminError />} />

        <Route
          path="/adminsupa/dashboard"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        />

        <Route path="/not-found" element={<NotFound />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
