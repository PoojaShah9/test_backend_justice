/**
 * Module dependencies
 */
 const { GraphQLString } = require('graphql');
//  const { GraphQLString } = graphql;

 /**
  * Services
  */
 const { Auth } = require("../../../../exceptions/auth.exception");
 const ProfileService = require("../../../../services/profile.service");
 const ValidatorService = require('../../../../services/validator.service');
 const RoleService = require('../../../../services/role.service');
 
 const logger = console;
 
 module.exports = {
	 type: GraphQLString,
	//  args: {
	// 	file: Upload!
	// },

	 resolve: async (parent, args, context , { file }) => {
		 logger.debug(context.id, 'Query::upload Avatar processing');
		 const { createReadStream, filename, mimetype, encoding } = await file;
		 logger.debug(createReadStream,filename,mimetype,encoding);
		 return 'world 2';
	 },
 };
 