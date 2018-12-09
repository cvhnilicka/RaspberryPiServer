const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const axios = require("axios");

const port = process.env.PORT || 8095;
const index = require("./routes/index");

const app = express();
app.use(index);

const server = http.createServer(app);
const io = socketio(server);


//
// io.on('connections', socket => {
//     console.log("New client connected", setInterval(
//         () => getApiAndEmit(socket),
//         10000
//     );
//     socket.on("disconnect", () => console.log("Client disconnected"));
// });

io.on('connection', function(socket){
    console.log('Client connected');
    setInterval(()=>philipsUpdate(socket), 10000);  // Update Lights every 10 seconds
    socket.on("disconnect", () => console.log("Client disconnected"));
        // This event will be emitted from Client when some one add comments.
});

const philipsUpdate = async socket => {
    try {
        const res = await axios.get(
            "http://10.0.0.216/api/o1v4gNkl-cCyQVcef9kRepLuqRygujVRI4oJYIW-/lights"
        );
        // console.log(res.data)
        var ret = res.data;
        var light_dict = {}
        for (var key in ret) {
            if (ret.hasOwnProperty(key)) {
                // console.log(key + " -> ");
                light_dict[ret[key]['name']] = {}
                light_dict[ret[key]['name']]['on'] = ret[key]['state']['on']
                if (light_dict[ret[key]['name']]['on'] == false) {
                    light_dict[ret[key]['name']]['color'] = 'ff3300';
                } else {
                    light_dict[ret[key]['name']]['color'] = '0000ff';
                }

            }
        }
        // console.log("[lighting update]")
        socket.emit("philips-update", light_dict)
    } catch (error) {
        console.error(`Error: ${error.code}`);
    }
}




const getApiAndEmit = async socket => {
    try {
        const res = await axios.get(
            "http://api.openweathermap.org/data/2.5/weather?zip=97201&APPID=4734eb9f8064ee4bfb4ed14e74fe4958"
        );
        console.log(res.data)
        socket.emit("FromAPI", res.data);
    } catch (error) {
        console.error(`Error: ${error.code}`);
    }
};

server.listen(port, () => console.log(`Listening on port ${port}`));
