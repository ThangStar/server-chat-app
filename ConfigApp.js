const express = require('express')
const app = express()
const path = require('path')
app.set('views', path.join(__dirname, "/src/views"));

module.exports.app = app