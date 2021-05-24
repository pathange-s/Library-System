const express = require('express');
const session = require('express-session');
const app = express();
const mysql = require('mysql');
const router = express.Router();
const bcrypt = require('bcrypt');
app.set('view-engine', 'ejs')
app.use(express.urlencoded({extended:false}));
app.use(session({secret: 'sssssshhhhh'}));

var sess;
const con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'1234RTyu$',
    database:'USERS'
});

const databaseUsers = require('./database.js');


con.connect((err) => {
    if(err){
      console.log('Error connecting to Db');
      return;
    }
    console.log('Connection established');
  });


app.get('/', (req,res)=>{
    req.session.destroy();
    res.render('index.ejs');
})



app.get('/library', (req,res)=>{
    sess = req.session;
    if(sess.email) {
        res.render('library.ejs');
    }
    else { res.redirect('/login'); }
    
})

app.get('/admin', (req,res)=>{
    sess = req.session;
    if(sess.email) {
        res.render('admin.ejs');   
    }
    else{ res.redirect('/login'); } 
    
})

app.get('/login',(req,res)=>{
   res.render('login.ejs')
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
                    res.redirect('/library');
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
        
        if(name && email && password){
            var sql = "INSERT INTO USERS_DATA (Name,Email,Password) VALUES ('"+name+"', '"+email+"', '"+password+"')";  
            con.query(sql, function (err, result) {     
            if (err) throw err;  
            console.log("USER DATA INSERTED");  
            }); 
            // console.log("Created User! Name: "+name+"Email:" +email+"Password: "+password);
        }
        res.redirect('/login');
    } 
    catch {
        res.redirect('/register');
    }
})



app.listen(3000);




//back button log outs . ! how to stop this