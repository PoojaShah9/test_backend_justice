const graphql = require('graphql');

const { GraphQLObjectType } = graphql;

module.exports = new GraphQLObjectType({
	name: 'Query',
	fields: {
		hello: require('./hello'),
		uploadAvatar: require('./profile/uploadAvatar'),
		// uploadBackground: require('./profile/uploadBackground'),
		me: require('./profile/me'),
	},
});
