const app = require("express")();
const server = require("http").createServer(app);
const cors = require('cors')

const io = require('socket.io')(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

app.use(cors());

const PORT = process.env.PORT || 5000;

const roomData = new Map()

app.get('/',  (req, res) => {
    res.json(room)
    res.send('Server is running')
})

io.on('connection', (socket) => {
    
    socket.emit('me', socket.id);

    socket.on('disconnect', () => {
        socket.broadcast.emit("callEnded")
    });

    socket.on("callToUser", ({userToCall, signalData, from, name }) => {
        io.to(userToCall).emit("callToUser", {signal: signalData, from, name});
    });

    socket.on("answerCall", (data) => {
        io.to(data.to).emit("isCallAccepted", data.signal)
    });
    
    socket.on('sendChatMessage', (data) => {
        io.emit('message', data)
    })
})

server.listen(PORT, (error) => {
    if(error) {
        throw Error(error)
    }
    console.log(`Server is listening on port ${PORT}`) 
})
