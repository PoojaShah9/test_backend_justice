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
		refresh_token: { type: GraphQLString }
	},
	resolve: async (parent, args, context) => {
		logger.debug(context.id, 'Mutation:: RefreshToken processing');
		logger.debug(context.isAuth,'Authenticatoin');

		try {
			const { refresh_token } = args;
			logger.info(context.id, 'Mutation::refresh_token:', refresh_token);

			const validator = new ValidatorService(args);
			await validator.required('refresh_token');
			
			const response = await AuthService.refreshToken({ refresh_token });

			logger.debug(context.id, 'Mutation::refresh_token has been processed with success status');
			return response;
		} catch (e) {
			logger.debug(context.id, 'Mutation::refresh_token has been processed with fail status');
			logger.error(context.id, 'Mutation::refresh_token error message:', e.toString());
			throw e;
		}
	},
};
