const express = require('express');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const User = require ('../models/user'); 

const router = express.Router();


//SIGNUP

router.get('/signup', (req,res,next)=>{
    res.render('auth/signup',{
        errorMessage:""

    });

});

router.post('/signup', (req,res,next) =>{
    const {name, email, password} = req.body;
        if (email === "" || password === "" || name === ""){
    res.render ("auth/signuplogin", {errorMessage: "Indicate a name, email and a password to sign up"});
    return;

    }

User.findOne({email})
    .then((foundUser)=>{
        if (foundUser){
            res.render("auth/signuplogin", { errorMessage: "There´s is already an account with this email"});
            return;
        }

    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);
    //const newUser = {name, email, password: hashedPassword};

    User.create({name, email, password: hashedPassword})
        .then(()=>{
            res.redirect("/signuplogin");
        })
        .catch((err)=>{

            res.render("auth/signuplogin", {errorMessage: "Error while creating account. Please try again"})
        });
    })
    .catch((err)=> console.log(err));

});

// LOGIN

router.get("/login", (req,res,next) => {
    res.render("auth/signuplogin");
});

router.post("/login", (req,res,next)=>{
    const {email, password} = req.body;
    if(email === "" || password === ""){
        res.render("auth/signuplogin", {errorMessage:"Please enter email and password to login"});
        return;
    }
    User.findOne({email: email})
    .then((user)=> {
        if(user === null){
            res.render("auth/signuplogin", {errorMessage: "The email doesn´t exist"});
            return;
        }
        if (!bcrypt.compareSync(password, user.password)){
            res.render('auth/signuplogin', {
                errorMessage: 'Invalid password.'
              });
              return;
            }
           
            req.session.currentUser = user;
            res.redirect('/');
    })
    .catch(()=>{
        res.render("auth/signuplogin", {errorMessage: "Error while login. Try again later"})
    })

});

//LOGOUT

router.get('/logout', (req,res,next)=> {
    if (!req.session.currentUser){
    res.redirect('/');
    return
    }

    req.session.destroy((err) =>{
        if(err){
            next(err);
            return;
        }
        res.redirect('/');
    })
  });



module.exports = router;

