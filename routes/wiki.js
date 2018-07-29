const express = require('express');
const router = express.Router();
const view = require('../views/index');
const { Page, User } = require('../models');

router.get('/', async (req, res, next) => {
  try {
    const pages = await Page.findAll();
    res.send(view.main(pages));
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const page = Page.build({
      title: req.body.title,
      content: req.body.content,
      status: req.body.status,
    });

    const [newUser, userCreated] = await User.findOrCreate({
      where: {
        name: req.body.author,
        email: req.body.email,
      },
    });

    await page.save();
    await page.setAuthor(newUser);

    res.redirect(`/wiki/${page.slug}`);
  } catch (error) {
    next(error);
  }
});

router.get('/add', (req, res, next) => {
  res.send(view.addPage(''));
});

router.get('/:slug', async (req, res, next) => {
  try {
    const author = await page.getAuthor();
    const page = await Page.findOne({
      where: { slug: req.params.slug },
    });

    res.send(view.wikiPage(page, author));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
