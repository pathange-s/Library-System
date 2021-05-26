var express = require('express');
const approvedbooksRouter = express.Router();
var con=require('../database');
const session = require('express-session');
var sess;

approvedbooksRouter.get('/approvedbooks', function(req, res, next) {
   //write code to fetch approved books of that email only
   
   sess = req.session;
   var stringEmail = sess.email;
   console.log(stringEmail);
    var sql="SELECT * FROM Books_Status INNER JOIN Books USING(book_id) WHERE User_Email ='"+stringEmail+"' AND Status='Approved' ORDER BY Book_ID ASC";

    con.query(sql, function (err, data, fields) {
        if (err) throw err;
            var obj = {};

            obj = {print: data};
            res.render('approvedbooks.ejs', obj);

        // res.render('Books.ejs', { title: 'Books', datasent_id: data.book_id});
        //res.render('Books.ejs', { title: 'Books', datasent: name});
  });

});

module.exports = approvedbooksRouter;