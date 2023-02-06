
require('dotenv').config();
const express = require('express')
const app = express()
const port = 3001
const conn = require("./db");
const AppError = require("./appError");
const bodyParser    = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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

app.post('/books', (req, res, next) => {
  if (!req.body) return next(new AppError("No form data found", 404));
  const {title, isbn, genre, author} = req.body
  var values = [title, isbn, genre, author];
  conn.query(
    "INSERT INTO books(title, isbn, genre, author) VALUES (?,?,?,?)",
    values,
    function (err, data, fields) {
      if (err) return next(new AppError(err, 500));
      res.status(201).json({
        status: "success",
        message: "books created!",
      });
    }
  );
 });

 app.get('/books/:id', (req, res, next) => {
  if (!req.params.id) {
    return next(new AppError("No book id found", 404));
  }
  conn.query(
    "SELECT * FROM books WHERE id = ?",
    [req.params.id],
    function (err, data, fields) {
      if (err) return next(new AppError(err, 500));
      res.status(200).json({
        status: "success",
        length: data?.length,
        data: data,
      });
    }
  );
 })

 app.put('/books/:id', (req, res, next) => {
  const { title, isbn, genre, author} = req.body;
  if (!req.params.id) {
    return next(new AppError("No book id found", 404));
  }
  const values = [title, isbn, genre, author, req.params.id];
  conn.query(
    "UPDATE books SET title=?,isbn=?,genre=?,author=? WHERE id=?",
    values,
    function (err, data, fields) {
      if (err) return next(new AppError(err, 500));
      res.status(201).json({
        status: "success",
        message: "Book updated!",
      });
    }
  );
 });


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })