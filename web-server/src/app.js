const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();

// Define paths for Express config
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

// Setup handlers engine and view view location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);

// Setup static directory to serve
app.use(express.static(publicPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather app",
    name: "Abdallah Ragab",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About page",
    name: "Abdallah Ragab",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help page",
    name: "Abdallah Ragab",
  });
});

app.get("/weather", (req, res) => {
  res.send({
    forecast: "It is raining",
    location: "Egypt",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", { helpError: "help artice not found" });
});

app.get("*", (req, res) => {
  res.render("404", { error: "404 page not found" });
});

app.listen(3000, () => {
  console.log("App is running on port 3000");
});
