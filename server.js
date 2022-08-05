const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/connection');
const routes = require('./controllers');

require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3001;

const hbs = exphbs.create();
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'public')));

// setup session
const sess = {
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 180000},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  };

app.use(session(sess));
app.use(routes);

// Connect to the database and sync sequelize models to the DB before starting the Express.js server
sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});