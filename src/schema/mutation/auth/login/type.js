/**
 * Module dependencies
 */
const { GraphQLObjectType, GraphQLString } = require('graphql');

module.exports = new GraphQLObjectType({
	name: 'Login',
	fields: {
		token_type: {
			type: GraphQLString,
		},
		access_token: {
			type: GraphQLString,
		},
		refresh_token: {
			type: GraphQLString,
		},
	},
});
