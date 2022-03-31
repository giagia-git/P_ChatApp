const mongoose = require('mongoose');
const { Schema } = mongoose;
const userSchema = Schema({
    account: String,
    password: String
})

module.exports = userSchema;