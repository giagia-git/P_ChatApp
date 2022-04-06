var express = require('express');
var app = express();
var server = require('http').createServer(app);
var bodyParser = require('body-parser');
var path = require('path');
var cors = require('cors');
require('dotenv').config();

var io = require('socket.io')(server);
const {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
} = require('./utils/users');
const formatMessage = require('./utils/messages'); 
var port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')));

const mainRouter = require('./routers/mainRouter');

app.use('/',mainRouter);

server.listen(port, () => {
    console.log('server is running PORT 3000...');
});

const AppName = "Chatting";

/* -----------_Socket.io----------- */
io.on("connection", function(socket) {

    // join room
    socket.on("joinRoom", ({username,room}) => {
        const user = userJoin(socket.id,username,room);
        socket.join(room);

        // Welcome current user
        socket.emit('receiveMessage',formatMessage(AppName,"Welcome to Chatting"));

        // Broadcast when a user connects
        socket.broadcast.to(user.room).emit('receiveMessage',formatMessage(user.username,`${user.username} has join the chat`));
        
        // Send users and room info
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            username: user.username
        });
    });

    /* User send message */
    socket.on("sendMessage",({inputMessage}) => {
        const user = getCurrentUser(socket.id);
        io.to(user.room).emit('receiveMessage',formatMessage(user.username,inputMessage));
    })

    socket.on("disconnect", () => {
       const user = userLeave(socket.id);

       if(user) {
           io.to(user.room).emit('receiveMessage',formatMessage(user.username,`${user.username} has left the chat`));
       }
    })
})





