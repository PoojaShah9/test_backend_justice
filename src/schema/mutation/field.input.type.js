const { GraphQLInputObjectType, GraphQLString } = require('graphql');

const fieldType = new GraphQLInputObjectType({
	name: 'fieldInputType',
	fields: {
		key: { type: GraphQLString },
		value: { type: GraphQLString },
	},
});

module.exports = fieldType;
