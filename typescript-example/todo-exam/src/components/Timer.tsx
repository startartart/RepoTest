import { useState } from 'react';

export default function Timer() {
  const [seconds, setSeconds] = useState<number>(0);

  const changeTimer = () => {
    setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
  };
  return (
    <div>
      <h2>타이머 : {seconds}초</h2>
      <button onClick={changeTimer}>시작</button>
    </div>
  );
}
