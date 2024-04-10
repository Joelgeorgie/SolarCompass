import React, { useState, useEffect } from "react";
import CanvasJSReact from '@canvasjs/react-charts';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Invest = (props) => {
  // State for bill amount, return rate, and years
  const [billAmount, setBillAmount] = useState(props.billAmount || 2000);
  const [returnRate, setReturnRate] = useState(12);
  const [years, setYears] = useState(20);
  const [investedAmount, setInvestedAmount] = useState(0);
  const [returns, setReturns] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);

  useEffect(() => {
    const calc = () => {
      const i = returnRate / 100 / 12; // Monthly interest rate
      const n = years * 12; // Total number of payments

      const maturityAmount = billAmount * (Math.pow(1 + i, n) - 1) / i * (1 + i);

      setFinalAmount(Math.round(maturityAmount));
      setInvestedAmount(billAmount * n);
      setReturns(Math.round(maturityAmount) - (billAmount * n));
    };

    calc();
  }, [billAmount, returnRate, years]);

  // Function to handle bill amount change
  const handleChangeBillAmount = (event) => {
    setBillAmount(Number(event.target.value));
  };

  // Function to handle expected rate of return change
  const handleReturnRate = (event) => {
    setReturnRate(Number(event.target.value));
  };

  // Function to handle time period (years) change
  const handleYears = (event) => {
    setYears(Number(event.target.value));
  };

  // Function to handle slider change for return rate
  const handleRateSliderChange = (event) => {
    setReturnRate(Number(event.target.value));
  };

  // Function to handle slider change for years
  const handleYearSliderChange = (event) => {
    setYears(Number(event.target.value));
  };

  // Format number to Indian numerical format with commas
  const formatNumber = (number) => {
    return number.toLocaleString("en-IN");
  };

  // Chart options
  const options = {
    animationEnabled: true,
    data: [{
      type: "doughnut",
      showInLegend: true,
      yValueFormatString: "#,###'%'",
      dataPoints: [
        { name: "Returns", y: ((finalAmount - investedAmount) / finalAmount) * 100, indexLabel: null, color: "#2AD300" },
        { name: "Invested", y: ((investedAmount) / finalAmount) * 100, indexLabel: null, color: "#6DA5C0" },
      ]
    }]
  };

  return (
    <div className="w-full h-full flex">
      <div className="w-1/4 h-full ">
        {/* Content for the left side */}
      </div>
      <div className="w-1/2 h-full">
        <h1 className="w-full flex items-center justify-center h-1/6 font-medium">
          Invest the money saved
        </h1>
        <div className="h-4/6 flex ">
          <div id="leftcalc" className="w-2/3 h-full">
            <div id="inputsavings" className="h-3/5 ">
              {/* First slider */}
              <div className="w-full h-1/3 flex px-20 flex-col items-center justify-center">
                <div className="flex justify-between">
                  <div>Monthly Bill</div>
                  <div className=" flex bg-[#EBF9F5] w-1/3">
                    <input
                      type="number"
                      value={billAmount}
                      placeholder="2000"
                      onChange={handleChangeBillAmount}
                      className="w-full bg-[#EBF9F5] focus:outline-none text-right px-4"
                    />
                    <p>Rs</p>
                  </div>
                </div>
                <div className="PB-range-slider-div w-full ">
                  <input
                    type="range"
                    min="0"
                    max="50000"
                    value={billAmount}
                    onChange={handleChangeBillAmount}
                    className="PB-range-slider my-7"
                    id="returnRateRange"
                  />
                </div>
              </div>
              {/* Second slider for expected rate of return */}
              <div className="w-full h-1/3 flex px-20 flex-col items-center justify-center">
                <div className="flex justify-between">
                  <div>Rate of return</div>
                  <div className=" flex bg-[#EBF9F5] w-1/3">
                    <input
                      type="number"
                      value={returnRate}
                      placeholder="12"
                      onChange={handleReturnRate}
                      className="w-full bg-[#EBF9F5] focus:outline-none text-right px-4"
                    />
                    <p>%</p>
                  </div>
                </div>
                <div className="PB-range-slider-div w-full ">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={returnRate}
                    onChange={handleRateSliderChange}
                    className="PB-range-slider my-7"
                    id="returnRateRange"
                  />
                </div>
              </div>
              {/* Third slider for time period */}
              <div className="w-full h-1/3 flex px-20 flex-col items-center justify-center">
                <div className="flex justify-between">
                  <div>Time period</div>
                  <div className="w-1/3 flex bg-[#EBF9F5]">
                    <input
                      type="number"
                      value={years}
                      placeholder="20"
                      onChange={handleYears}
                      className="w-full bg-[#EBF9F5] focus:outline-none text-right px-4"
                    />
                    <p>yrs</p>
                  </div>
                </div>
                <div className="PB-range-slider-div w-full ">
                  <input
                    type="range"
                    min="0"
                    max="50"
                    value={years}
                    onChange={handleYearSliderChange}
                    className="PB-range-slider my-7"
                    id="yearsRange"
                  />
                </div>
              </div>
            </div>
            <div className="w-full h-2/5 px-20 pb-20 pt-14 flex flex-col font-semibold">
              <div className="flex justify-between py-2">
                <p>Invested Amount</p>
                <p>₹ {formatNumber(investedAmount)}</p>
              </div>
              <div className="flex justify-between py-2">
                <p>Estimated Returns</p>
                <p>₹ {formatNumber(returns)}</p>
              </div>
              <div className="flex justify-between py-2">
                <p>Total Amount</p>
                <p>₹ {formatNumber(finalAmount)}</p>
              </div>
            </div>
          </div>
          {/* Render Chart Here */}
          <div id="chart" className="w-1/3 h-full ">
            <div className="h-2/3"><CanvasJSChart options={options} /></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invest;
