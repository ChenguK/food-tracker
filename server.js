const express = require("express");
const morgan = require("morgan");
const session = require("express-session");
const passport = require("passport");
const methodOverride = require("method-override");
const port = process.env.PORT || 3000;

require("dotenv").config();

// create the Express app
const app = express();

// connect to the MongoDB with mongoose
require("./config/database");
require("./config/passport");

// require our routes
const indexRoutes = require("./routes/index");
const moodsRoutes = require("./routes/moods");
const commentRoutes = require("./routes/comments");

// view engine setup
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
// TODO Add session middleware here
app.use(session({
    secret: "SEIRRocks!",
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use("/", indexRoutes);
app.use("/", moodsRoutes);
app.use("/", commentRoutes);

app.listen(port, () => {
    console.log(`Express is listening on port:${port}`);
});