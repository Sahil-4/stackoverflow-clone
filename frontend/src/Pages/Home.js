import React from "react";
import Sidebar from "../Components/Sidebar";
import Rightsidebar from "../Components/Rightsidebar";

const Home = () => {
  return (
    <div className="main">
      <Sidebar />
      <div className="home">
        <div className="questions"></div>
        <Rightsidebar />
      </div>
    </div>
  );
};

export default Home;
