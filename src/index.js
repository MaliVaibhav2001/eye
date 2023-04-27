const express=require("express");
const app=express();
const port = process.env.PORT || 4000;
const path=require("path");
const hbs=require("hbs");
require('./db/connection');          // importing db file
const User = require('./models/usermessage');
const Register = require('./models/registers');
const { urlencoded } = require("express");
const bcrypt = require('bcrypt');
const dotenv = require("dotenv").config();

//builtin middlewear
const staticPath=path.join(__dirname,"../public");
const templatePath=path.join(__dirname,"../template/views");
const partialPath=path.join(__dirname,"../template/partials");

app.use(express.urlencoded({extended: false}));

app.use(express.static(staticPath));

//to set the view engine
app.set("view engine","hbs")
app.set("views",templatePath)
hbs.registerPartials(partialPath);

//template engine route
app.get('/',(req,res)=>{
    res.render("login")
})
app.get('/about',(req,res)=>{
    res.render("about")
})
app.get('/blogs',(req,res)=>{
    res.render("blogs")
})
app.get('/cart',(req,res)=>{
    res.render("cart")
})
app.get('/contact',(req,res)=>{
    res.render("contact")
})

app.post('/contact', async(req, res) => {
    try {
        // res.send(req.body);
        const userDate = new User(req.body);
        await userDate.save();
        res.status(201).render('contact');
    }catch(err) {
        res.status(500).send(err);
    }
})
app.get('/products',(req,res)=>{
    res.render("products")
})


// Login
app.get('/login',(req,res)=>{
    res.render("login")
})
// Login Check
app.post('/login',async(req,res)=>{
    try{
        const email=req.body.email;
        const password = req.body.password;
        const usermail = await Register.findOne({email:email});
        const isMatch = await bcrypt.compare(password, usermail.password)
        if(isMatch){
            res.status(201).render("index")
        }
        else{
            res.send("invalid login details")
        }

    }
    catch(error){
        res.status(400).send("invalid login details")
    }
})



// Registration
app.get('/register',(req,res)=>{
    res.render("register")
})

// Creating New User On DB
app.post('/register', async(req, res) => {
    try {
        
        
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;

        if(password === cpassword){
            // res.send(req.body);
            const registerDate = new Register(req.body);
            await registerDate.save();
            res.status(201).render('login');
        }else{
            res.send("Password are not matching")
        }
    }catch(err) {
        res.status(500).send(err);
    }
})

// app.get('/',(req,res)=>{
//     res.send("hello from the express")
// })
// app.get('/contact',(req,res)=>{
//     res.send("hello from the Contact")
// })
app.listen(port,()=>{
    console.log(`listening the port at ${port}`)
})