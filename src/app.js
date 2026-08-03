const express = require("express");
const app = express();

const healthRouter = require("./routes/health.routes.js");
const infoRouter = require("./routes/info.routes.js");
const authRouter = require("./routes/auth.routes");

const notFound = require("./middlewares/notFound.middleware.js");
const errorHandler = require("./middlewares/error.middleware.js");

app.use(express.json());

app.use("/api/v1/health" , healthRouter);
app.use("/api/v1/info" , infoRouter);
app.use("/api/v1/auth" , authRouter);

app.use

app.use(notFound);
app.use(errorHandler);

module.exports = app;