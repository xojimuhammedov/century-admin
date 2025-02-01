import React from "react";
import LeftComponent from "./home-component/LeftComponent";
import RightComponent from "./home-component/RightComponent";
import Footer from "@/layout/footer/Footer";

const Content = () => {
  return (
    <>
      <div className="cashier-content-area mt-[30px] px-7">
        <h3 className="font-mono align-middle	 text-4xl mt-5">
            <a className="text-blue-700" href="https://centurysilkroadtravel.uz" target="_blank" rel="noopener noreferrer"></a> 
            Admin Paneliga xush kelibsiz!
          </h3>
        {/* <div className="grid grid-cols-12 gap-x-5">
          
          <div className="col-span-12 xxl:col-span-9 xl:col-span-8">
            <LeftComponent />
          </div> 
          <div className="col-span-12 xxl:col-span-3 xl:col-span-4">
            <div className="grid grid-cols-12 gap-x-5 maxSm:gap-x-0">
              <RightComponent />
            </div>
          </div> 
        </div> */}
      </div>
      
    </>
  );
};

export default Content;
