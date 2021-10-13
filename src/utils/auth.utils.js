/**
 * Exceptions
 */
const { Auth } = require('../exceptions/auth.exception');

module.exports.checkAuth = contex => {
	if (contex.user && contex.user._id) return true;

	throw Auth.unauthorized();
};
