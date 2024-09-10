// Importing necessary modules and configurations
const routes = require('./controllers/api/index.js');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers.js');

const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { clog } = require('./utils/clog.js');

// Initializes express app
const app = express();
const PORT = process.env.PORT || 3001;

// Create Handlebars
const hbs = exphbs.create({ helpers });


const sess = {
    secret: 'this is a secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize,
    }),
  }; 
    
  // Register a custom Handlebars helper for formatting dates
  hbs.handlebars.registerHelper('last_updated', function(date) {
    return new Date(date).toLocaleDateString();
  });

  // Set up Handlebars as the view engine
  app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


app.use(clog);

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
// serves the routes to the server
app.use(routes);

// starts the server 
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on http://localhost:${PORT}`));
});