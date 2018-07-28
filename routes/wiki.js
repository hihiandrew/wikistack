const express = require('express');
const router = express.Router();
const view = require('../views/index');
const { db, Page, User } = require('../models');

router.get('/', async (req, res) => {
  try {
    const pages = await Page.findAll();
    if (pages.length > 0) {
      pages.forEach(page => console.log(page.dataValues.slug));
    }
    res.send(view.main(pages));
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  const page = new Page({
    title: req.body.title,
    content: req.body.content,
  });

  try {
    await page.save();
    console.log(page);
    res.redirect(`/wiki/${page.slug}`);
  } catch (error) {
    next(error);
  }
});

router.get('/add', (req, res) => {
  res.send(view.addPage(''));
});

router.get('/:slug', async (req, res) => {
  try {
    const page = await Page.findOne({
      where: { slug: req.params.slug },
    });
    res.send(view.wikiPage(page));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
