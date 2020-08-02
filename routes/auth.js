const express = require('express');
const bcrypt = require('bcryptjs');

const User = require ('../models/user'); 

const router = express.Router();
const bcryptSalt = 10;

//SIGNUP

router.get('/signup', (req,res,next)=>{
    res.render('auth/signup',{
        errorMessage:""

    });

});

router.post('/signup', (req,res,next) =>{
    const {name, email, password} = req.body;
        if (email === "" || password === "" || name === ""){
    res.render ("auth/signup", {errorMessage: "Indicate a name, email and a password to sign up"});
    return;

    }

User.findOne({email})
    .then((foundUser)=>{
        if (foundUser){
            res.render("auth/signup", { errorMessage: "There´s is already an account with this email"});
            return;
        }

    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const newUser = {name, email, password: hashedPassword};

    User.create({name, email, password: hashedPassword})
        .then(()=>{
            res.redirect("/login");
        })
        .catch((err)=>{

            res.render("auth/signup", {errorMessage: "Error while creating account. Please try again"})
        });
    })
    .catch((err)=> console.log(err));

});

// LOGIN

router.get("/login", (req,res,next) => {
    res.render("auth/login");
});

router.post("/login", (req,res,next)=>{
    const {name, email, password} = req.body;
    if(name === "" || email === "" || password === ""){
        res.render("auth/login", {errorMessage:"Please enter name, email and password to login"});
        return;
    }
    User.findOne({email})
    .then((user)=> {
        if(!user){
            res.render("auth/login", {errorMessage: "The email doesn´t exist"});
            return;
        }
        if (bcrypt.compareSync(password, user.password)){
            req.session.currentUser = user;
            res.redirect("/") // editar luego para que redirija a la vista de HOME
        } else {
            res.render("auth/login", {errorMessage: "Incorrect password"});
        }
    })
    .catch(()=>{
        res.render("auth/login", {errorMessage: "Error while login. Try again later"})
    })

});

//LOGOUT

//COPIADO DESDE EL EJEMPLO DE LAUNDRY PORQUE NO FUNCIONA CUANDO LO REFACTORIZAMOS
//ERROR EN UN .THEN (VER MÁS ABAJO)
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



//  VER ERROR EN EL .THEN

// router.get("/logout", (req,res,next)=> {
//     if(!req.session.currentUser){
//         res.redirect("/");
//         return;
//         }
//     req.session.destroy((error)=> {
//     .then(() => {
//         res.redirect('/');
//     })
//     .catch ((error)=>{
//         next(error);
//     })

//     });

// });



module.exports = router;

