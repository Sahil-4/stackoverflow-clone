import React from "react";
import Sidebar from "../Components/Sidebar";
import Rightsidebar from "../Components/Rightsidebar";
import Questions from "../Components/Questions";

const Home = () => {
  return (
    <div className="main">
      <Sidebar />
      <div className="home">
        <Questions />
        <Rightsidebar />
      </div>
    </div>
  );
};

export default Home;
