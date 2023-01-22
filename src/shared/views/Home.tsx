import { useState } from 'react';
import TestComponent from '@/shared/components/TestComponent';

const App = ({ name, device }: { name: string; device: IDevice }) => {
  const [count, add] = useState(0);

  return (
    <div className="p-8" data-testid="homeView">
      <h1 className="text-4xl mb-4 font-bold">react-vite-ssr</h1>
      <p className="mb-4">
        Data: <span className="p-2 bg-white shadow rounded-lg">{name}</span>
      </p>
      <p>
        Device: <span className="p-2 bg-white shadow rounded-lg">{device.type}</span>
      </p>
      <p className="my-4">
        Count:
        <span className="p-2 bg-white shadow rounded-lg ml-2 text-lg font-semibold">{count}</span>
        <button
          className="p-2 bg-blue-500 text-white rounded-lg shadow ml-2"
          onClick={() => {
            add(count + 1);
          }}
        >
          Increase counter
        </button>
      </p>

      <div className="mt-4">
        <TestComponent />
      </div>
    </div>
  );
};

export default App;
