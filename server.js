const express = require('express');
const http = require('http');
const path = require('path');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set EJS as view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Socket.io connection
io.on("connection", (socket) => {
    socket.on('send-location',function (data) {
        io.emit("receive-location", {id:socket.id, ...data})
    });
    socket.on("disconnect", () => {
       io.emit('user-disconnect',socket.io)
    });
});

// Routes
app.get('/', (req, res) => {
    res.render("index"); 
});

// Start the server
server.listen(3000, () => {
    console.log("Server running on port 3000");
});
