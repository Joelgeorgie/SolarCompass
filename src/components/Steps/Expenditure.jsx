import React, { useEffect, useState } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import { sun1 } from "../../assets";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Expenditure = (currentYearlyBill ) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 24 }, (_, i) => currentYear + i); // Generate an array of 24 years
  
  const monthly=(currentYearlyBill.billAmount)
  const initialValue = (monthly*12); // Initial value for the current year, defaulting to 10000 if not provided
  const incrementPercentage = 4; // Increment percentage

  // Create line1expenditure array
  const [roundedLine1Expenditure, setRoundedLine1Expenditure] = useState([]);

  useEffect(() => {
    const line1expenditure = [];
    for (let i = 0; i < years.length; i++) {
      if (i === 0) {
        line1expenditure.push(initialValue);
      } else {
        const prevYearExpenditure = line1expenditure[i - 1];
        const newExpenditure = prevYearExpenditure * (1 + incrementPercentage / 100);
        line1expenditure.push(newExpenditure);
      }
    }
    const roundedExpenditure = line1expenditure.map(value => Math.round(value / 10) * 10);
    setRoundedLine1Expenditure(roundedExpenditure);
  }, [currentYearlyBill]); // Empty dependency array to run only once on mount

  const line2ConstantValue = 5000; // Constant value for Line 2

  const options = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light2",
    axisY: {
      title: "Expenditure"
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
        name: "Normal Bill",
        showInLegend: true,
        toolTipContent: "Year: {x}, Normal Bill: {y}",
        dataPoints: years.map((year, index) => ({
          x: year,
          y: roundedLine1Expenditure[index]
        }))
      },
      {
        type: "line",
        name: "Maintenance",
        showInLegend: true,
        toolTipContent: "Year: {x}, Maintenance: {y}",
        dataPoints: years.map((year, index) => ({
          x: year,
          y: line2ConstantValue // Constant value for Line 2
        }))
      }
    ]
  };

  // Create data for the table
  const tableData = years.filter(year => year % 5 === 0).map(year => ({
    year,
    solarExpenditure: line2ConstantValue,
    normalExpenditure: roundedLine1Expenditure[years.indexOf(year)]
  }));

  return (
    <div className='w-full flex flex-col relative '>
      <h1 className='flex w-full text-center justify-center items-center pt-14 pb-14 font-medium'>Cummulative money spent on Electricity</h1>
      <div className='w-full h-[80%] flex justify-around'>
        <div className='w-[40%] h-full'>
          <CanvasJSChart options={options} />
        </div>
        <div className='w-[40%] flex flex-col'>
            <div className='h-[50%]'>

            </div>
          <table className='w-[40%]' style={{ borderCollapse: 'collapse', border: '2px solid #2AD300', borderRadius: '10px', width: '100%', borderRadius: '10px' }}>
            <thead>
              <tr>
                <th style={{ border: '2px solid #2AD300', padding: '8px', textAlign: 'left' }}>Year</th>
                <th style={{ border: '2px solid #2AD300', padding: '8px', textAlign: 'left' }}>Solar Panel Maintenance</th>
                <th style={{ border: '2px solid #2AD300', padding: '8px', textAlign: 'left' }}>Normal Bill</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map(data => (
                <tr key={data.year}>
                  <td style={{ border: '2px solid #2AD300', padding: '8px', textAlign: 'left' }}>{data.year}</td>
                  <td style={{ border: '2px solid #2AD300', padding: '8px', textAlign: 'left' }}>{data.solarExpenditure}</td>
                  <td style={{ border: '2px solid #2AD300', padding: '8px', textAlign: 'left' }}>{data.normalExpenditure}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <img src={sun1} alt="SunIcon" className="absolute right-5 top-[20%]"/>
    </div>
  );
};

export default Expenditure;
