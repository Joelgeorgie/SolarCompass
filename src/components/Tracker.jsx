import * as React from "react";

function Tracker() {
  return (
    <div className="flex gap-2 text-xl  text-gray-500 max-md:flex-wrap h-5 justify-between">
      <div className="justify-center items-center px-16 py-6 bg-slate-50 max-md:px-5">
        Current Usage
      </div>
      <div className="justify-center px-20 py-6 bg-slate-50 max-md:px-8 max-md:max-w-full">
        Energy Independence
      </div>
      <div className="justify-center items-center px-16 py-6 whitespace-nowrap bg-slate-50 max-md:px-5">
        Expendirure
      </div>
      <div className="justify-center items-center px-16 py-6 whitespace-nowrap bg-slate-50 max-md:px-5">
        Savings
      </div>
      <div className="justify-center py-6 pr-20 pl-20 text-white bg-lime-600 max-md:px-8 max-md:max-w-full">
        {" "}
        Financial Independence
      </div>
    </div>
  );
}

export default Tracker;