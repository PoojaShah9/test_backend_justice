/**
 * This module parses authorization header and returns scheme (strategy) and access token
 *
 * @param {string} hdrValue
 */
exports.parseAuthorizationHeader = hdrValue => {
	if (typeof hdrValue !== 'string') {
		return null;
	}

	const [origin, scheme, value] = hdrValue.match(/(\S+)\s+(\S+)/) || [];
	return scheme && value && { origin, scheme, value };
};
