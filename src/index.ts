import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer as createViteServer } from 'vite';
import type { ViteDevServer } from 'vite';
import getServerOptions from './server/serverOptions';

const port = 3000;
const hmrPort = 3001;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const resolve = (p: string) => path.resolve(__dirname, p);

const isProd = process.env.NODE_ENV === 'production';
const root = process.cwd();

let vite: ViteDevServer;
const app = express();

if (isProd) {
  app.use((await import('compression')).default());
  app.use('/assets', express.static('dist/react/client/assets'));
} else {
  vite = await createViteServer(getServerOptions(root, hmrPort));
  app.use(vite.middlewares);
}

app.use('*', async (req, res: express.Response) => {
  try {
    const url = req.originalUrl;

    const htmlFromFile = fs.readFileSync(resolve(isProd ? './react/client/index.html' : './index.html'), 'utf-8');

    let render, html;

    if (isProd) {
      html = htmlFromFile;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      render = (await import(resolve('./react/ssr/home.js'))).render;
    } else {
      html = await vite.transformIndexHtml(url, htmlFromFile);
      render = (await vite.ssrLoadModule('/src/server/entries/home.tsx')).render;
    }

    const data = { name: 'Test data from server' };

    const serializedData = JSON.stringify(data);

    const renderedToString: string = render(url, data);

    const finalHtml = html
      .replace(`<!--app-html-->`, renderedToString)
      .replace('// preloaded-state', `window.__PRELOADED_STATE__ = ${serializedData}`);

    res.status(200).set({ 'Content-Type': 'text/html' }).end(finalHtml);
  } catch (e) {
    const error = e as Error;
    if (!isProd) {
      vite.ssrFixStacktrace(error);
    }
    console.log(error.stack);
    res.status(500).end(error.stack);
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
