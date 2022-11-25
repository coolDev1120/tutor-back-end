const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');
const getDate = require('../component/date')

// sql
const db = require("../models");
const User1 = db.user;

function tokenForUser(user) {
	const timestamp = new Date().getTime();
	return jwt.encode({
		id: user.id,
		name: user.username,
		email: user.email,
		image: user.image,
		agent: user.agent,
		gender: user.gender,
		sub: user.id,
		iat: timestamp,
		role: user.role
	}, config.secret);
}

exports.signin = async function (req, res, next) {
	// User has been authenticated, send back token

	// User.findOne({ email: req.user.email }, function (err, result) {
	// 	res.send({ token: tokenForUser(result) });
	// });
	const result = await User1.findOne({ where: { email: req.user.email } });
	if (!result) {
		res.send({ flag: "nouser", error: "123213" });
	}
	else {
		res.send({ flag: "success", token: tokenForUser(result) });
	}
}

exports.signup = function (req, res, next) {
	console.log(req.body);
	const email = req.body.email;
	const password = req.body.password;

	if (!email || !password) {
		return res.status(422).send({ error: 'You must provide email and password' });
	}

	// See if a user with the given email exists
	User.findOne({ email: email }, function (err, existingUser) {
		if (err) { return next(err); }

		// If a user with email does exist, return an error
		if (existingUser) {
			return res.status(422).send({ error: 'Email is in use' });
		}

		// SQL sign up
		const user1 = {
			username: req.body.name,
			email: email,
			password: password,
			agent: req.body.agent,
			gender: req.body.gender,
			phone: req.body.phone,
			country: req.body.country,
			role: 'user'
		}
		User1.create(user1)

		// If a user with email does NOT exist, create and save user record
		const user = new User({
			username: req.body.name,
			email: email,
			password: password,
			agent: req.body.agent,
			gender: req.body.gender,
			phone: req.body.phone,
			country: req.body.country,
			role: 'user',
			createdAt: new Date()
		});

		user.save(function (err) {
			if (err) { return next(err); }

			// Repond to request indicating the user was created
			res.json({ token: tokenForUser(user) });
		});



	});
}

exports.admin_activation = function (req, res, next) {
	const email = req.body.email;
	const password = req.body.password;

	if (!email || !password) {
		return res.status(422).send({ error: 'You must provide email and password' });
	}

	// See if an user with the given email exists
	User.findOne({ email: email }, function (err, existingUser) {
		if (err) { return next(err); }

		// If an user with email does exist, return an error
		if (existingUser) {
			return res.status(422).send({ error: 'Email is in use' });
		}

		// If a user with email does NOT exist, create and save record for admin
		const user = new User({
			email: email,
			password: password,
			role: 'admin'
		});

		user.save(function (err) {
			if (err) { return next(err); }

			// Repond to request indicating the admin was created
			res.json({});
		});
	});
}

