import type { NextFunction } from 'express';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const resolve = (p: string) => path.resolve(__dirname, p);
const isProd = process.env.NODE_ENV === 'production';

export default (req: IRequest, res: IResponse, next: NextFunction) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  res.renderView = async (compiledServerFile: string, props: any) => {
    try {
      const url = req.originalUrl;

      const htmlFromFile = fs.readFileSync(
        resolve(isProd ? '../../react/src/client/entries/home/home.html' : '../../../src/client/entries/home/home.html'),
        'utf-8'
      );

      let render, html;

      if (isProd) {
        html = htmlFromFile;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        render = (await import(compiledServerFile)).render;
      } else {
        html = await res.locals.vite.transformIndexHtml(url, htmlFromFile);
        render = (await res.locals.vite.ssrLoadModule('/src/server/entries/home.tsx')).render;
      }

      const serializedData = JSON.stringify(props);

      const renderedToString: string = render(url, props);

      const finalHtml = html
        .replace(`<!--app-html-->`, renderedToString)
        .replace('// preloaded-state', `window.__PRELOADED_STATE__ = ${serializedData}`);

      res.status(200).set({ 'Content-Type': 'text/html' }).end(finalHtml);
    } catch (e) {
      const error = e as Error;
      if (!isProd) {
        res.locals.vite.ssrFixStacktrace(error);
      }
      console.log(error.stack);
      res.status(500).end(error.stack);
    }
  };

  next();
};
