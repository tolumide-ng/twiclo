import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import Loader from './components/molecules/Loader/Loader';
import { HomeFeed } from './components/pages/HomeFeed/HomeFeed';
import { UserProfile } from './components/pages/UserProfile/UserProfile';
import { NotFound } from './components/pages/NotFound/NotFound';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <React.Suspense fallback={<Loader />}>
        <div className="appWrapper">
          <main className="app">
            <Routes>
              <Route path="/" element={<HomeFeed />} />
              <Route path="/:userName" element={<UserProfile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </React.Suspense>
    </BrowserRouter>
  );
}
