import { useState } from 'react';

const App = () => {
  const [count, add] = useState(0);

  return (
    <div className="p-8">
      <p className="p-4 bg-white border rounded-lg shadow-lg mb-4">{count}</p>

      <button
        className="p-4 bg-blue-500 text-white rounded-lg shadow"
        onClick={() => {
          add(count + 1);
        }}
      >
        Add count hehe plz
      </button>
    </div>
  );
};

export default App;
