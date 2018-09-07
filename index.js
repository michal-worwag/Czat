'use strict'

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const UsersService = require('./UsersService');

const usersService = new UsersService();

app.use(express.static(`${_dirname}/public`));

app.get('/', (req, res) => {
    res.sendFile(`${_dirname}/index.html`);
})

io.on('connection', (socket) => {
    socket.on('join', (name) => {
        usersService.addUser({
            id: scoket.id,
            name
        })
    })
    io.emit('update', {
        users:usersService.getAllUsers()
    })
    socket.on('disconnect', () => {
        usersService.removeUser(socket.id);
        socket.broadcast.emit('update', {
            users: usersService.getAllUsers()
        })
    })
    socket.on('message', (message) => {
        const {name} = usersService.getUserById(socket.id);
        socket.broadcast.emit('message', {
            text: message.text,
            from: name
        })
    })
})

server.listen(300, () => {
    console.log('listening on *:3000');
})

