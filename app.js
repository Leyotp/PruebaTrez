
require('dotenv').config();
const express = require('express')
const app = express()
const port = 3001
const conn = require("./db");
const AppError = require("./appError");

app.get('/books', (req, res) => {
  conn.query("SELECT * FROM books", function (err, data, fields) {
    if(err) return next(new AppError(err))
    res.status(200).json({
      status: "success",
      length: data?.length,
      data: data,
    });
  });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })