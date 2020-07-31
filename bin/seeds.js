//vinculamos modelos y mongoose.
const mongoose = require('mongoose');
const Item = require('../models/item');
const User = require('../models/user');

const dbName = 'giftme';
mongoose.connect(`mongodb://localhost/${dbName}`, { useNewUrlParser: true, useUnifiedTopology: true });

