import { render } from '@testing-library/react';
import { expect, test } from 'vitest';
import TestComponent from './TestComponent';

test('Renders component OK', async () => {
  const test = render(<TestComponent />);

  const testComponent = await test.findByTestId('testComponent');
  expect(testComponent).toBeDefined();
  expect(testComponent.textContent).toContain('Test Component Text');
  expect(test.asFragment()).toMatchSnapshot();
  test.unmount();
});

test('Renders component OK with snapshot', async () => {
  const test = render(<TestComponent />);
  expect(test.asFragment()).toMatchSnapshot();
  test.unmount();
});

test('Renders component OK with snapshot inline', async () => {
  const test = render(<TestComponent />);
  expect(test.asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      <div
        data-testid="testComponent"
      >
        Test Component Text
      </div>
    </DocumentFragment>
  `);
  test.unmount();
});
