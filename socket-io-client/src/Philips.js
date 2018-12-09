import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import "./Philips.css";

import Article from "./Article"

class Philips extends Component {
    constructor() {
        super();
        this.state = {
            response: false,
            endpoint: 'http://127.0.0.1:8095'
        };
    }
    componentDidMount() {
        const { endpoint } = this.state;
        const socket = socketIOClient(endpoint);
        socket.on('philips-update', data => this.setState({ response: data }));
    }
    renderArticle = (key) => {
        var that = this;
        return (
            // <div className="column">

            <Article key={key} index={key} details={that.state.response[key]} />
            // </div>
        )
    }
    render() {
        const { response } = this.state;
        return (
            <div className="Philips">
            { response
                ?

              <div className="container">
              <h3>Lights</h3>
                {Object.keys(this.state.response).map(this.renderArticle)}
              </div>
            : <p> Loading.... </p> }
            </div>
            // { response
                // ?
                // <article></article>
            //     <p>
            //     { "Bedroom light: " + response['Bedroom light']['on'] +
            // "\nBathroom light: " + response['Bathroom light']['on'] +
            //     "\nKitchen: " + response['kitchen']['on'] +
            //     "\nliving room: " + response['living room']['on']}
            //     </p>
                // : <p> Trouble loading </p> }

        );
    }
}

export default Philips;
