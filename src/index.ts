import express from 'express';
import { createServer as createViteServer } from 'vite';
import type { ViteDevServer } from 'vite';
import apiRouter from './api/router';
import homeController from './server/controllers/homeController';
import deviceMiddleware from './server/middleware/device';
import notFoundMiddleware from './server/middleware/notFound';
import renderViewMiddleware from './server/middleware/renderView';
import getServerOptions from './server/serverOptions';

const port = process.env.PORT || 3000;
const hmrPort = 3001;

const isProd = process.env.NODE_ENV === 'production';
const root = process.cwd();

let vite: ViteDevServer;
const app = express();

app.use(renderViewMiddleware);
app.use(deviceMiddleware);

if (isProd) {
  app.use((await import('compression')).default());
  app.use('/assets', express.static('dist/react/assets'));
} else {
  vite = await createViteServer(getServerOptions(root, hmrPort));
  app.use(vite.middlewares);

  app.use((req, res, next) => {
    res.locals.vite = vite;
    next();
  });
}

app.use('/api', apiRouter);
app.get('/', homeController.fetch, homeController.render);
app.use(notFoundMiddleware);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
