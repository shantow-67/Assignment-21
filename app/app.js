const express = require("express");
const app = express();
const middleware = require("./middleware");
const errorHandler = require("./errorHandler");
const notFoundHandler = require("./notFoundHandler");
const routes = require("../src/routes");

// middleware implement
app.use(middleware);

app.use(express.static("../public"));

// routing setup
app.use(routes);

// notFoundHandler
app.use("*", notFoundHandler);

// default error handler middleware
app.use(errorHandler);

module.exports = app;
