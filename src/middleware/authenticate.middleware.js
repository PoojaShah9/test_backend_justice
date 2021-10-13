/**
 * external libs
 */
const passport = require('passport');

/**
 * internal utils
 */
const { parseAuthorizationHeader } = require('../utils/parse.utils');

const SCHEMES = {
	BEARER: 'bearer',
	// API_KEY: 'api_key',
};

const OPTIONS = {
	[SCHEMES.BEARER]: {
		assignProperty: 'user',
	},
};

const defaultPassportParams = { session: false };

/**
 * This middleware authenticate by header another strategy.
 * parse authenticate scheme and token
 * if scheme or value was not be pass that return failed response
 * else chooses passport authenticate strategy by usage scheme
 *
 * @param {Object} req - express request instance
 * @param {Object} res - express response instance
 * @param {Function} next - express middleware handler
 * @return {Promise<void>}
 */
module.exports = (req, res, next) => {
	const { authorization } = req.headers;

	if (!authorization) {
		req.isAuth = false;
		return next();
	}

	const { scheme, value } = parseAuthorizationHeader(authorization) || {};

	if (!scheme || !value) {
		req.isAuth = false;
		return next();
	}

	const usageScheme = SCHEMES[scheme.toUpperCase()];

	if (Boolean(usageScheme) === false) {
		req.isAuth = false;
		return next();
	}

	return passport.authenticate(usageScheme, { ...defaultPassportParams, ...OPTIONS[usageScheme] })(req, res, next);
};
