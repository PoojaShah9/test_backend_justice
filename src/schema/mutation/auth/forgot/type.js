/**
 * Module dependencies
 */
const { GraphQLObjectType, GraphQLBoolean } = require('graphql');

module.exports = new GraphQLObjectType({
	name: 'Forgot',
	fields: {
		status: {
			type: GraphQLBoolean,
		},
	},
});
