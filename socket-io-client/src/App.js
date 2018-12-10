import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import Philips from "./Philips";
import LocalDevices from "./LocalDevices";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Philips/>
      <LocalDevices/>
    </div>
  );
};


export default App;
