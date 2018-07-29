const express = require('express');
const router = express.Router();
const view = require('../views/index');
const { Page, User } = require('../models');

router.get('/', async (req, res, next) => {
  try {
    const allUsers = await User.findAll();
    res.send(view.userList(allUsers));
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    const pages = await Page.findAll({
      where: { authorId: req.params.id },
    });

    res.send(view.userPages(user, pages));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
