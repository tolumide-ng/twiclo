import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import Loader from './components/molecules/Loader/Loader';
import { HomeFeed } from './components/pages/HomeFeed/HomeFeed';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <React.Suspense fallback={<Loader />}>
        <div className="appWrapper">
          <main className="app">
            <Routes>
              <Route path="/" element={<HomeFeed />} />
            </Routes>
          </main>
        </div>
      </React.Suspense>
    </BrowserRouter>
  );
}
