const graphql = require('graphql');

const RoleService = require('../../../services/role.service');

const logger = console;

const { GraphQLString } = graphql;

module.exports = {
	type: GraphQLString,
	resolve: async (parent, args, context) => {
		logger.debug(context.id, 'Query::fetch jurisdiction');

		// Check Permission
		// noinspection ES6RedundantAwait
		await RoleService.checkPermission('canHello', args, context);

		return 'world 2';
	},
};
