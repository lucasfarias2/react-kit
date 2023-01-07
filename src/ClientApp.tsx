/* eslint-disable @typescript-eslint/no-explicit-any */
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const props: any = window.__PRELOADED_STATE__;

console.log('propitas', props);

hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <BrowserRouter>
    <App {...props} />
  </BrowserRouter>
);

console.log('hydrated');
