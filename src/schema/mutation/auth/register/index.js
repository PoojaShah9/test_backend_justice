/**
 * Module dependencies
 */
const { GraphQLString, GraphQLList } = require('graphql');
/**
 * Services
 */
const AuthService = require('../../../../services/auth.service');
const RoleService = require('../../../../services/role.service');
// const PostService = require('../../../../services/post.service');
const ValidatorService = require('../../../../services/validator.service');
const IdentificationService = require('../../../../services/identification.service');
/**
 * Models
 */
const Identification = require('../../../../db/models/modifiers/identification.model');

const InputType = require('../../field.input.type');

const logger = console;

module.exports = {
	type: require('./type'),
	args: {
		email: { type: GraphQLString },
		password: { type: GraphQLString },
		vars: { type: new GraphQLList(InputType) },
	},
	resolve: async (parent, args, context) => {
		logger.debug(context.id, 'Mutation::register processing');

		// Check Permission
		// noinspection ES6RedundantAwait
		await RoleService.checkPermission('canRegister', args, context);

		try {
			const { email, password, vars } = args;
			logger.info(context.id, 'Mutation::register email:', email);

			const validator = new ValidatorService(args);
			await validator.required('email');
			await validator.email('email');
			await validator.unique(Identification, 'email');
			await validator.required('password');

			await AuthService.register({ email, password, vars });

			const identificationModel = await IdentificationService.getByEmail(email);

			// await PostService.create({
			// 	entity_id: identificationModel.entity_id,
			// 	type: 'event_register',
			// 	status: 'active',
			// 	values: [
			// 		{
			// 			key: 'description',
			// 			value: 'Joined the system',
			// 		},
			// 	],
			// });

			logger.debug(context.id, 'Mutation::register has been processed with success status');
			return {
				status: true,
			};
		} catch (e) {
			logger.debug(context.id, 'Mutation::register has been processed with fail status');
			logger.error(context.id, 'Mutation::register error message:', e.toString());
			throw e;
		}
	},
};
