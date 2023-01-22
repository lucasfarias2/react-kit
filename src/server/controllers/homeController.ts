import type { NextFunction, Request, Response } from 'express';
import restClient from '../restClient';

const fetch = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await restClient.get('/data');

    res.locals.initialState = { name: response?.data?.data, device: req.device };
  } catch {
    console.error('Error: Fetching data from API failed');
  }

  next();
};

const render = (req: Request, res: Response) => {
  res.renderView('home', res.locals.initialState);
};

export default { render, fetch };
