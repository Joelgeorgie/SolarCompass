import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFirebase } from '../context/Firebase';
import { BrowserRouter as Router, Link } from "react-router-dom";
import {app} from "../firebase";
import CanvasJSReact from "@canvasjs/react-charts";
import axios from "axios";
import {
  dashboardicon,
  setting,
  growth,
  units,
  security,
  upload,
  download,
  temperature,
  humidity,
  cloud,
  wind,
  todayimg,
  week,
  calculator,
  calcloc,
} from "../assets/images";
import { electricityRates, uploadRates } from "../assets/data";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Dashboard = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();

  const [name, setName] = useState("Joel Georgie");
  const [latitude, setLatitude] = useState(9.9312328);
  const [longitude, setLongitude] = useState(76.2673041);
  const [state, setState] = useState("Goa");
  const [maxUnits, setMaxUnits] = useState(80);
  const [weatherData, setWeatherData] = useState(null);
  const [currentTime, setCurrentTime] = useState("");
  const [tempValue, setTempValue] = useState(32);
  const [cloudValue, setCloudValue] = useState(50);
  const [humidValue, setHumidValue] = useState(62);
  const [windValue, setWindValue] = useState(10);
  const [reductionFactors, setReductionFactors] = useState([0.5, 0.5, 0.5]);
  const [lastMaintain, setLastMaintain] = useState(new Date()); // Initialize with current date

  
  useEffect(() =>{
    if(!firebase.isLoggedIn){
        //navigate to dashboard
        navigate('/login');
    }
    
  },[firebase,navigate])

  useEffect(() =>{
    if(firebase.allDetails){
      console.log(firebase.allDetails);
    setName(firebase.allDetails.name);
    setLatitude(firebase.allDetails.latitude);
    setLongitude(firebase.allDetails.longitude);
    setState(firebase.allDetails.state);
    }
    
    
  },[firebase])

  const signOut = () =>{
    firebase.signOutUser();
  }

  const handleClick = () => {
    const userInput = window.prompt('Enter the date of last maintenance (Format: DD MMM YYYY):');
    if (userInput !== null) {
      const date = new Date(userInput);
      if (!isNaN(date.getTime())) {
        setLastMaintain(date);
      } else {
        alert('Invalid date format. Please enter the date in the format: DD MMM YYYY');
      }
    } else {
      alert('You cancelled the input.');
    }
  };

  // Function to calculate the next maintenance date
  const getNextMaintenanceDate = () => {
    const nextMaintenanceDate = new Date(lastMaintain.getTime());
    nextMaintenanceDate.setMonth(nextMaintenanceDate.getMonth() + 3);
    return nextMaintenanceDate;
  };

  useEffect(() => {
    // Calculate and format the next maintenance date whenever lastMaintain changes
    const nextMaintenanceDate = new Date(lastMaintain.getTime());
    nextMaintenanceDate.setMonth(nextMaintenanceDate.getMonth() + 3);
    const formattedNextMaintenanceDate = nextMaintenanceDate.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
    
    // Update UI or state with the formattedNextMaintenanceDate as needed
  }, [lastMaintain]);

  useEffect(() => {
    // Function to fetch real-time weather data
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/${latitude}/${longitude}`
        );
        const { current } = response.data.weatherData;
        setWeatherData(current);
        setTempValue(current.temp_c);
        setCloudValue(current.cloud);
        setHumidValue(current.humidity);
        setWindValue(current.wind_kph);
      } catch (error) {
        console.error("Error fetching weather data:", error.message);
      }
    };

    // Initial call to fetch weather data
    fetchWeatherData();

    // Update weather data every 5 minutes
    const weatherIntervalId = setInterval(fetchWeatherData, 300000); // 5 minutes in milliseconds

    // Clean up function to clear the interval when the component unmounts
    return () => clearInterval(weatherIntervalId);
  }, [latitude, longitude]);

  useEffect(() => {
    // Function to fetch forecast data and calculate reduction factors
    // Function to fetch forecast data and calculate reduction factors
    const fetchForecastData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/forecast/${latitude}/${longitude}`
        );
        const forecastData = response.data;

        // Convert the object into an array of objects
        const forecastArray = Object.keys(forecastData).map((date) => {
          const dayData = forecastData[date];
          return {
            date,
            ...dayData,
          };
        });

        // Extract reduction factors from forecast data
        const factors = forecastArray.map((day) => 1 - day.reductionFactor);

        // Set reduction factors state
        setReductionFactors(factors);
      } catch (error) {
        console.error("Error fetching forecast data:", error.message);
      }
    };

    // Initial call to fetch forecast data
    fetchForecastData();

    // Clean up function to clear the interval when the component unmounts
    return () => {};
  }, [latitude, longitude]);

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
    const timeIntervalId = setInterval(updateTime, 1000);

    // Clean up function to clear the interval when the component unmounts
    return () => clearInterval(timeIntervalId);
  }, []);

  // Sample data for predicted energy output for the next 3 days
  const today = new Date();
  const day1 = today.getDate();
  const day2 = today.getDate() + 1;
  const day3 = today.getDate() + 2;

  const dataPoints = [
    { x: day1, y: reductionFactors[0] * maxUnits }, // Tomorrow
    { x: day2, y: reductionFactors[1] * maxUnits }, // Day after tomorrow
    { x: day3, y: reductionFactors[2] * maxUnits }, // Day after the day after tomorrow
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
        fillColor: "#bcf2ae",
      },
    ],
  };

  return (
    <div className="h-[1000px] flex flex-row">
      <div id="left" className="w-1/5 flex flex-col justify-between">
        <div id="logo" className="h-24 justify-center items-center pt-8 mr-14">
          <h1 className="text-2xl text-center text-[#2AD300] font-semibold">
            SolarCompass
          </h1>
        </div>
        <div id="items" className="h-1/2 py-5 px-14 mr-14">
          
            <div className="flex flex-row text-[#00DEA3] my-5">
              <Link to="/dashboard" className="flex items-center">
                <img src={dashboardicon} alt="" className="p-1" /> Dashboard
              </Link>
            </div>
            <div className="flex flex-row my-5">
              <Link to="/calculator" className="flex items-center">
                <img src={calculator} alt="" className="p-1" /> Calculator
              </Link>
            </div>
            <div className="flex flex-row my-5" onClick={signOut}>
              <Link to="/login" className="flex items-center">
                <img src={setting} alt="" className="p-1" /> Sign Out
              </Link>
            </div>
          
        </div>
        <div
          id="banner"
          className="h-1/4 bg-[#2AD300] my-10 ml-5 mr-8 rounded-lg flex  flex-col items-center pt-5"
        >
          <img src={security} alt="" />
          <h1 className="text-white text-lg font-semibold">
            Keep yourself safe!
          </h1>
          <p className="text-sm text-center font-medium">
            Do not share your password with anyone.
          </p>
        </div>
      </div>
      <div id="right" className="w-4/5 bg-[#EBF9F5] px-28 py-10">
        <div id="overallmargin" className="h-full w-full">
          <div id="details" className="h-[10%] flex flex-row">
            <div id="nametime" className="w-[80%] h-full">
              <h1 className="mb-2 font-bold text-xl">Hello {name}</h1>
              <p className="text-sm text-gray-500">{currentTime}</p>
            </div>
            <div id="profile"></div>
          </div>
          <div
            id="weather"
            className="h-[20%] w-full flex flex-row justify-between"
          >
            {
              <React.Fragment>
                {/* Display weather data here */}
                <div className="w-[23%] h-full bg-white rounded-xl flex flex-row">
                  <div className="w-[50%] flex flex-col  items-start pl-5">
                    <img src={temperature} alt="" className="h-[23%] my-5" />
                    <h2 className="text-sm font-medium ">Temperature</h2>
                    <h1 className="font-semibold m-2 text-lg ">{tempValue}</h1>
                  </div>
                  <div className="w-[50%] flex justify-center items-center">
                    <img src={growth} alt="" />
                  </div>
                </div>
                <div className="w-[23%] h-full bg-white rounded-xl flex flex-row">
                  <div className="w-[50%] flex flex-col  items-start pl-5">
                    <img src={cloud} alt="" className="h-[23%] my-5" />
                    <h2 className="text-sm font-medium">Cloud Cover</h2>
                    <h1 className="font-semibold m-2 text-lg">{cloudValue}</h1>
                  </div>
                  <div className="w-[50%] flex justify-center items-center">
                    <img src={growth} alt="" />
                  </div>
                </div>
                <div className="w-[23%] h-full bg-white rounded-xl flex flex-row">
                  <div className="w-[50%] flex flex-col  items-start pl-5">
                    <img src={humidity} alt="" className="h-[23%] my-5" />
                    <h2 className="text-sm font-medium">Humidity</h2>
                    <h1 className="font-semibold m-2 text-lg">{humidValue}</h1>
                  </div>
                  <div className="w-[50%] flex justify-center items-center">
                    <img src={growth} alt="" />
                  </div>
                </div>
                <div className="w-[23%] h-full bg-white rounded-xl flex flex-row">
                  <div className="w-[50%] flex flex-col  items-start pl-5">
                    <img src={wind} alt="" className="h-[23%] my-5" />
                    <h2 className="text-sm font-medium">Wind Speed</h2>
                    <h1 className="font-semibold m-2 text-lg">{windValue}</h1>
                  </div>
                  <div className="w-[50%] flex justify-center items-center">
                    <img src={growth} alt="" />
                  </div>
                </div>
              </React.Fragment>
            }
          </div>
          <div
            id="nextlevel2"
            className="h-[55%] w-full py-5 flex flex-row justify-between"
          >
            <div id="chart" className="w-[75%] bg-white rounded-xl h-full">
              <h1 className="h-[15%] font-semibold text-xl pl-5 pt-3">
                Predicted Output for Next 2 Days
                <p
                  className={`text-xs ${
                    reductionFactors[2] - reductionFactors[0] < 0
                      ? "text-red-500"
                      : "text-[#2AD300]"
                  }`}
                >
                  {(
                    reductionFactors[2] * maxUnits -
                    reductionFactors[0] * maxUnits
                  ).toFixed(2)}
                  &nbsp;(
                  {(
                    ((reductionFactors[2] - reductionFactors[0]) /
                      reductionFactors[0]) *
                    100
                  ).toFixed(2)}
                  %)
                </p>
              </h1>

              <div
                id="chartcontrol"
                className="h-[60%] w-[90%] flex justify-center"
              >
                <CanvasJSChart options={options} />
              </div>
            </div>
            <div className="w-[23%] bg-white rounded-xl p-6">
              <h1 className="h-[15%]  font-semibold text-xl ">Units</h1>
              <div className="h-[30%] flex flex-col">
                <div className="flex">
                  <img src={todayimg} alt="" />
                  <h2 className="mx-3">Daily</h2>
                </div>
                <div className="pt-2 text-2xl text-[#2AD300] font-extrabold">
                  {(reductionFactors[0] * maxUnits).toFixed(2)}
                </div>
              </div>
              <div className="h-[30%] flex flex-col">
                <div className="flex">
                  <img src={week} alt="" />
                  <h2 className="mx-3">Weekly</h2>
                </div>
                <div className="pt-2 text-2xl text-[#2AD300] font-extrabold">
                  {(reductionFactors[0] * maxUnits * 7).toFixed(2)}
                </div>
              </div>
            </div>
          </div>
          <div id="level3" className="h-[15%] flex justify-between">
            <div className="bg-white w-[75%] rounded-xl h-full pt-4 px-5 flex flex-col">
              <h1 className=" font-semibold text-lg">Maintenance Schedule</h1>
              <div className="my-2 flex h-4 justify-between w-full">
                <div className=" w-[15%] flex items-start">
                  <img src={calcloc} alt="" className="h-5  items-start" />
                </div>
                <div className="text-sm   flex w-[85%]">
                  <p className="text-[#707EAE] w-[33%]">Last Done</p>
                  <p className="text-[#707EAE] w-[33%] text-center">
                  {lastMaintain.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </p>
                  <p className="text-[#2AD300] w-[33%] text-end">Completed</p>
                </div>
              </div>
              <div className="my-2 flex h-4 justify-between w-full">
                <div className=" w-[15%] flex items-start">
                  <img src={calcloc} alt="" className="h-5  items-start" />
                </div>
                <div className="text-sm   flex w-[85%]">
                  <p className="text-[#707EAE] w-[33%] ">Next One</p>
                  <p className="text-[#707EAE] w-[33%] text-center">
                  {getNextMaintenanceDate().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </p>
                  <p className="text-[#868CFF] w-[33%] text-end" onClick={handleClick}>Pending</p>
                </div>
              </div>
            </div>
            <div className="bg-white w-[23%] rounded-xl h-full px-8">
              <h1 className=" pb-2 font-semibold text-xl">Metering Rate</h1>
              <div className="bg-[#4E3EFD1A] h-[30%] mb-2 rounded-xl flex px-2">
                <img src={download} alt="" />
                <div className="flex flex-col px-4">
                  <h1 className="text-sm font-semibold">Pulled</h1>
                  <p className="text-xs ">₹{electricityRates[state]}</p>
                </div>
              </div>
              <div className="bg-[#00DEA333] h-[30%] rounded-xl flex px-2">
                <img src={upload} alt="" />
                <div className="flex flex-col px-4">
                  <h1 className="text-sm font-semibold">Pushed</h1>
                  <p className="text-xs ">₹{uploadRates[state]}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
