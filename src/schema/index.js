/**
 * Module dependencies
 */
const { GraphQLSchema } = require('graphql');

module.exports = new GraphQLSchema({
	query: require('./query'),
	mutation: require('./mutation'),
});
