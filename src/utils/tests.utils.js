/**
 * Module dependencies
 */
const express = require('express');
const passport = require('passport');
/**
 * internal strategies
 */
const { bearerStrategyHandler } = require('../strategies/bearer.strategy');
/**
 * middleware
 */
const authMiddleware = require('../middleware/authenticate.middleware');

module.exports.express = express;

module.exports.expressWithPassport = () => {
	const app = module.exports.express();
	// passport init
	passport.use(bearerStrategyHandler());
	app.use(passport.initialize());
	app.use(authMiddleware);
	return app;
};
