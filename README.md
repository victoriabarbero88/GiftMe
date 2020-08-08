<img src="../images/readme" style="zoom:150%;" />



# GiftMe! 🎁

## Description

What can you do with all the stuff that you don't use anymore? 

Don't throw them away!

We have the solution for you right here, our APP (name).

With APP (name) you will acces to a huge social web of people like you, where you'll be able to share all the things that you don't need anymore and find some others that maybe you need!

And all for free! 

We want to avoid the idea of single use items promoted in current societies by reinforcing the practice of sharing and helping each other.

With APP(name) we contribute to the 3R's (Reduce, Reuse and Recicle) to make our planet a better place to live 🌍 

Be smart! don't throw your stuff! Give them a second life! ♻️



## User Stories

- **Start page / login ** - As a user I want to be able to access the homepage so that I see what the app is about and login, in order to get full access to the content of the different sections and also access to my profile.

- **Sign up** - As a user I want to sign up on the webpage so that I can create my account.

- **Logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account.

- **Profile** - As a user, after I login in the app, I can access to my profile where I can edit my personal information and the list of my offered items.

- **Dashboard** - It allows to see all the Items offered by all the users (in the dashboard).

- **Items details** - As a user I want to see the details of any selected items so I can decided wheter I want to make a request to the owner or not.

- **Request**: As a user, I can make a request of items offered by other users.

- **Create Items** - As a user I can create new items and add them to the webpage list so others users could make a request.

- **Update Items** - As a user I can create new items and add them to the webpage list so others users could make a request.

- **Delete Items** - Any user can erase items form their personal list but they are not allowed to erase items from other´s users list.

- **Other users**: As a user, I can see other users profile and list of items.

  

## Backlog

List of other features outside of the MVPs scope

- Add a button to create a favourite list of items in the current profile.
- Add a search bar to filter items by category, cities, etc.
- Add comunication features between users (ex.: messages).



## ROUTES:



| Method |             Route             |                         Description                          |               Request -Body                |
| :----: | :---------------------------: | :----------------------------------------------------------: | :----------------------------------------: |
| `GET`  |            /first             |     Renders `first` view if the user to login or signup      |                                            |
| `GET`  |           `/login`            |                  Renders `login` form view.                  |                                            |
| `POST` |           `/login`            |             Sends Login form data to the server              |             {email, password}              |
| `GET`  |           `/signup`           |                 Renders `signup` form view.                  |                                            |
| `POST` |           `/signup`           | Sends Sign Up info to the server and creates user in the DB. |             {email, password}              |
| `GET`  |         /private/home         |            Private route. Renders the `home` view            |                                            |
| `GET`  |    `/private/marketplace`     |        Private route. Renders the `marketplace` view         |                                            |
| `GET`  |      `/private/item/:id`      |        Private route. Renders the `item-details` view        |                                            |
| `GET`  |  `/private/item/:id/request`  |          Private route. Renders the `request` view           |                                            |
| `POST` |      /private/`request`       | Private route. Sends Request info to the server and connects with other userid |            {delivery, message}             |
| `GET`  |     `/private/user/:id/`      | Private route. Renders the view of `other-user` profile using id |                                            |
| `GET`  |      `/private/profile`       |          Private route. Renders the  `profile` view          |                                            |
| `POST` |   `/private/profile/update`   |   Private route. Sends updated profile info to the server    |         {name, image, description}         |
| `GET`  |    `/private/myitems/:id`     | Private route. Renders the view of  `my items` (current profile) |                                            |
| `POST` |   `/private/myitems/create`   | Private route. Sends info about the created item to the server | {name, description, image, category, city} |
| `POST` |   `/private/myitems/update`   | Private route. Sends info about the updated item to the server | {name, description, image, category, city} |
| `POST` | `/private/myitems/delete/:id` |     Private route. Rerender the user's items list again      |                                            |
| `POST` |       `/private/logout`       | Private route. Once logged out, redirect to login/signup page |                                            |



## Models

User model

```js

  {
    name: String,
    email: String,
    password: String,
    description: String,
    image: { type: String ,default: ""},
    myitems: [{type: mongoose.Types.ObjectId, ref:"Item"}],
		acquireditems: [{type: mongoose.Types.ObjectId, ref:"Item"}],
    favourites:[{type: mongoose.Types.ObjectId, ref:"Item"}],
  }
 

```

Item model

```javascript

  {
    name: String,
    userId: {type: mongoose.Types.ObjectId, ref:"User"},
    description: String,
    requests: [{

        requester: {type: mongoose.Types.ObjectId, ref:"User"}, 
        delivery: {type: String, enum:["pickup", "send"]},

    }],
    image: { type: String ,default: ""},
    category: {type: String, enum:["books", "clothes", "devices"]},
    city: {type: String, enum:["Barcelona", "Madrid"]},
  }

```



## Links

### Trello

[Link to your trello board](https://trello.com/b/F59G8EX8/project-2) or picture of your physical board

### Git

The url to your repository and to your deployed project

[Repository Link](https://github.com/victoriabarbero88/GiftMe)

[Deploy Link](https://giftme-app.herokuapp.com/login)

### Slides

The url to your presentation slides

[Slides Link](https://docs.google.com/presentation/d/13jzFjhSwcnoVbMpXvSBurspYUTdlWSuYFoZNzPDpZk4/edit?usp=sharing)