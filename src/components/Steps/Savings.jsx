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
  let yearlySolarExp = 5000;

  if (props) {
    monthly = props.billAmount;
    initialValue = monthly * 12; // Initial value for the current year, defaulting to 10000 if not provided
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
    const roundedExpenditure = line1expenditure.map((value) => Math.round(value / 10) * 10);
    setRoundedLine1Expenditure(roundedExpenditure);
  }, [monthly]);

  // Calculate Line 2 values
  const line2Data = [];
  for (let i = 0; i < years.length; i++) {
    const line2Value = i === 0 ? line2InitialValue : line2InitialValue + i * yearlySolarExp;
    line2Data.push(line2Value);
  }

  // Define tableData
  const tableData = years.map((year, index) => ({
    year: year,
    solarExpenditure: index === 0 ? line2InitialValue : yearlySolarExp,
    savings: roundedLine1Expenditure[index],
  }));

  // Filter tableData to include every 5th year starting from the current year
  const filteredTableData = tableData.filter((data, index) => {
    return (index ) % 5 === 0 && index >= currentYear - years[0] - 1;
  });

  const options = {
    animationEnabled: true,
    exportEnabled: false, // Disable download option
    theme: 'light2',
    credits: {
      enabled: false, // Disable watermark
    },
    axisY: {
      title: 'Total Expenditure',
    },
    axisX: {
      title: 'Year',
    },
    legend: {
      cursor: 'pointer',
      verticalAlign: 'top',
      horizontalAlign: 'center',
      dockInsidePlotArea: false,
    },
    data: [
      {
        type: 'line',
        name: 'Savings',
        showInLegend: true,
        color: '#2AD300', // Line 1 color
        toolTipContent: 'Year: {x}, Savings: {y}',
        dataPoints: years.map((year, index) => ({
          x: year,
          y: roundedLine1Expenditure[index],
        })),
      },
      {
        type: 'line',
        name: 'Total Solar Expenses',
        showInLegend: true,
        color: 'red',
        toolTipContent: 'Year: {x}, SolarExpense: {y}',
        dataPoints: years.map((year, index) => ({
          x: year,
          y: line2Data[index], // Line 2 data
        })),
      },
    ],
  };

  return (
    <div className='w-full flex flex-col relative '>
      <h1 className='flex w-full text-center justify-center items-center pt-14 pb-14 font-medium'>
        Yearly Expenditure spent on Electricity
      </h1>
      <div className='w-full h-[80%] flex justify-around'>
        <div className='w-[40%] h-full'>
          <CanvasJSChart options={options} />
        </div>
        <div className='w-[40%] flex flex-col'>
          <div className='h-1/2'></div>
          <div>
            <table className='w-full' style={{ borderCollapse: 'collapse', border: '2px solid #2AD300', borderRadius: '10px' }}>
              <thead>
                <tr>
                  <th style={{ border: '2px solid #2AD300', padding: '8px', textAlign: 'left' }}>Year</th>
                  <th style={{ border: '2px solid #2AD300', padding: '8px', textAlign: 'left' }}>Solar Infrastructure Expense (₹)</th>
                  <th style={{ border: '2px solid #2AD300', padding: '8px', textAlign: 'left' }}>Savings (₹)</th>
                </tr>
              </thead>
              <tbody>
                {filteredTableData.map((data) => (
                  <tr key={data.year}>
                    <td style={{ border: '2px solid #2AD300', padding: '8px', textAlign: 'left' }}>{data.year}</td>
                    <td style={{ border: '2px solid #2AD300', padding: '8px', textAlign: 'left' }}>{data.solarExpenditure ? data.solarExpenditure.toLocaleString('en-IN') : 'N/A'}</td>
                    <td style={{ border: '2px solid #2AD300', padding: '8px', textAlign: 'left' }}>{data.savings ? data.savings.toLocaleString('en-IN') : 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className='flex justify-center items-end w-full mt-14 mb-10'>
        <button onClick={props.onNextClick}>Next</button>
      </div>
      <img src={sun1} alt='SunIcon' className='absolute right-5 top-[20%]' />
    </div>
  );
};

export default Savings;
