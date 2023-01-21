import renderComponent from '@/server/renderComponent';
import Home from '@/shared/views/Home';

export function render(url: string, props: { name: string }) {
  return renderComponent(Home, url, props, true);
}
