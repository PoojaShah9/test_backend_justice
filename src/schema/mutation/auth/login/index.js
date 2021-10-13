/**
 * Module dependencies
 */
const { GraphQLString } = require('graphql');
/**
 * Services
 */
const AuthService = require('../../../../services/auth.service');
const ValidatorService = require('../../../../services/validator.service');

const logger = console;

module.exports = {
	type: require('./type'),
	args: {
		email: { type: GraphQLString },
		password: { type: GraphQLString },
	},
	resolve: async (parent, args, context) => {
		logger.debug(context.id, 'Mutation::login processing');

		try {
			const { email, password } = args;
			logger.info(context.id, 'Mutation::login email:', email);

			const validator = new ValidatorService(args);
			await validator.required('email');
			await validator.required('password');

			const response = await AuthService.login({ email, password });

			logger.debug(context.id, 'Mutation::login has been processed with success status');
			return response;
		} catch (e) {
			logger.debug(context.id, 'Mutation::login has been processed with fail status');
			logger.error(context.id, 'Mutation::login error message:', e.toString());
			throw e;
		}
	},
};
