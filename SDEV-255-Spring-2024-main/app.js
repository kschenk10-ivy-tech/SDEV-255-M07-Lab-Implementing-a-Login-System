const express = require("express");
const morgan = require("morgan");
// express app
const app = express();


// register view engine
app.set('view engine', 'ejs');
// Middleware to log request details
app.use((req, res, next) => {
  console.log("New request made:");
  console.log("Host:", req.hostname);
  console.log("Path:", req.path);
  console.log("Method:", req.method);
  next();
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

app.use(morgan('dev'));


app.get("/", (req, res) => {
  const blogs = [
    { title: "Yposhi finds eggs", snippet: "Lorem Ipsum" },
    { title: "Yposhi finds stars", snippet: "Lorem Ipsum" },
  ];
  res.sendFile("index.html", { root: "./views" }); // Updated path
});

app.get("/about", (req, res) => {
  res.sendFile("about.html", { root: "./views" }); // Updated path
});

// Redirects
app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

// 404 page
app.use((req, res) => {
  res.status(404).sendFile("404.html", { root: "./views" }); // Updated path
});