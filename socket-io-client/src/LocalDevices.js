import React, { Component } from "react";
import socketIOClient from "socket.io-client";

class LocalDevices extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      endpoint: "http://127.0.0.1:8095"
    };
  }
  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("local-devices-update", data => this.setState({ response: data }));
  }
  render() {
    const { response } = this.state;

    return (
        <div className="LocalDevices">
        { response
            ?

          <div className="container">
          <h3>Local Devices</h3>
            {response}
          </div>
        : <p> Loading.... </p> }
        </div>
    );
  }
}
export default LocalDevices;
