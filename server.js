import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const port = 3000;
const hmrPort = 3001;

export async function createServer(root = process.cwd()) {
  const resolve = p => path.resolve(__dirname, p);

  const serverOptions = {
    root,
    logLevel: 'info',
    server: {
      middlewareMode: true,
      watch: {
        usePolling: true,
        interval: 100,
      },
      hmr: {
        port: hmrPort,
      },
    },
    appType: 'custom',
  };

  const app = express();

  const vite = await (await import('vite')).createServer(serverOptions);

  app.use(vite.middlewares);

  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl;

      const htmlFromFile = fs.readFileSync(resolve('./index.html'), 'utf-8');

      const data = { name: 'Data from server lucas' };

      const serializedData = JSON.stringify(data);

      const transformedHtml = await vite.transformIndexHtml(url, htmlFromFile);

      const renderMethodFromServerApp = (await vite.ssrLoadModule('/src/ServerApp.tsx')).render;

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

createServer().then(({ app }) =>
  app.listen(port, () => {
    console.log(`http://localhost:${port}`);
  })
);
