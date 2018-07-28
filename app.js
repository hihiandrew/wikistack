const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const bodyparser = require('body-parser');
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/user');
const { db, Page, User } = require('./models');
//const router = require('../routes/routes');
const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(bodyparser.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/wiki', wikiRouter);
app.use('/', (req, res) => {
  res.redirect('/wiki');
});

const init = () => {
  //Promises
  User.sync({ force: true }).then(() => {
    console.log('User table complete');
  });
  Page.sync({ force: true }).then(() => {
    console.log('Page table complete');
  });

  //Async/Await
  // need async before function.
  // await User.sync({ force: true });
  // await Page.sync({ force: true });

  //Listening to port
  app.listen(PORT, () => {
    console.log(`listening on post:${PORT}`);
  });
};

init();
