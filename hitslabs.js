//Initialize required modules
var express = require("express");
var exphbs = require("express-handlebars")({
    extname: ".hbs",
    defaultLayout: "main.hbs",
    layoutsDir: "views/layouts",
    partialsDir: "views/partials",
    helpers: {
        section: function(name, options) {
            if (!this.sections) { this.sections = {}; }
            this.sections[name] = options.fn(this);
            return null;
        }
    }
});

//Create and configure our Express app
var app = express();
app.engine("hbs", exphbs);
app.set("view engine", "hbs");
app.disable("x-powered-by");

//Set up our statically served files
app.use("/",express.static(__dirname + "/public"));

//Root home path
app.get("/", function(req, res) {
    res.render("home.hbs");
});

//About path
app.get("/about", function(req, res) {
    res.render("about.hbs");
});

//Doctor Search path
app.get("/Search", function(req, res) {
    res.render("search.hbs");
});

//User Login path
app.get("/login", function(req, res) {
    res.render("login.hbs");
});

//Contact path
app.get("/contact", function(req, res) {
	res.render("contact.hbs");
});

//404 page not found handler
app.use(function(req, res) {
    res.status(404);
    res.render("error/404.hbs");
});

//500 server error handler
app.use(function(err, req, res) {
    console.error(err.stack);
    res.status(500);
    res.render("error/500.hbs");
});

//Begin listening on specified port...
app.set("port", 3000);
console.log("Server is listening on port " + app.get("port"));
app.listen(app.get("port"));

