const { GraphQLObjectType, GraphQLString } = require('graphql');

const fieldType = new GraphQLObjectType({
	name: 'fieldType',
	fields: {
		key: { type: GraphQLString },
		value: { type: GraphQLString },
	},
});

module.exports = fieldType;
