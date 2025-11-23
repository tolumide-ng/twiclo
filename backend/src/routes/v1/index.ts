import express from 'express';
import ProfileRoutes from './profile';
import FeedRoutes from './feed';

const routes = (app: express.Application) => {
  app.use('/api/v1/user', ProfileRoutes);
  app.use('/api/v1/feed', FeedRoutes);
};

export default routes;
