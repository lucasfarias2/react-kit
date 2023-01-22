import type { Request, Response } from 'express';

const homeController = (req: Request, res: Response) => {
  res.renderView('home', { name: 'Data server side', device: req.device });
};

export default homeController;
