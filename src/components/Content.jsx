import React, { useState } from 'react';
import Tracker from './Tracker';
import Energy from './Steps/energy';
import Bill from './Steps/Bill';
import Expenditure from './Steps/Expenditure';

const Content = () => {
  const [billAmount, setBillAmount] = useState(0);
  
const handleBillSubmit = (selectedStateUT, billAmount) => {
    console.log(`Selected State/UT: ${selectedStateUT}, Bill Amount: ${billAmount}`);
    setBillAmount(billAmount);
  };

  return (
    <div className='w-full h-max my-2'>
      <Tracker />
      <Bill onBillSubmit={handleBillSubmit} />
      <Expenditure billAmount={billAmount} />
    </div>
  );
};

export default Content;

