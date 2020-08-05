//vinculamos modelos y mongoose.
require('dotenv').config();
const mongoose = require("mongoose");
const Item = require("../models/item");
const User = require("../models/user");
const dbName = "giftme";
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const DEFAULT_PASSWORD = "1234";
const items = [
  {
    name: "La sombra del viento",
    userId: "",
    description: "Novel writen by Carlos Ruiz Zafónº",
    image:
      "https://i.pinimg.com/474x/6c/b2/ba/6cb2ba7ea797190433820ffed2f7413e.jpg",
    category: "books",
    city: "Barcelona",
    requests: []
  },
  {
    name: "trousers",
    userId: "",
    description: "100% cotton fabric",
    image:"https://i.pinimg.com/564x/31/30/0c/31300ccc972ec7c2d4ad08bc190343f2.jpg",
    category: "clothes",
    city: "Madrid",
    requests: []
  },
  {
    name: "Mouse",
    userId: "Logitech wireless mouse",
    description: "Little use",
    image: "https://i.pinimg.com/originals/f3/37/7e/f3377ed959a1623def8a7171e6140187.jpg",
    category: "devices",
    city: "Madrid",
    requests: []
  },
  {
    name: "To kill a mockingbird",
    userId: "",
    description: "Novel by Harper Lee",
    image: "https://cdn.britannica.com/21/182021-050-666DB6B1/book-cover-To-Kill-a-Mockingbird-many-1961.jpg",
    category: "books",
    city: "Barcelona",
    requests: []
  },
  {
    name: "alarm clock",
    userId: "",
    description:
      "Loud alarm clock for people who are heavy sleepers, mild loss hearing even deaf.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRu1ZjT-WEyjzB433VrNpxdOHbxFHw5zQXMy7LfnbUd6atdPfE9Omov_z5OwQRJQm8Dey2W6ec&usqp=CAc",
    category: "devices",
    city: "Barcelona",
    requests: []
  },
  {
    name: "Blouse",
    userId: "",
    description: "M size. Fresh fabric",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR_KD2rJmfLQi1fY_U3-1QMk2sFWsS5PWo3vw&usqp=CAU",
    category: "clothes",
    city: "Madrid",
    requests: []
  }
];
const users = [
  {
    name: "Laura",
    email: "laura.rojas@gmail.com",
    password: "1234",
    description: "I love music",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80",
    myItems: [],
    acquireditems: [],
    favourites: []
  },
  {
    name: "Robert",
    email: "robrobby@gmail.com",
    password: "12345",
    description: "I love the sea",
    image:
      "https://images.unsplash.com/photo-1541855492-581f618f69a0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    myItems: [],
    acquireditems: [],
    favourites: []
  },
  {
    name: "Alex",
    email: "alejo@gmail.com",
    password: "12346",
    description: "I love Web Development",
    image:
    "https://images.unsplash.com/photo-1552493450-2b5ce80ed13f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1302&q=80",
    myItems: [],
    acquireditems: [],
    favourites: []
  }
];
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    //creamos los usuarios

    const updatedUsers = users.map((user)=> {
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(DEFAULT_PASSWORD, salt);
      user.password = hashedPassword;
      return user;
    })
    const pr = User.create(updatedUsers);
    //pasamos la promesa pendiente al sieguiente then, esperando a que se creen los usuarios
    return pr;
  })
  .then(createdUsers => {
    console.log("Users have been created", createdUsers.length);
    const updatedItems = [];
    //iteramos sobre users y para cada user estamos actualizando y vinculando un item. El map devuelve un nuevo array de los items actualizados.
    createdUsers.forEach((user, i) => {
      const firstItemIndex = i * 2; //  0,  2,  4
      const secondItemIndex = i * 2 + 1; //  1,  3,  5
      const firstItem = items[firstItemIndex];
      const secondItem = items[secondItemIndex];
      firstItem.userId = user._id;
      secondItem.userId = user._id;
      updatedItems.push(firstItem, secondItem);
    });
    const pr = Item.create(updatedItems);
    return pr;
  })
  .then(createdItems => {
    console.log("items have been created", createdItems.length);
    const updateUserPromises = createdItems.map(item => {
      const userId = item.userId;
      return User.findByIdAndUpdate(userId, { $push: { myItems: item._id } });
    });
    const bigPromise = Promise.all(updateUserPromises);
    return bigPromise;
  })
  .then(updatedUsers => {
    mongoose.connection.close();
  });