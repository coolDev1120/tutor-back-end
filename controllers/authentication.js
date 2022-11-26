const jwt = require('jwt-simple');
const config = require('../config');
const { Op } = require("sequelize");
const db = require("../models");
const User1 = db.user;
const md5 = require('md5');

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
	const result = await User1.findOne({
		where: {
			[Op.and]: [
				{ email: req.body.email },
				{ password: md5(req.body.password) }
			]
		}
	});
	if (!result) {
		res.send({ flag: "nouser", error: "123213" });
	}
	else {
		res.send({ flag: "success", token: tokenForUser(result) });
	}
}

exports.signup = async function (req, res, next) {
	console.log(req.body);
	const email = req.body.email;
	const password = req.body.password;

	if (!email || !password) {
		return res.status(422).send({ error: 'You must provide email and password' });
	}


	const result = await User1.findOne({ where: { email: email } })
	if (result) {
		return res.status(422).send({ error: 'Email is in use' });
	}
	else {
		const user1 = {
			username: req.body.name,
			email: email,
			password: md5(password),
			agent: req.body.agent,
			gender: req.body.gender,
			phone: req.body.phone,
			country: req.body.country,
			role: 'user'
		}
		await User1.create(user1)
		res.json({ token: tokenForUser(user1) });
	}
}


