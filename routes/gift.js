const express = require('express');
const router = express.Router();
const Item = require('../models/item');
const User = require('../models/user'); 



router.use((req,res,next)=>{
  if(req.session.currentUser){
      next();
      return;
  }
  res.redirect('/login');

});


router.get('/marketplace', (req, res, next) => {

  Item.find()
 
  .then((items)=>{
    res.render('giftme/marketplace', {items});
  
  })
  .catch((error)=>{
    console.log(error);
  })
});



router.get('/details/:id', (req, res, next) => {

  Item.findOne({'_id': req.params.id})
    .then(item => {
      res.render('giftme/item-details', {item});
    })
    .catch(error => {
      console.log( error);
    })
});




router.get('/request', (req, res, next) => {
  res.render('giftme/request');
});




router.get('/other-user', (req, res, next) => {
    res.render('giftme/other-user');
  });
  



router.get('/profile', (req, res, next) => {
  const user = req.session.currentUser;
  console.log(user);
  res.render('giftme/profile', {user});
  });
  




// router.get('/myitems', (req, res, next) => {
//     console.log("hola")
//     Item.find()
   
//     .then((items)=>{
//       res.render('giftme/myitems', {items});
    
//     })
//     .catch((error)=>{
//       console.log(error);
//     })
//   });


  router.post('/item/create', (req, res, next) => {
    const { name,image, description, category, city} = req.body;
    const user= req.session.currentUser.id;
    const newItem = new Item({ name,image, description, category, city})
    newItem.save()
    .then((item) => {
      User.update({_id:user}, {$push: {myItems: newItem._id}})
      .then(()=>{
        res.redirect('/myitems');
      })
    })
    .catch((error) => {
      console.log(error);
    })
  });
  




  
  
  



module.exports = router;


