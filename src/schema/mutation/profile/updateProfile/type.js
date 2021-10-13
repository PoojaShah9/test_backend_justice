/**
 * Module dependencies
 */
const { GraphQLObjectType, GraphQLBoolean } = require('graphql');

module.exports = new GraphQLObjectType({
	name: 'UpdateProfile',
	fields: {
		status: {
			type: GraphQLBoolean,
		},
	},
});
