const express = require('express');
const router = express.Router();

router.get('/registery', function(req,res,next) {
    res.sendFile(path.join(__dirname,"../views/signup.html"));
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

module.exports = router;