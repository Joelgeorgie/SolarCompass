import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-[#2AD300] text-white p-4 h-20">
        <div className='h-8 mt-5 '>
      <div className="container mx-auto flex justify-between align-center">
        <div className="pl-8 text-xl font-bold">SolarCompass</div> 
        <div className="flex  w-5/12 justify-between mr-4">  
          <a href="#" className="hover:text-gray-300">Merchandise</a>
          <a href="#" className="hover:text-gray-300">Meet our Team</a>
          <div className="flex space-x-4 ">
            <a href="#" className="hover:text-gray-300">Log In</a>
            {/* <a href="#" className="hover:text-gray-300">Sign Up</a> */}
          </div>
        </div>
      </div>
      </div>
    </nav>
  );
};

export default Navbar;
