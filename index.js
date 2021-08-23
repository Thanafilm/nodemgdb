const express = require('express');
const app = express()
const connectDB = require('./connect/db')

connectDB();
app.get('/', function(req, res) {
    res.send('ggez')
})
app.listen(3000)