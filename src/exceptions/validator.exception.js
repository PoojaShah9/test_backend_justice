module.exports.Required = {
	check: field => new Error(`The ${field} field is required`),
};
module.exports.Email = {
	check: field => new Error(`The ${field} must be a valid email address`),
};
module.exports.Unique = {
	check: field => new Error(`The ${field} has already been taken.`),
};
module.exports.Exists = {
	check: field => new Error(`The selected ${field} is invalid.`),
};
module.exports.Model = {
	init: () => new Error('Invalid model'),
};
module.exports.Field = {
	init: () => new Error('Invalid field'),
};
