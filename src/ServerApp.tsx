/* eslint-disable @typescript-eslint/no-explicit-any */
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';

export function render(url: string, props: any, a: any) {
  console.log('url', url);
  console.log('a', a);
  console.log('props', props);
  return renderToString(
    <StaticRouter location={url}>
      <App {...props} />
    </StaticRouter>
  );
}
