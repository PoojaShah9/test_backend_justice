/**
 * Module dependencies
 */
 const { GraphQLList } = require('graphql');

 /**
  * Services
  */
 const { Auth } = require("../../../../exceptions/auth.exception");
 const ProfileService = require("../../../../services/profile.service");
 const ValidatorService = require('../../../../services/validator.service');
 const RoleService = require('../../../../services/role.service');
 
 const logger = console;
 
 module.exports = {
	 type: require('./type'),
	 resolve: async (parent, args, context) => {
		 logger.debug(context.id, 'Query::Me processing');
		 //Check if User is login or not
		 if(!context.user){
			 logger.debug(context.id, 'Query::Me not valid token');
			 throw Auth.unauthorized();
		 }
 
		 // Check Permission
		 // noinspection ES6RedundantAwait
		 await RoleService.checkPermission('canFetchProfile', args, context);
 
		 try {
			 const entity_id = context.user.entity_id;
			 logger.info(context.id, 'Query::Me email:', context.user.email);
			 
			 const response = await ProfileService.me({ entity_id });
 
			 logger.debug(context.id, 'Query::Me has been processed with success status');
 
			 logger.debug(context.id, 'Query::Me has been processed with success status');
			 return response;
			 
		 } catch (e) {
			 logger.debug(context.id, 'Query::Me has been processed with fail status');
			 logger.error(context.id, 'Query::Me error message:', e.toString());
			 throw e;
		 }
	 },
 };
 