const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const port = 3000;

server.listen(port, () => {
    console.log(`Server is listening on Port: ${port}`);
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
});

app.get('/dungeon', (req, res) => {
    res.sendFile(__dirname + '/public/dungeon.html');
});

app.get('/cellar', (req, res) => {
    res.sendFile(__dirname + '/public/cellar.html');
});

app.get('/home', (req, res) => {
    res.sendFile(__dirname + '/public/home.html');
});

const tech = io.of('/tech');

tech.on('connection', (socket) => {
    
    socket.on('join', (data) => {
        socket.join(data.room);
        tech.in(data.room).emit('message', `Someone connected to ${data.room}( ͡° ͜ʖ ͡°)!`)
    });

    socket.on('message', (data) => {
        tech.in(data.room).emit('message', data.msg);
    });

    io.on('disconnect', ()=> {
        console.log('User Disconnected');
        tech.emit('message', 'User Disconnected');
    });

});





