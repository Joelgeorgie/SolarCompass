import React, { useState ,useEffect} from "react";
import { useNavigate ,Link} from "react-router-dom";

import { useFirebase } from '../context/Firebase';
import {
  sunsuscap,
  suntorch,
  loginquote1,
  loginquote2,
} from "../assets/images";

const Login = () => {
  // State variables for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const firebase = useFirebase();
  const navigate = useNavigate();

  useEffect(() =>{
    if(firebase.isLoggedIn){
        //navigate to dashboard
        navigate('/dashboard');
    }
  },[firebase,navigate])

  // Function to handle login
  const handleLogin = async () => {
    try {
      // Perform login logic here
      await firebase.loginUser(email, password);
      console.log("Login successful");
      // Navigate to dashboard after successful login
      


    } catch (error) {
      console.error("Login error:", error.message);
    }
  };

  return (
    <div className="h-[700px] w-full p-5 flex justify-center items-center relative">
      <div className="w-1/3 bg-[#2AD300] h-full rounded-xl flex flex-col px-14 z-20">
        <h1 className="text-white text-center h-1/4 font-medium text-3xl flex justify-center items-center">
          Welcome Back!
        </h1>
        <div id="fields" className="text-[#696B7C] flex flex-col h-[40%]">
          <div className="flex flex-col py-2">
            <h3 className="py-3">Email</h3>
            <input
              type="text"
              placeholder="Enter your email address"
              className="bg-[#FFFCC0] w-full h-10 pl-5 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col py-2">
            <h3 className="py-3">Password</h3>
            <input
              type="password"
              placeholder="Enter your password"
              className="bg-[#FFFCC0] w-full h-10 pl-5 rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <button className="w-full h-10 bg-[#1C8B00] text-white" onClick={handleLogin}>
          Login
        </button>
        
        <Link to="/signup" className="text-sm text-[#696B7C] w-1/8 mt-4">New User? Sign-up</Link>
      </div>
      <img src={loginquote1} alt="SunIcon" className="absolute left-[10%] top-[20%] h-28" />
      <img src={loginquote2} alt="SunIcon" className="absolute right-[15%] top-[40%] h-32" />
      <img src={sunsuscap} alt="SunIcon" className="absolute right-[26%] top-[13%] h-48 z-30" />
      <img src={suntorch} alt="SunIcon" className="absolute left-[15%] top-[40%] h-96" />
    </div>
  );
};

export default Login;
