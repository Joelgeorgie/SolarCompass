import React, { useState, useEffect } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import { dashboardicon, setting, growth } from "../assets/images";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Dashboard = () => {
  const name = "Joel Varghese Georgie";
  const tempvalue = 35;
  const cloudvalue = 50;
  const humidvalue = 40;
  const windvalue = 6;
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    // Function to update the current time every second
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const amOrPm = hours >= 12 ? "pm" : "am";
      const formattedHours = hours % 12 || 12;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const month = monthNames[now.getMonth()];
      const day = now.getDate();
      const year = now.getFullYear();

      setCurrentTime(
        `${formattedHours}.${formattedMinutes} ${amOrPm} ${day} ${month} ${year}`
      );
    };

    // Initial call to update the time
    updateTime();

    // Update the time every second
    const intervalId = setInterval(updateTime, 1000);

    // Clean up function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  // Sample data for predicted energy output for the next 3 days
  const today = new Date();
const day1 = today.getDate() + 1;
const day2 = today.getDate() + 2;
const day3 = today.getDate() + 3;

const dataPoints = [
  { x: day1, y: 65 }, // Tomorrow
  { x: day2, y: 70 }, // Day after tomorrow
  { x: day3, y: 68 }, // Day after the day after tomorrow
];


const options = {
    animationEnabled: true,
    axisY: {
      title: "Units",
      gridThickness: 0, // Remove horizontal grid lines
    },
    axisX: {
      title: "Date",
      labelAngle: 0, // Rotate labels to fit better
      interval: 1, // Show every label
      labelFontSize: 14, // Adjust font size if needed
    },
    data: [
      {
        type: "spline",
        yValueFormatString: "#,##0 units",
        showInLegend: true,
        legendText: "Units",
        dataPoints: dataPoints,
        color: "#2AD300", 
        fillColor: "#bcf2ae"
      },
    ],
  };
  

  return (
    <div className="h-[1000px] flex flex-row">
      <div id="left" className="w-1/5 flex flex-col justify-between">
        <div
          id="logo"
          className="h-24   justify-center items-center pt-8 mr-14"
        >
          <h1 className="text-2xl text-center text-[#2AD300] font-semibold">
            SolarCompass
          </h1>
        </div>
        <div id="items" className=" h-1/2  py-5 px-14 mr-14">
          <div className="flex flex-row  text-[#00DEA3] my-5">
            <img src={dashboardicon} alt="" className="p-1" /> Dashboard
          </div>
          <div className="flex flex-row   my-5">
            <img src={setting} alt="" className="p-1" /> Settings
          </div>
          <div className="flex flex-row   my-5">
            <img src={setting} alt="" className="p-1" /> Settings
          </div>
          <div className="flex flex-row   my-5">
            <img src={setting} alt="" className="p-1" /> Settings
          </div>
          <div className="flex flex-row  my-5">
            <img src={setting} alt="" className="p-1" /> Settings
          </div>
        </div>
        <div
          id="banner"
          className=" h-1/4 bg-[#2AD300] my-10 ml-5 mr-8  rounded-lg"
        ></div>
      </div>
      <div id="right" className="w-4/5 bg-[#EBF9F5] px-28 py-10">
        <div id="overallmargin" className="  h-full w-full">
          <div id="details" className="h-[10%]  flex flex-row">
            <div id="nametime" className="w-[80%] h-full">
              <h1 className="mb-2  font-bold text-xl">Hello {name}</h1>
              <p className=" text-sm text-gray-500">{currentTime}</p>{" "}
              {/* Display current time here */}
            </div>
            <div id="profile"></div>
          </div>
          <div
            id="weather"
            className="h-[20%]   w-full flex flex-row justify-between"
          >
            <div className="w-[23%] h-full bg-white rounded-xl flex flex-row">
              <div className="w-[50%] flex flex-col justify-center pl-4">
                <h2 className=" text-sm  font-normal">Cloud Cover</h2>
                <h1 className="font-semibold m-2 text-lg">{cloudvalue}%</h1>
              </div>
              <div className="w-[50%] flex justify-center items-center">
                {" "}
                <img src={growth} alt="" />
              </div>
            </div>
            <div className="w-[23%] h-full bg-white rounded-xl flex flex-row">
              <div className="w-[50%] flex flex-col justify-center pl-4">
                <h2 className=" text-sm  font-normal">Temperature</h2>
                <h1 className="font-semibold m-2 text-lg">{tempvalue}</h1>
              </div>
              <div className="w-[50%] flex justify-center items-center">
                {" "}
                <img src={growth} alt="" />
              </div>
            </div>
            <div className="w-[23%] h-full bg-white rounded-xl flex flex-row">
              <div className="w-[50%] flex flex-col justify-center pl-4">
                <h2 className=" text-sm  font-normal">Humidity</h2>
                <h1 className="font-semibold m-2 text-lg">{humidvalue}</h1>
              </div>
              <div className="w-[50%] flex justify-center items-center">
                {" "}
                <img src={growth} alt="" />
              </div>
            </div>
            <div className="w-[23%] h-full bg-white rounded-xl flex flex-row">
              <div className="w-[50%] flex flex-col justify-center pl-4">
                <h2 className=" text-sm  font-normal">Wind Speed</h2>
                <h1 className="font-semibold m-2 text-lg">{windvalue}</h1>
              </div>
              <div className="w-[50%] flex justify-center items-center">
                {" "}
                <img src={growth} alt="" />
              </div>
            </div>
          </div>
          <div
            id="next3"
            className="h-[55%] w-full  py-5 flex flex-row justify-between"
          >
            <div id="chart" className="w-[75%] bg-white rounded-xl h-full">
              <h1 className="h-[15%] font-semibold text-xl pl-5 pt-3">Predicted Output for Next 3 Days</h1>
              <div id="chartcontrol" className="h-[60%] w-[90%] flex justify-center">

                <CanvasJSChart options={options}  />
              </div>
            </div>

            <div className=" w-[23%] bg-white rounded-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
