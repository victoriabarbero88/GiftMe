const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name:  {type: String ,default: "", required: true},
  userId: {type: mongoose.Types.ObjectId, ref:"User"},
  description: {type: String ,default: "", required: true},
  image: { type: String , required: true},
  category: {type: String, enum:["books", "clothes", "devices"]},
  city: {type: String, enum:["Barcelona", "Madrid"]},
  requests: [{
      requester: {type: mongoose.Types.ObjectId, ref:"User"}, 
      delivery: {type: String, enum:["pickup", "send"]},

  }]
});



const Item = mongoose.model('Item', itemSchema);

module.exports = Item;