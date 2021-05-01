const app = require('express')();
const server = require('http').createServer(app)
const cors = require('cors')

const socketIO = require('socket.io')(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
})

app.use(cors());

const PORT = process.env.PORT || 5000;

app.get("/",  (req, res) => {
    res.send('Server is running')
})

socketIO.on('connection', (socket) => {
    socket.emit('me', socket.id);

    socket.on('disconnect', () => {
        socket.broadcast.emit("callended")
    });

    socket.io("calluser", ({userToCall, signalData, from, name }) => {
        socketIO.to(userToCall).emit("calluser", {signal: signalData, from, name});
    });

    socket.on("answercall", (data) => {
        socketIO.to(data.to).emit("callaccepted", data.signal)
    });
})


server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))