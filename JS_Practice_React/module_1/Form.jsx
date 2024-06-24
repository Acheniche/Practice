import { useState } from "react";

const Form = () => {
  const [inputValue, setInputValue] = useState('');

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputValue);
  };
  
  return(
    <form onSubmit={handleSubmit}>
      <input value={inputValue} onChange={handleInput}></input>
      <button type="Submit">Submit</button>
    </form>
  )
}

export default Form