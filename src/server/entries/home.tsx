import renderSsr from '@/server/render';
import Home from '@/shared/views/Home';

export function render(url: string, props: { name: string }) {
  return renderSsr(Home, url, props, true);
}
