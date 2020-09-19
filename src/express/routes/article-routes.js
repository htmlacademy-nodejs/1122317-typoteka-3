'use strict';

const {Router} = require(`express`);

const articleRouter = new Router();

articleRouter.get(`/category/:id`, (req, res) => res.send(`/articles/category/:id`));
articleRouter.get(`/add`, (req, res) => res.send(`/articles/add`));
articleRouter.get(`/edit/:id`, (req, res) => res.send(`/articles/edit/:id`));
articleRouter.get(`/:id`, (req, res) => res.send(`/articles/:id`));

module.exports = articleRouter;
