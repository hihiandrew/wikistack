const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const bodyparser = require('body-parser');
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/user');
const { db } = require('./models');
const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(bodyparser.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/wiki', wikiRouter);
app.use('/users', userRouter);
app.use('/', (req, res) => {
  res.redirect('/wiki');
});

//Promises
db.sync({ force: true }).then(() => {
  console.log('Database created');
  //Listening to port
  app.listen(PORT, () => {
    console.log(`listening on post:${PORT}`);
  });
});
