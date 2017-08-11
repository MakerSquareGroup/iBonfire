# iBonfire

iBonfire was designed as an easy way for individuals to interact with other users in a specific area. The word bonfire denotes a relaxing social gathering, or as Wikipedia puts it, "part of a celebration", which is what we strove to convey in this application.

iBonfire can be used as a tool to meet new, like-minded people, plan events and meetups while traveling, or locally, or even just to chat with strangers. The world is waiting, light a bonfire!

### Developer Documentation

#### Tools Used:

* [React](https://facebook.github.io/react/)
* [React-Redux](https://github.com/reactjs/redux)
* [Webpack](https://webpack.github.io/)
* [Babel](https://babeljs.io/)
* [React-Router](https://github.com/rackt/react-router)
* [Node](https://nodejs.org/en/)
* [Express](http://expressjs.com/)
* [MySQL](https://www.mysql.com/)
* [Knex](http://knexjs.org/)
* [Material-UI](http://www.material-ui.com/#/)
* [Travis-CI](https://travis-ci.org/)
* [Socket.io](http://socket.io/)

#### Wanna contribute to iBonfire?

1. Fork the repo
2. Clone down to your local machine.
3. cd into the repo and open a terminal window
4. Run npm install
5. If on Mac or other linux/unix-based system, run ```npm run dev``` and skip steps 6 and 7.
6. Open a terminal window and run ```webpack -w```
7. Open another terminal window and run ```nodemon server/server.js```
7. Open your browser and navigate to localhost:8080
8. Code!
9. Commit changes and make a pull request

### Front-end
The front-end structure/skeleton was implemented using React and Redux. Other core modules include React-Google-Maps for the main map view and socket.io-client for client-side handling of live chat. Each React component is modularized and the existing infrastructure can easily be expanded upon without impacting the core functionality of iBonfire.

Client-side navigation is seamlessly handled using React-Router, with the chats route able to handle parameters in the URL. 

Redux-Thunk is used to handle async action creators.

Much of the styling involves at least some Material-UI, but there's also custom CSS for nearly every file.

#### Client-Side Application Structure
Below is the client-side folder structure of iBonfire. All components have access to at least some part of Redux state, so we elected not to have a separate containers folder. 

We initially set out to have one actions file, but soon realized that this would be unwieldy and hard to follow, so actions were split into four separate files, referencing the specific area of the app that they are pertinent to. 

In the reducers folder, all reducers are combined in the index file.

    src
    ├── actions
    │   ├── chats.js
    │   ├── drawer.js
    │   ├── index.js
    │   └── profile.js
    │
    ├── components
    │   ├── auth
    │   │  └── InitFB.js
    │   ├── ProfilePage
    │   │  ├─ ProfilePage.js
    │   │  ├- ProfilePageBonfire.js
    │   │  └─ ProfilePageBonfirePopup.js
    │   ├── About.js
    │   ├── App.js
    │   ├── BonfieDrawer.js
    │   ├── BonfireModal.js
    │   ├── ChatList.js
    │   ├── ChatPage.js
    │   ├── FBLogin.js
    │   ├── Home.js
    │   ├── MarkerModal.js
    │   ├── Navigation.js
    │   ├── TeamList.js
    │   └── TutorialCarousel.js
    │
    ├── helpers
    │   └── fbHelper.js
    │
    ├── auth
    │   └── InitFB.js
    │
    ├── reducers
    │   ├── bonfireReducer.js
    │   ├── changeClassReducer.js
    │   ├── chatReducer.js
    │   ├── convertCoordsReducer.js
    │   ├── convertLocationReducer.js
    │   ├── currentMarkerReducer.js
    │   ├── facebookReducer.js
    │   ├── hoverMarkerReducer.js
    │   ├── imageReducer.js
    │   ├── index.js
    │   ├── locationReducer.js
    │   ├── markerReducer.js
    │   ├── profileReducer.js
    │   ├── searchUserInputReducer.js
    │   ├── showDrawerReducer.js
    │   └── userReducer.js
    │
    ├── styles
    │   ├── animation.css
    │   ├── bonfireModal.css
    │   ├── buttonMenu.css
    │   ├── cardStyles.css
    │   ├── chat.css
    │   ├── home.css
    │   ├── login.css
    │   ├── markerModal.css
    │   ├── navigation.css
    │   ├── one-page-wonder.css
    │   ├── profilepage.css
    │   ├── searchbar.css
    │   └── TeamList.css
    │
    ├── index.html
    └── index.js

### Back-End 

    server
    ├── controllers
    |   ├── bonfireCtrl.js
    |   ├── chatCtrl.js
    |   ├── user_bonfireCtrl.js
    |   └── userCtrl.js
    ├── db
    |   └── db.js
    ├── helpers
    |   └── ctrl_helpers.js  
    ├── models
    |   |── bonfireModel.js
    |   |── ChatModel.js
    |   |── user_bonfireModel.js
    |   └── userModel.js
    ├── routes.js
    |   |── bonfireRoutes.js
    |   |── ChatRoutes.js
    |   |── user_bonfireRoutes.js
    |   └── userRoutes.js
    ├── sockets
    |   └── socketHelpers.js
    └── server.js


#### Server
The server was created using Node/Express and follows a modular design pattern for ease of scalability and flow control. Various middleware is used with Express for security concerns and socket helpers have been abstracted to handle socket operations. 

#### REST/CRUD Outline:

Route: /bonfire:
GET: 

* / (Fetches all bonfires)
* /users_bonfires/:bonfireId (Fetches all of the users associated with the passed in bonfire id)
* /:bonfire_specs (Specs can either be a bonfire id or a lat & long coordinate. Returns a bonfire if it exists)

POST:

* / (Creates a bonfire with the passed in params)

DELETE:

* /:bonfire_specs (Removes a bonfire and deletes the chat and messages associated with it)

Route: /bonfire/join_bonfire:

GET: 

* /:passed_ids (Fetches all joined bonfires of a user)
* /get_all_users/:bonfire_id (Fetches all users of the passed in bonfire)

PUT:

* /:passed_ids (Used when a user joins a bonfire)

Route: /chat:
GET: 

* /:bonfire_id (Fetches all messages of that bonfire)

POST:

* /:bonfire_id (Creates a message)

Route: /user:
GET: 

* / (Fetches all users)
* /:user_specs (Specs can either beuserbonfire if it exists)

POST:

* / (Creates a user with passed in params)

PUT:

* /:user_specs (Update a users bio)

DELETE:

* /:user_specs (Removes user)

#### Database -- Ryan**
We used MySQL with Knex for our database. MySQL was used because of its ease of use and scalabilty which would allow us to handle more data efficently. Knex is a well documented and easy to use query builder that can be used with many different types of SQL. We also used Knex because of it's promisified feature which allows greater control over async operations.

#### Sockets -- Mike/Sean**
We used web sockets, specifically socket.io, to implement server-side chat handling. The setup we're using is designed to handle multiple chat rooms and switching between rooms on the fly. Sockets are instantiated on server load, and there are methods to join chat, leave chat, and broadcast messages to specific rooms (bonfires).

### The Developers

* [Ryan Morris](https://github.com/SPCMorris)
* [Sean Lester](https://github.com/SeanML)
