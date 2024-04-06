import React, { useEffect, useState } from "react";

function Tracker( activeIndex) {
  const steps = [
    "Current Usage",
    "Energy Independence",
    "Expenditure",
    "Savings",
    "Financial Independence",
  ];
  const [activeStep, setActiveStep] = useState(activeIndex.currentStep);

  useEffect(() => {
    setActiveStep(activeIndex.currentStep);
  }, [activeIndex]);

  return (
    <div className="flex flex-row text-xl text-gray-500 max-md:flex-wrap h-10 justify-between bg-gray-100">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`flex justify-center items-center w-1/5 h-full ${
            activeStep >= index ? "bg-[#2AD300]" : ""
          }`}
        >
          {step}
        </div>
      ))}
    </div>
  );
}

export default Tracker;
