const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const session = require('express-session');
const { appendFile } = require('fs');

require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Now listening on ${PORT}`));