/**
 * Module dependencies
 */
const { Strategy } = require('passport');
/**
 * Exceptions
 */
const { Auth } = require('../exceptions/auth.exception');

class AbstractStrategy extends Strategy {
	constructor(options = {}, verify) {
		super();

		switch (Boolean(options) && options.constructor) {
			case Function:
				this._verify = options;
				this._includeReq = false;

				break;
			case Object:
				this._verify = verify;
				this._includeReq = (options && options.includeRequest) || false;

				break;
			default:
				this._verify = verify;
				this._includeReq = false;
		}

		if (!this._verify) {
			throw new TypeError('Strategy requires a verify callback');
		}
	}

	get name() {
		throw Auth.init('name');
	}

	// eslint-disable-next-line no-unused-vars
	authenticate(req, options = {}) {
		throw Auth.init('authenticate');
	}
}

module.exports = AbstractStrategy;
