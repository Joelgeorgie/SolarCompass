import * as React from "react";

function Navbar() {
  return (
    <div className="pt-3 px-16 h-20 pb-9 text-white bg-[#2AD300]">
      <div className="h-[50%] mt-3 flex gap-5 justify-between">
        <div className="text-3xl font-medium tracking-tighter leading-9 max-md:text-4xl">
          <a href="/" className="hover:underline">SolarCompass</a>
        </div>
        <div className="flex gap-x-28 justify-between mt-1.5 text-base max-md:flex-wrap max-md:max-w-full">
          <a href="/merchandise" className="hover:underline">Merchendise</a>
          <a href="/team" className="hover:underline">Meet our team</a>
          <a href="/login" className="hover:underline">Log In</a>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
