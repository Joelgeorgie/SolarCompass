import React, { useState } from "react";
import { sun1,sunexit1 } from "../../assets";

const statesUTs = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Dadra and Nagar Haveli",
  "Daman and Diu",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

const Bill = ({ onBillSubmit }) => {
  const [selectedStateUT, setSelectedStateUT] = useState("");
  const [billAmount, setBillAmount] = useState("");

  const handleChangeStateUT = (event) => {
    setSelectedStateUT(event.target.value);
  };

  const handleChangeBillAmount = (event) => {
    const amount = event.target.value;
    setBillAmount(amount);
  };

  const handleSliderChange = (event) => {
    const amount = event.target.value;
    setBillAmount(amount);
  };

  const handleButtonClick = () => {
    if (onBillSubmit) {
      onBillSubmit(selectedStateUT, billAmount);
    }
  };

  return (
    <div className="w-full h-full relative flex flex-col items-center justify-center pt-16 ">
      <div className="h-4/5 w-1/3 flex flex-col bg-gray-100  rounded-md">
        <div className="h-2/5 w-full flex flex-col items-center">
          <h1 className="text-center text-2xl font-mono w-full h pt-12 pb-5">
            Choose monthly bill Amount
          </h1>
          <select
            value={selectedStateUT}
            onChange={handleChangeStateUT}
            className="text-gray-700 bg-[#EBF9F5] border rounded-xl shadow-sm px-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2AD300] hover:bg-[#EBF9F5] w-1/2 h-7 text-center flex items-center justify-center"
          >
            <option value="" className="rounded-xl w-full">
              Select State/UT
            </option>
            {statesUTs.map((stateUT, index) => (
              <option key={index} value={stateUT} className="">
                {stateUT}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full h-2/5 px-10 flex flex-col items-center  justify-center">
          <div className="flex justify-between ">
            <div className="w-1/3">Monthly Bill</div>
            <div className="w-1/3 flex bg-[#EBF9F5]">
              <p>₹</p>
              <input
                type="number"
                value={billAmount}
                placeholder="2000"
                onChange={handleChangeBillAmount}
                className="w-full bg-[#EBF9F5] focus:outline-none text-right px-4"
              />
            </div>
          </div>
          <div className="PB-range-slider-div w-full ">
            <input
              type="range"
              min="0"
              max="50000"
              value={billAmount}
              onChange={handleSliderChange}
              className="PB-range-slider my-7"
              id="myRange"
            />
          </div>
        </div>
      </div>
      <div className="flex  justify-end items-end w-1/3 my-7">
      <button onClick={handleButtonClick}>Button</button>
      </div>

      <img src={sun1} alt="SunIcon" className="absolute right-5 top-[20%]"/>
      <img src={sunexit1} alt="SunIcon" className="absolute right-10 top-[40%]"/>
      
    </div>
  );
};

export default Bill;
