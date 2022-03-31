const express = require('express');
const router = express.Router();

router.get('/chat', function(req,res,next) {
    res.sendFile(path.join(__dirname,"../views/chat.html"));
})

module.exports = router;