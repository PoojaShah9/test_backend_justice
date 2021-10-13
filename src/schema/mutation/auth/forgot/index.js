/**
 * Module dependencies
 */
const { GraphQLString } = require('graphql');
/**
 * Services
 */
// const AuthService = require('../../../../services/auth.service');
const ValidatorService = require('../../../../services/validator.service');
/**
 * Models
 */
const Identification = require('../../../../db/models/modifiers/identification.model');
const RoleService = require('../../../../services/role.service');

const logger = console;

module.exports = {
	type: require('./type'),
	args: {
		email: { type: GraphQLString },
	},
	resolve: async (parent, args, context) => {
		logger.debug(context.id, 'Mutation::forgot processing');

		// Check Permission
		// noinspection ES6RedundantAwait
		await RoleService.checkPermission('canRestorePassword', args, context);

		try {
			const { email } = args;
			logger.info(context.id, 'Mutation::forgot email:', email);

			const validator = new ValidatorService(args);
			await validator.required('email');
			await validator.exists(Identification, 'email');

			// await AuthService.forgot({ email });

			logger.debug(context.id, 'Mutation::forgot has been processed with success status');
			return {
				status: true,
			};
		} catch (e) {
			logger.debug(context.id, 'Mutation::forgot has been processed with fail status');
			logger.error(context.id, 'Mutation::forgot error message:', e.toString());
			throw e;
		}
	},
};
