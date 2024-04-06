import React from "react";

const Energy = ({ units, onNextClick ,initialInvestment }) => {
  return (
    <div className="h-full w-full flex flex-col items-center relative">
      <h1 className="flex w-full text-center justify-center items-center pt-14 pb-14 font-medium">
        Different types of solar infrastructure
      </h1>
      <div className="h-3/5 w-3/5 flex justify-evenly items-start ">
        <div className="h-4/5 w-[30%] rounded-md flex flex-col justify-center items-center bg-[#EBF9F5]">
          <div className="w-full h-1/2 flex flex-col">
            <h2 className="flex pt-9 pb-5 justify-center text-base">Off-Grid Solar Systems</h2>
            <p className="flex justify-center text-xs">Completely independent with Battery</p>
          </div>
          <div className="h-1/2 w-full p-9 font-semibold">
            <div className="flex justify-between text-sm py-1"><p className="className">Units</p> <p>{units}</p></div>
            <div className="flex justify-between text-sm py-1"> <p className="className">Grid Independence</p><p>100%</p></div>
            <div className="flex justify-between text-sm py-1"> <p className="className">Initial investment</p><p>₹{initialInvestment+150000}</p></div>
          </div>
        </div>
        <div className="h-4/5 w-[30%] rounded-md flex flex-col justify-center items-center bg-[#2AD300] text-white">
          <div className="w-full h-1/2 flex flex-col">
            <h2 className="flex pt-9 pb-5 justify-center text-base">Grid-Tied Solar Systems</h2>
            <p className="flex justify-center text-xs">Connected to the utility grid</p>
          </div>
          <div className="h-1/2 w-full p-9 font-semibold">
            <div className="flex justify-between text-sm py-1"><p className="className">Units</p> <p>{units}</p></div>
            <div className="flex justify-between text-sm py-1"> <p className="className">Grid Independence</p><p>60%</p></div>
            <div className="flex justify-between text-sm py-1"> <p className="className">Initial investment</p><p>₹{initialInvestment}</p></div>
          </div>
        </div>
        <div className="h-4/5 w-[30%] rounded-md flex flex-col justify-center items-center bg-[#EBF9F5]">
          <div className="w-full h-1/2 flex flex-col">
            <h2 className="flex pt-9 pb-5 justify-center text-base">Hybrid Solar Systems</h2>
            <p className="flex justify-center text-xs">Best of both worlds</p>
          </div>
          <div className="h-1/2 w-full p-9 font-semibold">
            <div className="flex justify-between text-sm py-1"><p className="className">Units</p> <p>{units}</p></div>
            <div className="flex justify-between text-sm py-1"> <p className="className">Grid Independence</p><p>90%</p></div>
            <div className="flex justify-between text-sm py-1"> <p className="className">Initial investment</p><p>₹{initialInvestment +200000}</p></div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-end w-1/3 mb-7">
        <button onClick={onNextClick}>Next</button>
      </div>
    </div>
  );
};

export default Energy;
