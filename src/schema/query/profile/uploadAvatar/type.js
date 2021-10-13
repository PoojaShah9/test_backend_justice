/**
 * Module dependencies
 */
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList} = require('graphql');
const outputType = require('../../field.type');


module.exports = new GraphQLObjectType({
	name: 'uploadAvatar',
	fields: {
		entity_id: {
			type: GraphQLID,
		},
		type: {
			type: GraphQLString,
		},
		status: {
			type: GraphQLString,
		},
		values: { type:  GraphQLList(outputType) },

	},
});
