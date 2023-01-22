import type { Request, Response } from 'express';

export default (req: Request, res: Response) => {
  res.send('Error 404: Page not found');
};
