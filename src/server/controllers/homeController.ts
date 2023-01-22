import type { Request, Response } from 'express';

const homeController = (req: Request, res: Response) => {
  res.renderView('home', { name: 'Test data new' });
};

export default homeController;
