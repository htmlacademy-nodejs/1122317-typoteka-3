'use strict';

const express = require(`express`);

const DEFAULT_PORT = 8080;
const app = express();

const mainRoutes = require(`./routes/main-routes`);
const myRoutes = require(`./routes/my-routes`);
const articleRoutes = require(`./routes/article-routes`);

app.use(`/`, mainRoutes);
app.use(`/my`, myRoutes);
app.use(`/articles`, articleRoutes);

app.listen(DEFAULT_PORT);
