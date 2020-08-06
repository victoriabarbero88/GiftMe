const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name:  {type: String ,default: ""},
  userId: {type: mongoose.Types.ObjectId, ref:"User"},
  description: {type: String ,default: ""},
  image: { type: String ,default: "https://erc.uonbi.ac.ke/sites/erc.uonbi.ac.ke/files/styles/large/public/2016-05/feature-1.jpg?itok=AKwWLRcS"},
  category: {type: String, enum:["books", "clothes", "devices"]},
  city: {type: String, enum:["Barcelona", "Madrid"]},
  requests: [{
      requester: {type: mongoose.Types.ObjectId, ref:"User"}, 
      delivery: {type: String, enum:["pickup", "send"]},

  }]
});



const Item = mongoose.model('Item', itemSchema);

module.exports = Item;