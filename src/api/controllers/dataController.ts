import type { Request, Response } from 'express';

const dataController = (_req: Request, res: Response) => {
  const fetchedData = {
    data: 'Testing data api call',
  };

  res.json(fetchedData);
};

export default dataController;
