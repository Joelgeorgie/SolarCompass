import React, { useState, useEffect } from "react";
import { useNavigate ,Link} from "react-router-dom";
import { useFirebase } from '../context/Firebase';
import {
  sunsuscap,
  suntorch,
  loginquote1,
  loginquote2,
} from "../assets/images";

const Signup = () => {
  // State variables for email, password, bill, state, latitude, and longitude
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bill, setBill] = useState("");
  const [state, setState] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const firebase = useFirebase();
  const navigate = useNavigate();

  useEffect(() => {
    if (firebase.isLoggedIn) {
      //navigate to dashboard
      navigate("/dashboard");
    }
  }, [firebase, navigate]);

  // Function to handle signup
  const handleSignup = async (e) => {
    // Perform signup logic here, e.g., send a request to create a new user
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Bill:", bill);
    console.log("State:", state);
    console.log("Latitude:", latitude);
    console.log("Longitude:", longitude);
    await firebase.signupUser(email, password);
    
    await firebase.enterUserDetails(email,name,state,bill,latitude,longitude);
  };

  // Function to get the user's current location
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    getLocation();
  }, []); // Run only once on component mount

  return (
    <div className="h-[700px] w-full p-5 flex justify-center items-center relative">
      <div className="w-1/3 bg-[#2AD300] h-full rounded-xl flex flex-col px-14 z-20">
        <h1 className="text-white text-center h-1/6 font-medium text-3xl flex justify-center items-center">
          Sign Up
        </h1>
        <div id="fields" className="text-[#696B7C] flex flex-col h-[70%] ">
          <div className="flex flex-col pt-2">
            <h3 className="py-2">Name</h3>
            <input
              type="text"
              placeholder="Enter your name"
              className="bg-[#FFFCC0] w-full h-10 px-5 rounded-md"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col pt-2">
            <h3 className="py-2">Email</h3>
            <input
              type="text"
              placeholder="Enter your email address"
              className="bg-[#FFFCC0] w-full h-10 px-5 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col pt-2">
            <h3 className="py-2">Password</h3>
            <input
              type="password"
              placeholder="Enter your password"
              className="bg-[#FFFCC0] w-full h-10 px-5 rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col pt-2">
            <h3 className="py-2">Bill</h3>
            <input
              type="number"
              placeholder="Enter your bill amount"
              className="bg-[#FFFCC0] w-full h-10 px-5 rounded-md"
              value={bill}
              onChange={(e) => setBill(e.target.value)}
            />
          </div>
          <div className="flex flex-col pt-2">
            <h3 className="py-2">State</h3>
            <input
              type="text"
              placeholder="Enter your state"
              className="bg-[#FFFCC0] w-full h-10 px-5 rounded-md"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>
        </div>
        <button className="w-full h-10 bg-[#1C8B00] text-white" onClick={handleSignup}>
          Signup
        </button>
        <Link to="/login" className="text-sm text-[#696B7C] w-1/8 mt-4">Existing User? Login</Link>
      </div>
      <img src={loginquote1} alt="SunIcon" className="absolute left-[10%] top-[20%] h-28" />
      <img src={loginquote2} alt="SunIcon" className="absolute right-[15%] top-[40%] h-32" />
      <img src={sunsuscap} alt="SunIcon" className="absolute right-[26%] top-[13%] h-48 z-30" />
      <img src={suntorch} alt="SunIcon" className="absolute left-[15%] top-[40%] h-96" />
    </div>
  );
};

export default Signup;
