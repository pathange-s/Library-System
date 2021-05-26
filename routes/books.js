var express = require('express');
const booksRouter = express.Router();
var con=require('../database');

booksRouter.get('/books', function(req, res, next) {
   
    var sql="SELECT * FROM Books WHERE book_count>0 ORDER BY book_id ASC";
        con.query(sql, function (err, data, fields) {
        if (err) throw err;
            var obj = {};
            
            obj = {print: data};
            res.render('Books.ejs', obj);
  });

    console.log("router for books imported");

});

module.exports = booksRouter;

