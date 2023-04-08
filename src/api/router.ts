import express from 'express';
import dataController from './controllers/dataController.js';

const apiRouter = express.Router();

apiRouter.get('/data', dataController);

apiRouter.use('*', (_req, res) => {
  res.send('Error 404: Page not found');
});

export default apiRouter;
