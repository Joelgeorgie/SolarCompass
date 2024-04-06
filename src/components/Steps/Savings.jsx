import React, { useEffect, useState } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import { sun1 } from '../../assets/images';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Savings = (props) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 24 }, (_, i) => currentYear + i); // Generate an array of 24 years

  // Initialize monthly and initialValue to 0
  let monthly = 0;
  let initialValue = 0;
  let line2InitialValue = 0; // Initial value for Line 2

  if (props) {
    monthly = props.billAmount;
    initialValue = monthly*12; // Initial value for the current year, defaulting to 10000 if not provided
    line2InitialValue = props.initialInvestment; // Initial value for Line 2 provided by props
  }

  const incrementPercentage = 4; // Increment percentage

  // Create line1expenditure array
  const [roundedLine1Expenditure, setRoundedLine1Expenditure] = useState([]);

  useEffect(() => {
    const line1expenditure = [];
    let yearTotal = initialValue;
    for (let i = 0; i < years.length; i++) {
      if (i === 0) {
        line1expenditure.push(initialValue);
      } else {
        const prevYearExpenditure = line1expenditure[i - 1];
        yearTotal = yearTotal * (1 + incrementPercentage / 100);
        const newExpenditure = prevYearExpenditure + yearTotal;
        line1expenditure.push(newExpenditure);
      }
    }
    const roundedExpenditure = line1expenditure.map(value => Math.round(value / 10) * 10);
    setRoundedLine1Expenditure(roundedExpenditure);
  }, [monthly]);

  // Calculate Line 2 values
  const line2Data = [];
  for (let i = 0; i < years.length; i++) {
    const line2Value = line2InitialValue + (i * 5000);
    line2Data.push(line2Value);
  }

  const options = {
    animationEnabled: true,
    exportEnabled: false, // Disable download option
    theme: "light2",
    credits: {
      enabled: false // Disable watermark
    },
    axisY: {
      title: "Total Expenditure"
    },
    axisX: {
      title: "Year",
    },
    legend: {
      cursor: "pointer",
      verticalAlign: "top",
      horizontalAlign: "center",
      dockInsidePlotArea: false,
    },
    data: [
      {
        type: "line",
        name: "Total Normal Expense",
        showInLegend: true,
        color: "red", // Line 1 color
        toolTipContent: "Year: {x}, NormalExpense: {y}",
        dataPoints: years.map((year, index) => ({
          x: year,
          y: roundedLine1Expenditure[index]
        }))
      },
      {
        type: "line",
        name: "Total Solar Expense",
        showInLegend: true,
        toolTipContent: "Year: {x}, SolarExpense: {y}",
        dataPoints: years.map((year, index) => ({
          x: year,
          y: line2Data[index] // Line 2 data
        }))
      }
    ]
  };

  return (
    <div className='w-full flex flex-col relative '>
      <h1 className='flex w-full text-center justify-center items-center pt-14 pb-14 font-medium'>Yearly Expenditure spent on Electricity</h1>
      <div className='w-full h-[80%] flex justify-around'>
        <div className='w-[40%] h-full'>
          <CanvasJSChart options={options} />
        </div>
        <div className='w-[40%] flex flex-col'>
          <div className='h-[50%]'>

          </div>
        </div>
      </div>
      <div className="flex justify-center items-end w-full mt-14 mb-10">
        <button onClick={props.onNextClick}>Next</button>
      </div>
      <img src={sun1} alt="SunIcon" className="absolute right-5 top-[20%]"/>
    </div>
  );
};

export default Savings;
