# iBonfire

// Description here **

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

#### Wanna contribute on iBonfire?:

1. Fork the repo
2. Clone down to your local machine.
3. cd into the repo and open a terminal window
4. Run npm install
5. Open a terminal window and run ```webpack -w```
6. Open another terminal window and run ```nodemon server/server.js```
7. Open your browser and navigate to localhost:8080
8. Code!
9. Commit changes and make a pull request

### Front-end -- Sean**

#### Client-Side Application Structure
//Provide a brief explanation of file structure.

// Here is a brief example of an explanation of file structure:

  "Below is the folder client-side folder structure. All 'smart' components that have
  access to Redux state can be found in the containers folder. All other React class
  and functional components can be found in the components folder. 

  In the reducers folder, all reducers are combined in the index file and action specific
  cases can be found in the individual reducer files."

// Here you need to explain the file structure of the front end and change this diagram to reflect our current structure:

src
├── actions
│   └── index.js
│
├── components
│   ├── app.js
│   ├── appDrawer.js
│   ├── appHeader.js
│   ├── foodItemInput.js
│   ├── foodItemTable.js
│   ├── foodItemTableEntry.js
│   ├── icebox.js
│   ├── iceboxList.js
│   ├── iceboxListItem.js
│   ├── landing.js
│   ├── main.js
│   ├── photoUploader.js
│   ├── recipeListItem.js
│   ├── recipes.js
│   ├── recipeSuggestionListItem.js
│   ├── resolveItemTable.js
│   ├── resolveItemTableEntry.js
│   ├── settingsConfirm.js
│   └── settingsEntry.js
│
├── constants
│   ├── actions.js
│   └── sorts.js
│
├── containers
│   ├── iceboxToolbar.js
│   ├── recipeList.js
│   ├── recipeSuggestionList.js
│   ├── settings.js
│   ├── signin.js
│   ├── signup.js
│   └── visibleIceboxList.js
│
├── reducers
│   ├── authReducer.js
│   ├── iceboxReducer.js
│   ├── iceboxSearchReducer.js
│   ├── index.js
│   ├── loadingReducer.js
│   ├── profileReducer.js
│   ├── recipesReducer.js
│   ├── sortByReducer.js
│   ├── sortOrderReducer.js
│   └── userReducer.js
│
├── state
│   ├── configureStore.js
│   └── localStorage.js
│
├── styles
│   ├── bootstrap.min.css
│   ├── icons.js
│   └── style.css
│
└── index.js

### Design -- Dailen**
// Breif explanation of design decisions.

### Front-End Styles -- Dailen**
// No need for a description just udate the structure to reflect our current syle structure

styles
├── assets
│   └── fonts
│   |   ├── gyparody.woff
│   |   ├── gyparody.woff2
│   |   ├── Korinna_Bold_BT.ttf
│   |   ├── Korinna_Bold_BT.woff
│   |   ├── Korinna_Bold_BT.woff2
│   |   ├── Swiss_911_Compressed.ttf
│   |   ├── Swiss_911_Compressed.woff
│   |   ├── Swiss_911_Compressed.woff2
│   |   ├── Swiss_911_Extra_Compressed.woff
│   |   └── Swiss_911_Extra_Compressed.woff2
│   |
|   ├── chris.jpg
|   ├── custom_pointer.png
|   ├── gameboard_background.gif
|   ├── logo.png
|   ├── lukas.jpg
|   ├── neon_cursor.png
|   ├── peter.jpg
|   └── user-gameplay_bckground.jpg
├── tech_logos
│   ├── aws.png
│   ├── casper.png
│   ├── chai.png
│   ├── express.png
│   ├── github.png
│   ├── github_glossy.png
│   ├── linkedin.png
│   ├── linkedin_glossy.png
│   ├── mocha.png
│   ├── mongodb.png
│   ├── nodejs.png
│   ├── phantomjs.png
│   ├── react.png
│   ├── redux.png
│   ├── socket.png
│   └── webpack.png
|
├── animate.css
├── favicon.ico
├── game_buzz.wav
├── scrape.json
└── style.css

### Back-End -- Ryan**

server
├── controllers
|   ├── createsession.js
|   ├── checksession.js
|   ├── closesession.js
|   └── verifycode.js
├── models
|   └── session.js
├── router.js
├── sendgrid.js
├── server.js
└── sockets_server.js

#### Server -- Ryan**
// Description of server setup and techs used

#### REST/CRUD Outline:
//Example:

GET:

* /icebox (fetches all icebox contents)

POST:

* /icebox/add (adds items to icebox)

PUT:

* /icebox/item:id (update specific items from icebox)

DELETE:

* /icebox/item:id (remove specific items from icebox)

#### Database -- Ryan**
// Description of db and tech stack used

#### Sockets -- Mike**
// Description of use of sockets

### The Developers

* [Ryan Morris](https://github.com/SPCMorris)
// Fill in your names and github here