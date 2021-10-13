/**
 * Module dependencies
 */
const { GraphQLObjectType } = require('graphql');

module.exports = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		login: require('./auth/login'),
		register: require('./auth/register'),
		forgot: require('./auth/forgot'),
		reset: require('./auth/reset'),
		refreshToken: require('./auth/refreshToken'),
		updateProfile: require('./profile/updateProfile'),
	},
});
