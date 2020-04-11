const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);


// Static Folder
app.use('/', express.static(path.join(__dirname, 'public')))

// Running ketika client connect
io.on('connection', socket => {
    console.log('New Web Socket Connection.....');

    socket.emit('message', 'Welcome to CheatChat');

    // Broadcast ketika user connect
    socket.broadcast.emit('message', 'A user has joined the chat');

    // Run ketika user disconnect
    socket.on('disconnect', () => {
        io.emit('message', 'A user has left the chat');
    });
    
    // Listen for chat message
    socket.on('chatMessage', msg => {
        io.emit('message', msg);
    })
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));