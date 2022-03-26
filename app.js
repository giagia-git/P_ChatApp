var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var { Schema } = mongoose;
var cors = require('cors');
require('dotenv').config();
var io = require('socket.io')(server);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')));

/* --------_Connect database----------- */
mongoose.connect(process.env.URL_DATABASE)
.then(function() {
    console.log("Connect is database success!!");
})
.catch(function(err) {
    throw new Error(err);
})

const userSchema = Schema({
    account: String,
    password: String
})

const User = mongoose.model("InformationUser",userSchema);

/* --------Router get----------- */
app.get('/', function(req,res) {
    res.sendFile(path.join(__dirname,"/views/signin.html"));
})

app.get('/registery', function(req,res) {
    res.sendFile(path.join(__dirname,"/views/signup.html"));
})

app.get('/chat', function(req,res) {
    res.sendFile(path.join(__dirname,"/views/chat.html"));
})

/* ---------Router post---------- */
app.post('/formSignin',async function(req,res) {
    let flagCheck = false;
    const listUser = await User.find({});
    for(let user of listUser) {
        console.log(user);
        console.log(user._id);
        console.log(user._id == ObjectID('623ed9bcd59899b092dfc19f'));
        if(req.body.account == user.account && req.body.password == user.password) {
            flagCheck = true;
        }
    }
    if(flagCheck) {
        res.redirect('/chat');
    } else {
        res.redirect('/');
    }
})

app.post('/formSignup',async function(req,res) {
    const user = new User({
        account: req.body.account,
        password: req.body.password
    })

    user.save(function(err) {
        if(err) {
            res.redirect('/registery');
        }
    })
    res.redirect('/');
})

/* -----------_Socket.io----------- */
io.on("connection", function(socket) {
    console.log(socket.id + " vao phong chat");
    socket.on('send', function(data) {
        io.emit('send',data);
    })
})

var port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log('server is running PORT 3000...');
});