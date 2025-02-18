"use client"
import { useState } from "react";
import ReactConfetti from "react-confetti";

export default function Home() {
  const [counter, setCounter] = useState(0);
  const [confettiButton, setConfettiButton] = useState(false);


  const handleCounter = (action) => {
    setConfettiButton(true);
    //setTimeout(() => setConfettiButton(false), 3000);

    if (action === "increase") {
      setCounter(counter + 1);
    } else if (action === "decrease") {
      if (counter > 0) {
        setCounter(counter - 1);
      }
    } else if (action === "reset") {
      setCounter(0);
    } else {
      alert(`Your current counter is ${counter}`);
    }
  };

  return (
    <div className="bg-primary h-screen grid font-[family-name:var(--font-geist-sans)] overflow-y-hidden">
      <div className="px-[15em] py-[2em]">
        <div className="w-full backdrop-blur-xl flex justify-between border-[1px] border-white p-4 rounded-lg items-center">
          <h3 className="text-white text-2xl font-bold">CounterApp</h3>
          <button className="bg-white px-4 py-3 rounded-md">
            Connect Wallet
          </button>
        </div>
        <div className="min-w-2xl flex justify-center items-center">
          <div className="flex flex-col gap-5 backdrop-blur-xl border-[1px] border-white rounded-lg mt-[10em] p-[2em] justify-center items-center">
          {confettiButton && <ReactConfetti width={600} height={500} run={false} />}
            <h4 className="text-white text-2xl">Current count is:</h4>
            <h1 className="text-white text-[5em]">{counter}</h1>
            <div className="flex gap-5">
              <button
                className="bg-white px-4 py-3 rounded-md relative"
                onClick={() => handleCounter("increase")}
              >
                 
                
                Increase count
              </button>
              <button
                className="bg-white px-4 py-3 rounded-md relative"
                onClick={() => handleCounter("decrease")}
              >
                Decrease count
              </button>
              <button
                className="bg-white px-4 py-3 rounded-md relative"
                onClick={() => handleCounter("reset")}
              >
                Reset count
              </button>
              <button
                className="bg-white px-4 py-3 rounded-md relative"
                onClick={() => handleCounter("get")}
              >
                Get count
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
