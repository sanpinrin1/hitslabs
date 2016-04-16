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
var route = express.Router();
var searchService = require("./lib/searchNPI");

//Create and configure our Express app
var app = express();
app.engine("hbs", exphbs);
app.set("view engine", "hbs");
app.disable("x-powered-by");

//Set up our statically served files
app.use("/",express.static(__dirname + "/public"));

//Root home path
app.get("/", function(req, res) {
    res.render("home.hbs", {
        home: 'class="current"',
    });
});

//About path
app.get("/about", function(req, res) {
    res.render("about.hbs", {
        about: 'class="current"',
    });
});

//Doctor Search path
app.get("/Search", function(req, res) {
    res.render("search.hbs", {
        search: 'class="current"',
    });
});

//User Login path
app.get("/login", function(req, res) {
    res.render("login.hbs", {
        login: 'class="current"',
    });
    console.log(req.body);
});

//Contact path
app.get("/contact", function(req, res) {
	res.render("contact.hbs", {
        contact: 'class="current"',
    });
});

// Web service providing NPI database search
app.get("/searchNPI", searchService);

//404 page not found handler
app.use(function(err, req, res, next) {
    res.status(404);
    res.render("error/404.hbs");
});

//500 server error handler
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(err.status || 500);
    res.render("error/500.hbs");
});

//Begin listening on specified port...
app.set("port", 3000);
console.log("Server is listening on port " + app.get("port"));
app.listen(app.get("port"));

