//vinculamos modelos y mongoose.
const mongoose = require('mongoose');
const Item = require('../models/item');
const User = require('../models/user');

const dbName = 'giftme';
mongoose.connect(`mongodb://localhost/${dbName}`, { useNewUrlParser: true, useUnifiedTopology: true });

const item = [
    {
    name: "La sombra del viento",
    userId: {type: mongoose.Types.ObjectId, ref:"User"},
    description: "Novel writen by Carlos Ruiz Zafónº",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQqNXXJEZxI4UJAy53wsp96ibdNjsMkooLp2RmpC72fmG6kHJ1C2y1O9V2d8dexw17-zuJsT-Q&usqp=CAc",
    category: "books",
    city: "Barcelona",
    requests: [{
  
        requester: {type: mongoose.Types.ObjectId, ref:"User"}, 
        delivery: {type: String, enum:["pickup", "send"]},
  
    }]
  },
  {
    name: "trousers",
    userId: {type: mongoose.Types.ObjectId, ref:"User"},
    description: String,
    image: "data:image/jpeg;base64,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",
    category: "clothes",
    city: "Madrid",
    requests: [{
  
        requester: {type: mongoose.Types.ObjectId, ref:"User"}, 
        delivery: {type: String, enum:["pickup", "send"]},
  
    }]
  },
  {
    name: "alarm clock",
    userId: {type: mongoose.Types.ObjectId, ref:"User"},
    description: String,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRu1ZjT-WEyjzB433VrNpxdOHbxFHw5zQXMy7LfnbUd6atdPfE9Omov_z5OwQRJQm8Dey2W6ec&usqp=CAc",
    category: "devices",
    city: "Barcelona",
    requests: [{
  
        requester: {type: mongoose.Types.ObjectId, ref:"User"}, 
        delivery: {type: String, enum:["pickup", "send"]},
  
    }]
  }


]
  