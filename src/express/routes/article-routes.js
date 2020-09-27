'use strict';

const {Router} = require(`express`);

const articleRouter = new Router();

articleRouter.get(`/category/:id`, (req, res) => res.render(`articles/articles-by-category`));
articleRouter.get(`/add`, (req, res) => res.render(`articles/new-post`));
// articleRouter.get(`/edit/:id`, (req, res) => res.send(`/articles/edit/:id`));
articleRouter.get(`/:id`, (req, res) => res.render(`articles/post`));

module.exports = articleRouter;
