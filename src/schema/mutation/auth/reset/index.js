/**
 * Module dependencies
 */
const { GraphQLString } = require('graphql');
/**
 * Services
 */
// const AuthService = require('../../../../services/auth.service');
const ValidatorService = require('../../../../services/validator.service');
const RoleService = require('../../../../services/role.service');

const logger = console;

module.exports = {
	type: require('./type'),
	args: {
		token: { type: GraphQLString },
		password: { type: GraphQLString },
	},
	resolve: async (parent, args, context) => {
		logger.debug(context.id, 'Mutation::reset processing');

		// Check Permission
		// noinspection ES6RedundantAwait
		await RoleService.checkPermission('canResetPassword', args, context);

		try {
			const { token, password } = args;
			logger.info(context.id, 'Mutation::reset token:', token);

			const validator = new ValidatorService(args);
			await validator.required('token');
			await validator.required('password');

			// await AuthService.reset({ token, password });

			logger.debug(context.id, 'Mutation::reset has been processed with success status');
			return {
				status: true,
			};
		} catch (e) {
			logger.debug(context.id, 'Mutation::reset has been processed with fail status');
			logger.error(context.id, 'Mutation::reset error message:', e.toString());
			throw e;
		}
	},
};
