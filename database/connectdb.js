var mongoose = require('mongoose');
/* --------_Connect database----------- */
var urlDatabase = process.env.URL_DATABASE || "127.0.0.1";
module.exports = mongoose.connect(urlDatabase)
.then(function() {
    console.log("Connect is database success!!");
})
.catch(function(err) {
    throw new Error(err);
});