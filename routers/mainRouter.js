const express = require('express');
var path = require('path');
const router = express.Router();
const mongoose = require('mongoose');
require("../database/connectdb");
const userSchema = require('../database/schemas/user');
const res = require('express/lib/response');
const User = mongoose.model("InformationUser",userSchema);

router.get('/', function(req,res,next) {
    res.sendFile(path.join(__dirname,"../views/signin.html"));
})

router.get('/registery', function(req,res,next) {
    res.sendFile(path.join(__dirname,"../views/signup.html"));
})

router.get('/chat', function(req,res,next) {
    res.sendFile(path.join(__dirname,"../views/chat.html"));
})

router.get('/room', function(req,res,next) {
    res.sendFile(path.join(__dirname,"../views/room.html"));
}) 

router.get('/404', function(req,res) {
    res.sendFile(path.join(__dirname,"../views/404.html"));
})

router.post('/formSignin', async function(req,res,next) {
    let flagCheckSignin = false;
    const listUser = await User.find({});
    for(let user of listUser) {
        if(req.body.account == user.account && req.body.password == user.password) {
            flagCheckSignin = true;
        }
    }
    if(flagCheckSignin) {
        res.redirect(`/room?account=${req.body.account}`);
    } else {
        res.redirect('/');
    }
});

router.post('/formSignup',async function(req,res,next) {
    let flagCheckSignup = true;
    const listUser = await User.find({});
    for(let user of listUser) {
        if(req.body.account == user.account) {
            flagCheckSignup = false;
        }
    }
    if(flagCheckSignup) {
        const user = new User({
            account: req.body.account,
            password: req.body.password
        });
        user.save(function(err) {
            if(err) {
                console.log('Save is database error!!');
            }
        })
    }
    res.sendFile(path.join(__dirname,"../views/signin.html"));
})


module.exports = router;