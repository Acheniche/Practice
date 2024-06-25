import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
      setCount(prevCount => prevCount + 1);
  };

  const buttonStyle = {
    backgroundColor: count > 10 ? 'red' : 'green',
  }

  return (
    <div>
      <h1>Count: {count}</h1>
      <button style={buttonStyle} onClick={handleIncrement}>Increment</button>
    </div>
  )
}

export default Counter