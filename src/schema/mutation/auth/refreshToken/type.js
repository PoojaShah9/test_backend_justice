/**
 * Module dependencies
 */
const { GraphQLObjectType, GraphQLString } = require('graphql');

module.exports = new GraphQLObjectType({
	name: 'RefreshToken',
	fields: {
		access_token: {
			type: GraphQLString,
		},
		refresh_token: {
			type: GraphQLString,
		},
	},
});
