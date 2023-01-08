import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import getServerOptions from './src/server/getServerOptions';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const port = 3000;
const hmrPort = 3001;

export async function createServer(root = process.cwd()) {
  const resolve = (p: string) => path.resolve(__dirname, p);

  const app = express();

  const vite = await (await import('vite')).createServer(getServerOptions(root, hmrPort));

  app.use(vite.middlewares);

  app.use('*', async (req: express.Request, res: express.Response) => {
    try {
      const url = req.originalUrl;

      const htmlFromFile = fs.readFileSync(resolve('./index.html'), 'utf-8');

      const data = { name: 'Data from server lucas' };

      const serializedData = JSON.stringify(data);

      const transformedHtml = await vite.transformIndexHtml(url, htmlFromFile);

      const renderMethodFromServerApp = (await vite.ssrLoadModule('/src/server/ServerApp.tsx')).render;

      const renderedToString = renderMethodFromServerApp(url, data);

      const finalHtml = transformedHtml
        .replace(`<!--app-html-->`, renderedToString)
        .replace('// preloaded-state', `window.__PRELOADED_STATE__ = ${serializedData}`);

      res.status(200).set({ 'Content-Type': 'text/html' }).end(finalHtml);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      console.log(e.stack);
      res.status(500).end(e.stack);
    }
  });

  return { app, vite };
}

try {
  const { app } = await createServer();
  app.listen(port, () => {
    console.log(`http://localhost:${port}`);
  });
} catch (e) {
  console.error('Error initializing server...', e);
}
