import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import Philips from "./Philips"
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Philips/>
    </div>
  );
};


export default App;
