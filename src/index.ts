/* eslint-disable @typescript-eslint/ban-ts-comment */
import express, { NextFunction } from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer as createViteServer } from 'vite';
import type { ViteDevServer } from 'vite';
import renderViewMiddleware from './server/middleware/renderView';
import getServerOptions from './server/serverOptions';

const port = 3000;
const hmrPort = 3001;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const resolve = (p: string) => path.resolve(__dirname, p);

const isProd = process.env.NODE_ENV === 'production';
const root = process.cwd();

let vite: ViteDevServer;
const app = express();

// @ts-ignore
app.use(async (req, res: IResponse, next: NextFunction) => {
  if (!isProd) {
    res.locals.vite = await createViteServer(getServerOptions(root, hmrPort));
  }
  next();
});

// @ts-ignore
app.use(renderViewMiddleware);

if (isProd) {
  app.use((await import('compression')).default());
  app.use('/assets', express.static('dist/react/assets'));
} else {
  vite = await createViteServer(getServerOptions(root, hmrPort));
  app.use(vite.middlewares);
}

// @ts-ignore
app.use('*', (req: IRequest, res: IResponse) => {
  res.renderView(resolve('./react/ssr/home.js'), { name: 'Test data new' });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
