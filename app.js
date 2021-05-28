const express = require('express'),bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
const mysql = require('mysql');
const router = express.Router();
const bcrypt = require('bcrypt');
const { response } = require('express');
app.set('view-engine', 'ejs')
app.use(express.urlencoded({extended:false}));
app.use(session({secret: 'sssssshhhhh'}));
app.use(express.json());
//sess to store sessions locally
var sess;


var con = require('./database');
var booksRouter = require('./routes/books');
var checkoutRouter = require('./routes/checkout');
var checkinRouter = require('./routes/checkin');
var approvedbooksRouter = require('./routes/approvedbooks');
var managebooksRouter = require('./routes/managebooks');
var checkedbooksRouter = require('./routes/checkedbooks');
var managedataRouter = require('./routes/managedata');
var managedata0Router = require('./routes/managedata0');
var userhistoryRouter = require('./routes/userhistory');
var adminRouter = require('./routes/admin');
var increaseRouter = require('./routes/increase');
var decreaseRouter = require('./routes/decrease');


app.get('/admin',adminRouter);
app.post('/checkin',checkinRouter);
app.post('/checkout',checkoutRouter);
app.post('/managedata',managedataRouter);
app.post('/managedata0',managedata0Router);
app.get('/managebooks',managebooksRouter);
app.get('/checkedbooks',checkedbooksRouter);
app.get('/books',booksRouter);
app.get('/approvedbooks',approvedbooksRouter);  
app.get('/userhistory',userhistoryRouter);
app.post('/increase',increaseRouter);
app.post('/decrease',decreaseRouter);


app.get('/', (req,res)=>{
    req.session.destroy();
    res.render('index.ejs');
})




app.get('/userLandPage', (req,res)=>{
    sess = req.session;

    if(sess.email) {
        // sessEmail = sess.email;
        // console.log("Session email is set to "+ sess.email);
        // console.log(sessEmail);
        res.render('userLandPage.ejs');
    }
    else { res.redirect('/login'); }
    
})






app.post('/addbooks',(req,res)=>{
    
        //const book_id = req.body.book_id;
        const book_name = req.body.book_name;
        const book_count = req.body.book_count;
        


        //console.log(book_id+book_name+book_count);

        // var sql_init =  "SELECT * FROM Books WHERE book_name='"+book_name+"'";
        //to prevent sql injection

        con.query('SELECT * FROM Books WHERE book_name=?',[book_name], function (err, result,fields) {     
            if (err) throw err;  
            if(result.length>0)  {
                console.log("book already pressent || INC COUNT");
               
                Object.keys(result).forEach(function(key) { 
                    var row = result[key];
                    var prevCount = row.book_count;
                    
                    var newCount = parseInt(prevCount) + parseInt(book_count);
                    if(newCount<0){
                        newCount = 0;
                    }
                    // console.log(newCount);
                    //var updateQuery = "UPDATE Books SET book_count = '"+con.escape(newCount)+"' WHERE book_name = '"+book_name+"'";
                    var updateQuery = "";
                    con.query('UPDATE Books SET book_count = ? WHERE book_name = ?',[newCount,book_name],function(err,result){
                        if (err) throw err;  
                        console.log("Book Count Updated");  
                        
                    });


                  });
                
                
            }
            else{

                //var sql = "INSERT INTO Books (book_name,book_count) VALUES ('"+book_name+"', '"+book_count+"')";  
                

                con.query('INSERT INTO Books (book_name,book_count) VALUES (?, ?)',[book_name,book_count], function (err, result) {     
                if (err) throw err;  
                console.log("Book DATA INSERTED");  
                }); 

            }

            res.redirect('/admin');
        });  
   
});



app.get('/login',(req,res)=>{
   res.render('login.ejs')
})
app.get('/loginE',(req,res)=>{
    res.render('loginE.ejs')
 })

app.post('/login', async (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    // const hashedPassword =await bcrypt.hash(req.body.password,10); 
    // const password = hashedPassword;
    
    var sql = "SELECT * FROM USERS_DATA WHERE Email='"+email+"'";
    //console.log(sql);
    con.query(sql, (error, result, fields) => {
        if (error) {
          return console.error(error.message);
        }
        
        if(result.length>0){

        Object.keys(result).forEach(function(key) { 
            
            var row = result[key];

            if(bcrypt.compareSync(password, row.Password)){
                
                if((row.Email=="admin@gmail.com")){
                    console.log("admin");
                    sess = req.session;
                    sess.email = req.body.email;
                    res.redirect('/admin');
                }
                else{
                    
                    sess = req.session;
                    sess.email = req.body.email;
                    res.redirect('/userLandPage');
                    next();
                }
            }
            else{
                
                res.status("400");
                res.send("Incorrect Password !");

                // console.log("Wrong PW");
                
            }
        
    
        
          });
        }

        else{res.send("Email doesnt exist");}
    });
})

app.post('/loginexists', async (req,res)=>{
    
    const email = req.body.email;
    var password = req.body.password;
    const hashedPassword =await bcrypt.hash(req.body.password,10); 
    

    console.log(email);
    console.log(password);
    console.log("checking password");
    con.query('SELECT * FROM USERS_DATA WHERE Email=?',[email], (error, result) => {

       
        var row;

        Object.keys(result).forEach(function(key) { 
        row = result[key];
        });

        console.log(row.Password);

             if(bcrypt.compareSync(password, row.Password)){
                console.log("Password Matches");
                 if((result.Email=="admin@gmail.com")){
                     console.log("admin");
                     sess = req.session;
                     sess.email = req.body.email;
                     res.redirect('/admin');
                     res.end();

                 }
                 else{
                   
                     sess = req.session;
                     sess.email = req.body.email;
                     res.redirect('/userLandPage');
                     res.end();
                 }
            }
            else{
                res.send("Incorrect password");
            }
    
});

});



app.get('/register', (req,res)=>{
    res.render('register.ejs');
})

app.post('/register',async(req,res)=>{
    try {
        const hashedPassword =await bcrypt.hash(req.body.password,10);  
        const password = hashedPassword;
        // const password = req.body.password;
        const name = req.body.name;
        const email = req.body.email;
        
        con.query('SELECT * FROM USERS_DATA WHERE Email=?',[email], function (err, result,fields){
            if(result.length>0){
                //user already exists;
                //redirect to some other page
                console.log("user email already exits");
                res.redirect('/loginE');
                
            }

            else if(name && email && password){
                var sql = "INSERT INTO USERS_DATA (Name,Email,Password) VALUES ('"+name+"', '"+email+"', '"+password+"')";  
                con.query(sql, function (err, result) {     
                if (err) throw err;  
                console.log("USER DATA INSERTED");  
                }); 
                // console.log("Created User! Name: "+name+"Email:" +email+"Password: "+password);
                res.redirect('/login');
            }
            

        });


    } 
    catch {
        res.redirect('/register');
    }
})



app.listen(3000);
