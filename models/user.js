const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  description: String,
  image: { type: String ,default: "https://ibalz.com/wp-content/uploads/2019/10/default-profile.png"},
  myItems: [{type: mongoose.Types.ObjectId, ref:"Item"}],
  acquireditems: [{type: mongoose.Types.ObjectId, ref:"Item"}],
  favourites:[{type: mongoose.Types.ObjectId, ref:"Item"}],
});

userSchema.set('timestamps', true);

const User = mongoose.model('User', userSchema);

module.exports = User;
