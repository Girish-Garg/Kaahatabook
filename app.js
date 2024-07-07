const express = require("express");
const fs = require("fs");
const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const date = new Date();
const year = date.getFullYear();
const month = ("0" + (date.getMonth()+1)).slice(-2);
const day = ("0" + date.getDate()).slice(-2);
const Today = `${day}-${month}-${year}`;

app.get("/", (req, res) => {
  fs.readdir("./files", (err, files) => {
    if (err) return res.send(err);
    res.render("index", { files });
  });
});

app.get("/create", (req, res) => {
  fs.writeFile(`./files/${Today}.txt`, "", (err) => {
    if (err) return res.send(err);
    res.render("create", { Today });
  });
});

app.get("/hisaab/:fn", (req, res) => {
  fs.readFile(`./files/${req.params.fn}`, "utf-8", (err, data) => {
    if (err) return res.send(err);
    res.render("view", { data, fn: req.params.fn });
  });
});

app.get("/edit/:fn", (req, res) => {
  fs.readFile(`./files/${req.params.fn}`, "utf-8", (err, data) => {
    if (err) return res.send(err);
    res.render("edit", { data, fn: req.params.fn });
  });
});

app.post("/update/:fn", (req, res) => {
  fs.writeFile(`./files/${req.params.fn}`, req.body.txt, (err) => {
    if (err) return res.send(err);
    res.redirect("/");
  });
});

app.get("/delete/:fn", (req, res) => {
  fs.unlink(`./files/${req.params.fn}`, (err) => {
    if (err) return res.send(err);
    res.redirect("/");
  });
});

app.listen(3000);
