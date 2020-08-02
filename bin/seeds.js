//vinculamos modelos y mongoose.
const mongoose = require('mongoose');
const Item = require('../models/item');
const User = require('../models/user');

const dbName = 'giftme';


const items = [
    {
    name: "La sombra del viento",
    userId: "",
    description: "Novel writen by Carlos Ruiz Zafónº",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQqNXXJEZxI4UJAy53wsp96ibdNjsMkooLp2RmpC72fmG6kHJ1C2y1O9V2d8dexw17-zuJsT-Q&usqp=CAc",
    category: "books",
    city: "Barcelona",
    requests: [],
  },
  {
    name: "trousers",
    userId: "",
    description: "100% cotton fabric",
    image: "https://agnesb-agnesb-com-storage.omn.proximis.com/Imagestorage/imagesSynchro/0/0/0a82767dab00426169ea376c94411d75219196fd_Y213US05_000_1.jpeg",
    category: "clothes",
    city: "Madrid",
    requests: [],
  },
  {
    name: "alarm clock",
    userId: "",
    description: "Loud alarm clock for people who are heavy sleepers, mild loss hearing even deaf.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRu1ZjT-WEyjzB433VrNpxdOHbxFHw5zQXMy7LfnbUd6atdPfE9Omov_z5OwQRJQm8Dey2W6ec&usqp=CAc",
    category: "devices",
    city: "Barcelona",
    requests: [],

  }]
  


const users = [
    {
    name: "Laura",
    email: "laura.rojas@gmail.com",
    password: "1234",
    description: "I love music",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80",
    myItems: [],
    acquireditems: [],
    favourites:[],
}, {
    name: "Robert",
    email: "robrobby@gmail.com",
    password: "12345",
    description: "I love the sea",
    image: "https://images.unsplash.com/photo-1541855492-581f618f69a0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    myItems: [],
    acquireditems: [],
    favourites:[],
}, {
    name: "Alejandro",
    email: "alejo@gmail.com",
    password: "12346",
    description: "I love Web Development",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80",
    myItems: [],
    acquireditems: [],
    favourites:[],
}];

mongoose.connect(`mongodb://localhost/${dbName}`, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    //creamos los usuarios
    const pr = User.create(users)
    //pasamos la promesa pendiente al sieguiente then, esperando a que se creen los usuarios
    return pr
})
.then((createdUsers)=> {
    console.log("Users have been created", createdUsers.length)
    //iteramos sobre users y para cada user estamos actualizando y vinculando un item. El map devuelve un nuevo array de los items actualizados.
   const updatedItems = createdUsers.map((user, i) => {
       console.log(items)
        const updatedItem = items[i]
         updatedItem.userId = user._id
        console.log(updatedItem)
        return updatedItem
    })

    const pr = Item.create(updatedItems)
    return pr

})
.then((createdItems)=>{
    console.log("items have been created", createdItems.length)

  const updateUserPromises = createdItems.map(item => {
        const userId = item.userId 
        return User.findByIdAndUpdate(userId, {$push:{myItems: item._id}})

    } )


    const bigPromise = Promise.all(updateUserPromises)
    return bigPromise

    

})
.then(updatedUsers => {
    mongoose.connection.close()


})


