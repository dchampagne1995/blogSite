//jshint esversion:6

//Requires
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

//Initializing posts array to hold all posts
const posts = [];

//Starting content
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

//enabling body parser
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

//providing retrieval for the home directory
app.get("/", function(req, res) {
  res.render("home", {
    homeContent: homeStartingContent,
    postings: posts
  });
});

//providing retrieval for the about page
app.get("/about", function(req, res) {
  res.render("about", {
    abContent: aboutContent
  });
});

//providing retrieval for the contact page
app.get("/contact", function(req, res) {
  res.render("contact", {
    contContent: contactContent
  });
});
//providing retrieval for the compose page
app.get("/compose", function(req, res) {
  res.render("compose", {});
});

app.post("/compose", function(req, res) {

  // Creating JS object for posts
  const post = {
    postTitle: req.body.newEntry,
    body: req.body.entryText
  }

  //add each post created to a posts array
  posts.push(post);
  res.redirect("/");

});

app.get("/posts/:pages", function(req, res) {
  let reqTitle = _.lowerCase(req.params.pages);

  //comparing url post title with those of the posts array
  for (let i = 0; i < posts.length; i++) {
    if (_.lowerCase(posts[i].postTitle) === reqTitle) {
      //If post is found, render a new page with only that post
      res.render("post", {
        directedTitle: reqTitle,
        directedBody: posts[i].body
      });
    } else {
      console.log("page not Found");
    }
  }
});
//establishing server connection, local host
app.listen(4000, function() {
  console.log("Server started on port 4000");
});
