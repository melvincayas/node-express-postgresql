const express = require("express");
const app = express();
const db = require("./db");

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.render("index");
});

app.get("/signup", (req, res) => {
	res.render("signup");
});

app.post("/signup", (req, res) => {
	const { email, password } = req.body;

	res.redirect("/");
});

app.listen(5000, () => {
	console.log("Now listening on Port 5000!");
});
