module.exports.Login = {
	attempt: () => new Error('Email or password is incorrect.'),
};
module.exports.Reset = {
	expired: () => new Error('Token has been expired.'),
};
module.exports.Auth = {
	init: method => new Error(`[${method}] is an abstract method.`),
	unauthorized: () => new Error('Unauthorized.'),
	unknownUser: email => new Error(`Unknown user [${email}]`),
	forbidden: () => new Error('Forbidden.'),
};
