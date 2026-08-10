const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();


const healthRouter = require("./routes/health.routes.js");
const infoRouter = require("./routes/info.routes.js");
const authRouter = require("./routes/auth.routes");
const userRouter = require("./routes/user.routes");
const organizationRouter = require("./routes/organization.routes");

const notFound = require("./middlewares/notFound.middleware.js");
const errorHandler = require("./middlewares/error.middleware.js");

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/health" , healthRouter);
app.use("/api/v1/info" , infoRouter);
app.use("/api/v1/auth" , authRouter);
app.use("/api/v1/users" , userRouter);
app.use("/uploads" , express.static( path.join(__dirname , "uploads")));
app.use("/api/v1/organizations" , organizationRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;