import getServerOptions from '@server/getServerOptions';
import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer as createViteServer } from 'vite';

const port = 3000;
const hmrPort = 3001;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const resolve = (p: string) => path.resolve(__dirname, p);

export async function createServer(root = process.cwd()) {
  const app = express();

  const vite = await createViteServer(getServerOptions(root, hmrPort));

  app.use(vite.middlewares);

  app.use('*', async (req: express.Request, res: express.Response) => {
    try {
      const url = req.originalUrl;

      const htmlFromFile = fs.readFileSync(resolve('./index.html'), 'utf-8');

      const data = { name: 'Data from server lucas' };

      const serializedData = JSON.stringify(data);

      const transformedHtml = await vite.transformIndexHtml(url, htmlFromFile);

      const server = await vite.ssrLoadModule('/src/server/ServerApp.tsx');

      const renderedToString: string = server.render(url, data);

      const finalHtml = transformedHtml
        .replace(`<!--app-html-->`, renderedToString)
        .replace('// preloaded-state', `window.__PRELOADED_STATE__ = ${serializedData}`);

      res.status(200).set({ 'Content-Type': 'text/html' }).end(finalHtml);
    } catch (e) {
      const error = e as Error;
      vite.ssrFixStacktrace(error);
      console.log(error.stack);
      res.status(500).end(error.stack);
    }
  });

  app.listen(port, () => {
    console.log(`http://localhost:${port}`);
  });
}

try {
  await createServer();
} catch (e) {
  console.error('Error starting server:', e);
}
