const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const db = require("./db");
const session = require("express-session");
const userRoutes = require("./routes/user");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(
	session({ secret: "codingnewbie", resave: false, saveUninitialized: true })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(
	new LocalStrategy(
		{ usernameField: "email" },
		async (email, password, done) => {
			try {
				const result = await db.query("SELECT * FROM users WHERE email = $1", [
					email,
				]);
				if (result.rows.length === 0) return done(null, false);

				const [foundUser] = result.rows;

				bcrypt.compare(password, foundUser.password, (err, result) => {
					if (err) return done(null, false);
					return done(null, foundUser);
				});
			} catch (err) {
				return done(null, false);
			}
		}
	)
);
passport.serializeUser((user, done) => {
	done(null, user.user_id);
});
passport.deserializeUser(async (id, done) => {
	try {
		const result = await db.query("SELECT * FROM users WHERE user_id = $1", [
			id,
		]);

		if (result.rows.length === 0) return done(null, false);

		const [foundUser] = result.rows;

		return done(null, foundUser);
	} catch (err) {
		done(null);
	}
});

app.use((req, res, next) => {
	res.locals.currentUser = req.user;
	next();
});

app.get("/", (req, res) => {
	res.render("index");
});

app.use("/", userRoutes);

app.use((err, req, res, next) => {
	console.log(err);
	res.render("error");
});

app.listen(5000, () => {
	console.log("Now listening on Port 5000!");
});
