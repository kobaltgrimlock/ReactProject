import { useState } from 'react';

function Counter() {
    const [count, setCount] = useState(0);

    const handlerPlus = () => {
        setCount(prevCount => prevCount + 1); // Increment the count
        console.log(count);
    }

const handlerMinus = () => {
  setCount(prevCount => (prevCount > 0 ? prevCount - 1 : 0)); // Decrease the count
  console.log(count);

};


  const handlerReset = () => {
    setCount(0) // decrease the count
  
 

}


    return (
      <>
        <button onClick={handlerMinus}>-</button> {/* Decrement button */}
        <span>{count}</span> {/* Display the current count */}
        <button onClick={handlerPlus}>+</button> {/* Increment button */}<br/>
        <button onClick={handlerReset}>Reset</button> {/* Increment button */}

      </>
    );
}
export default Counter;




