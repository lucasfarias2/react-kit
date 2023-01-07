import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';

export function render(url: string, props: { name: string }) {
  return renderToString(
    <StaticRouter location={url}>
      <App name={props.name} />
    </StaticRouter>
  );
}
