const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyparser = require('body-parser');
const view = require('./views/index');
const { db } = require('./models');
//const router = require('../routes/routes');
const PORT = process.env.PORT || 3000;

db.authenticate().then(() => {
  console.log('connected to the database');
});
app.use(morgan('dev'));
app.use(bodyparser.urlencoded());
app.use(express.static('./public'));

app.get('/', (req, res) => {
  res.send(view.layout(''));
});

app.listen(PORT, console.log(`listening on post:${PORT}`));
