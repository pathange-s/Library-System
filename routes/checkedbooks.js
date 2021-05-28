var express = require('express');
const checkedbooksRouter = express.Router();
var con=require('../database');

checkedbooksRouter.get('/checkedbooks', function(req, res, next) {
   
    var sql="SELECT * FROM Books_Status INNER JOIN Books USING(book_id) WHERE Status='Approved' ORDER BY Book_ID ASC";
        con.query(sql, function (err, data, fields) {
        if (err) throw err;
            var obj = {};
            
            obj = {print: data};
            res.render('checkedbooks.ejs', obj);
  });

console.log("Printing Checked books Data");
    
});

module.exports = checkedbooksRouter;

