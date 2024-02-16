const express = require("express");

const server = require("http").createServer();
const app = express();

app.get("/", (req, res) => {
    res.sendFile("index.html", { root: __dirname });
});

server.on("request", app);
server.listen(3000, () => {
    console.log("Server is running on port 3000");
});


// Begin WebSocket server
const WebSocketServer = require("ws").Server;
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
    const numClients = wss.clients.size;
    console.log(`Client connected. Total clients: ${numClients}`);
    wss.broadcast(`Client connected. Total clients: ${numClients}`);

    if (ws.readyState === ws.OPEN) {
        ws.send("Welcome to the WebSocket server");
    }

    ws.on("close", () => {
        wss.broadcast(`Client connected. Total clients: ${numClients}`);
        console.log("A client disconnected");
    })
})


wss.broadcast = function broadcast(data) {
    wss.clients.forEach((client) => {
        client.send(data);
    });
}

