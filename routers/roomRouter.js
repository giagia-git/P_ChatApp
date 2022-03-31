const express = require('express');
const router = express.Router();

router.get('/room', function(req,res,next) {
    res.sendFile(path.join(__dirname,"../views/room.html"));
}) 

module.exports = router;