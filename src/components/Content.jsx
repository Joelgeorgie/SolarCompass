import React from 'react'
import Tracker from './Tracker'
import Energy from './Steps/energy'
import Bill from './Steps/Bill'
const Content = () => {

  const handleBillSubmit = (selectedStateUT, billAmount) => {
    console.log(`Selected State/UT: ${selectedStateUT}, Bill Amount: ${billAmount}`);
  };

  return (

    <div className='w-full h-[700px] my-2'>
        <Tracker/>
        <Bill onBillSubmit={handleBillSubmit}/>
        {/* <Energy/>       */}
    </div>
    

  )
}

export default Content