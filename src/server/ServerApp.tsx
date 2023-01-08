/* eslint-disable @typescript-eslint/no-explicit-any */
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from '../shared/App';

export function render(url: string, props: { name: string }) {
  return renderToString(
    <StaticRouter location={url}>
      <App {...props} />
    </StaticRouter>
  );
}
