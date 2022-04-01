const express = require('express');
var path = require('path');
const router = express.Router();

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

router.get('/api/users',function(req,res) {
    res.json({message: "hoho"});
})

router.post('/formSignin',async function(req,res,next) {
    let flagCheckSignin = false;
    const listUser = await User.find({});
    for(let user of listUser) {
        if(req.body.account == user.account && req.body.password == user.password) {
            accountSignin = req.body.account;
            flagCheckSignin = true;
        }
    }
    if(flagCheckSignin) {
        res.redirect('/room');
    } else {
        res.redirect('/');
    }
})

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
    res.sendFile(path.join(__dirname,"/views/signin.html"));
})

router.get('/api/users',async function(req,res,next) {
    const docs = await User.find({});
    res.join(docs);
})



module.exports = router;