/* eslint-disable @typescript-eslint/no-explicit-any */
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

declare const window: IWindow;

const props = window.__PRELOADED_STATE__;

hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <BrowserRouter>
    <App {...props} />
  </BrowserRouter>
);

console.log('hydrated');
