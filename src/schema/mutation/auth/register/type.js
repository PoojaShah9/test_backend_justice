/**
 * Module dependencies
 */
const { GraphQLObjectType, GraphQLBoolean } = require('graphql');

module.exports = new GraphQLObjectType({
	name: 'Register',
	fields: {
		status: {
			type: GraphQLBoolean,
		},
	},
});
