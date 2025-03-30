import { useState } from 'react';

function App() {
  const [todos, setTodos] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const handleAdd = () => {
    if (input.trim()) {
      setTodos([...todos, input.trim()]);
      setInput('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-md">
        <h1 className="text-2xl bg-cyan-200 text-gray-800 mb-4">
          📋 나의 투두리스트
        </h1>

        {/* 입력창 */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="할 일을 입력하세요"
            className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            추가
          </button>
        </div>

        {/* 투두 리스트 */}
        <ul className="space-y-2">
          {todos.length === 0 && (
            <li className="text-gray-400 italic">할 일이 없습니다</li>
          )}
          {todos.map((todo, idx) => (
            <li
              key={idx}
              className="bg-gray-100 px-4 py-2 rounded-md shadow-sm text-gray-800"
            >
              {todo}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
