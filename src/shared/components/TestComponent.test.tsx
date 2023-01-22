import { render } from '@testing-library/react';
import { expect, test } from 'vitest';
import TestComponent from './TestComponent';

test('Renders component OK', async () => {
  const test = render(<TestComponent />);

  const testComponent = await test.findByTestId('testComponent');
  expect(testComponent).toBeDefined();
  expect(testComponent.textContent).toContain('Test Component Text');
  test.unmount();
});
