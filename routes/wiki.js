const express = require('express');
const router = express.Router();
const view = require('../views/index');
const { db, Page, User } = require('../models');

router.get('/', (req, res) => {
  res.send(view.layout(''));
});

router.post('/', async (req, res, next) => {
  const page = new Page({
    title: req.body.title,
    content: req.body.content,
  });

  try {
    await page.save();
    console.log(page);
    res.redirect('/');
  } catch (error) {
    next(error);
  }
});

router.get('/add', (req, res) => {
  res.send(view.addPage(''));
});

module.exports = router;
