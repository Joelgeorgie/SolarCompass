import React, { useState } from 'react';
import Tracker from './Tracker';
import Energy from './Steps/energy';
import Bill from './Steps/Bill';
import Expenditure from './Steps/Expenditure';
import Savings from './Steps/Savings';
import Invest from './Steps/Invest';
import { electricityRates } from '../assets/data';

const Content = () => {
  const [billAmount, setBillAmount] = useState(0);
  const [units, setUnits] = useState(0);
  const [investment, setInvestment] = useState(90000)
  const [currentStep, setCurrentStep] = useState(0);

  const handleBillSubmit = (selectedStateUT, billAmount) => {
    console.log(`Selected State/UT: ${selectedStateUT}, Bill Amount: ${billAmount}`);
    setBillAmount(billAmount);
    setUnits(Math.ceil(billAmount / electricityRates[selectedStateUT]))
    handleNextClick();
  };

  const handleNextClick = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(0); 
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <Bill onBillSubmit={handleBillSubmit}  />;
      case 1:
        return <Energy units={units} onNextClick={handleNextClick} initialInvestment={investment}/>;
      case 2:
        return <Expenditure billAmount={billAmount} onNextClick={handleNextClick} />;
      case 3:
        return <Savings billAmount={billAmount} onNextClick={handleNextClick} initialInvestment={investment} />;
      case 4:
        return <Invest onNextClick={handleNextClick} />;
      default:
        return null;
    }
  };

  return (
    <div className='w-full h-[700px] my-2'>
      <Tracker currentStep={currentStep} />
      {renderStep()}
    </div>
  );
};

export default Content;
