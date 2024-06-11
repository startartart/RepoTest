import { useState } from 'react';
import TodoList from './components/TodoList';
import Timer from './components/Timer';
import Clock from './components/Clock';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Clock />
      <TodoList />
      <Timer />
    </>
  );
}
