const mongoose = require('mongoose');
const { Schema } = mongoose;
const User = Schema({
    account: String,
    password: String
})

module.exports = User;