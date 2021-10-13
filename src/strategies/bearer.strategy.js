/**
 * external libs
 */
const jwt = require('jsonwebtoken');
const config = require('jsconfig');

/**
 * internal models
 */
const Identification = require('../db/models/modifiers/identification.model');

/**
 * internal utils
 */
const { Auth } = require('../exceptions/auth.exception');
const { parseAuthorizationHeader } = require('../utils/parse.utils');

/**
 * internal strategies
 */
const AbstractStrategy = require('./strategy');

const logger = console;

const AUTH_HEADER = 'authorization';
const HEADER_AUTH_SCHEME = 'bearer';

class BearerStrategy extends AbstractStrategy {
	get name() {
		return HEADER_AUTH_SCHEME;
	}

	authenticate(req) {
		const authHeader = req.headers[AUTH_HEADER];

		if (!authHeader) {
			return this.success({});
		}

		const { scheme, value } = parseAuthorizationHeader(authHeader) || {};

		if (!scheme || !value) {
			return this.success({});
		}

		const verified = (err, user, info) => {
			if (err) {
				return this.success({});
			}

			if (!user) {
				return this.fail(info);
			}

			return this.success(user, info);
		};

		try {
			if (this._includeReq) {
				return this._verify(req, value, verified);
			}

			return this._verify(value, verified);
		} catch (e) {
			return this.success({});
		}
	}
}

const bearerStrategyHandler = () =>
	new BearerStrategy({ includeRequest: true }, async (req, token, next) => {
		logger.debug(req.id, 'BearerStrategy::bearerStrategyHandler processing');
		logger.info(req.id, 'BearerStrategy::bearerStrategyHandler token:', token);

		try {
			const { email } = jwt.verify(token, config.env.appKey);
			const identification = await Identification.findOne({ email });

			if (Boolean(identification) === false) {
				throw Auth.unknownUser(email);
			}

			logger.debug(req.id, 'BearerStrategy::bearerStrategyHandler has been processed with success status');
			next(null, identification);
		} catch (e) {
			logger.error(req.id, 'BearerStrategy::bearerStrategyHandler error message', e.toString());
			logger.debug(req.id, 'BearerStrategy::bearerStrategyHandler has been processed with fail status');
			next(Auth.unauthorized(), false);
		}
	});

exports.BearerStrategy = BearerStrategy;
exports.bearerStrategyHandler = bearerStrategyHandler;
