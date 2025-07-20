import React from "react";
import CalenderPage from "./Components/CalendarPage";

const App = () => {
  return (
    <>
      <div className="container w-full min-h-screen bg-[#2c3542] grid place-items-center overflow-hidden">
        <CalenderPage />
      </div>
    </>
  );
};

export default App;
