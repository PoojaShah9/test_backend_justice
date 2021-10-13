/**
 * Module dependencies
 */
const { GraphQLObjectType, GraphQLBoolean } = require('graphql');

module.exports = new GraphQLObjectType({
	name: 'Reset',
	fields: {
		status: {
			type: GraphQLBoolean,
		},
	},
});
