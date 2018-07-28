const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false,
});

const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  status: {
    type: Sequelize.ENUM('open', 'closed'),
  },
});

function generateSlug(title) {
  //removes non-alphanumeric characters
  //makes whitespace underscores
  return title.replace(/\s+/g, '_').replace(/\W/g, '');
}

Page.beforeValidate((page, options) => {
  page.slug = generateSlug(page.title);
});

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
});

//deadlock
// Page.belongsTo(User);
// User.hasMany(Page);

module.exports = {
  db,
  Page,
  User,
  generateSlug,
};
