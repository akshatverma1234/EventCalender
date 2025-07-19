import React from "react";
import CalenderPage from "./Components/CalendarPage";

const App = () => {
  return (
    <>
      <div className="container w-full h-screen bg-[#2c3542] grid place-items-center perspective-[100rem]">
        <CalenderPage />
      </div>
    </>
  );
};

export default App;
