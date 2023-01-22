import { render } from '@testing-library/react';
import { expect, test } from 'vitest';
import Home from './Home';

test('Renders view OK', async () => {
  const props = {
    name: 'Lucas',
    device: {
      type: 'desktop' as TDeviceType,
    },
  };
  const home = render(<Home {...props} />);

  const testComponent = await home.findByTestId('homeView');
  expect(testComponent).toBeDefined();
  expect(testComponent.textContent).toContain('Test Component Text');
  home.unmount();
});
