const express = require('express')
const app = express()
const path = require('path')
app.set('views', path.join(__dirname, "/src/views"));
app.use(express.static(path.join(__dirname, './public')));
module.exports.app = app