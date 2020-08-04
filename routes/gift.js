const express = require('express');
const router = express.Router();
const Item = require('../models/item');
const User = require('../models/user'); 
const parser = require('./../config/cloudinary');



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
      console.log(item);
      res.render('giftme/item-details', {item});
    })
    .catch(error => {
      console.log( error);
    })
});




router.get('/request', (req, res, next) => {
  res.render('giftme/request');
});



router.get('/other-user/:id', (req, res, next) => {
  const userId = req.params.id;
  User.findById(userId)
    .populate("myItems")
    .then((user) => {
      //console.log(user)
      res.render('giftme/other-user', {user});
    })
    .catch(error => {
      console.log( error);
    })
});



router.get('/profile', (req, res, next) => {
  //const user = req.session.currentUser;
  
  const _id = req.session.currentUser._id;
  User.findOne({_id})
  .then((user)=>{
    res.render('giftme/profile', {user});
    
  })
  .catch((error)=>{

  })

});
  

router.post('/profile/update', parser.single("image"), (req, res, next) => {
    //console.log(req.file)
    const _id = req.session.currentUser._id;
    const {name, description} = req.body;
    const image_url = req.file.secure_url;
    User.findByIdAndUpdate(_id, {image: image_url, name, description})
    .then(()=>{
      res.redirect("/profile")
    })

    .catch((error)=>{})
    });
    



router.get('/myitems', (req, res, next) => {
  const user = req.session.currentUser;
  User.findById(user._id)
  .populate('myItems')
  .then((item) => {
    console.log(item);
    res.render('giftme/myitems', {item})
    
  })  
  .catch((error) => {
    console.log(error);
  })
 
});


router.post("/myitems/:id/delete", (req, res, next) => {
  const userId = req.session.currentUser._id;
  Item.findByIdAndRemove(req.params.id )
    .then((item) => {
  User.findByIdAndUpdate(userId, {myItems: {$pull: req.params.id}})
      res.redirect('/myitems');
    })
    .catch((error) => {
      console.log(error);
    });
    
});



// router.get('/myitmes', (req, res, next) => {
//   const _id = req.session.currentUser._id;

//   User.findOne({_id})
//   .then((user)=>{
//     res.render('giftme/myitems', {user}); 
//   })
//   .catch((error)=>{
//   })
// });
   

  // router.post('/item/create', (req, res, next) => {
  //   const { name, image, description, category, city} = req.body;
  //   const user= req.session.currentUser._id;
  //   const newItem = new Item({ name,image, description, category, city})
  //   newItem.save()
  //   .then((item) => {
  //     console.log(item)
  //     console.log("holi", user)
  //     User.update({_id:user}, {$push: {myItems: item._id}})
  //     .then(()=>{
  //       res.redirect('/myitems');
  //     })
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   })
  // });

  router.post('/item/create', parser.single("image"), (req, res, next) => {
    const { name, description, category, city } = req.body;
    const _id = req.session.currentUser._id;
    const image_url = req.file.secure_url;
    const newItem = new Item({ name, image: image_url, description, category, city})
    newItem.save()
    .then((item) => {
      User.update({_id:_id}, {$push: {myItems: item._id}})
      .then(()=>{
        res.redirect('/myitems');
      })
    })
    .catch((error) => {
      console.log(error);
    })
  });
  
  router.post('/item/update', parser.single("image"), (req, res, next) => {
    const _id = req.session.currentUser._id;
    const {name, description} = req.body;
    const image_url = req.file.secure_url;
    Item.findByIdAndUpdate(_id, {name, image: image_url, description})
    .then(()=>{
      res.redirect("/myitems")
    })

    .catch((error)=>{})
    });





    





  
  
  



module.exports = router;


