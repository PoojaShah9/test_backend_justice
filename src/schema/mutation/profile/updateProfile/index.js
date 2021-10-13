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
 const InputType = require('../../field.input.type');
 
 module.exports = {
	 type: require('./type'),
	 args: {
		 vars: { type: new GraphQLList(InputType) },
	 },
	 resolve: async (parent, args, context) => {
		 logger.debug(context.id, 'Mutation::updateProfile processing');
		 //Check if User is login or not
		 if(!context.user){
			 logger.debug(context.id, 'Mutation::updateProfile not valid token');
			 throw Auth.unauthorized();
		 }
 
		 // Check Permission
		 // noinspection ES6RedundantAwait
		 await RoleService.checkPermission('canEditProfile', args, context);
 
		 try {
			 const { vars } = args;
			 const entity_id = context.user.entity_id;
			 logger.info(context.id, 'Mutation::updateProfile email:', context.user.email);
 
			 const validator = new ValidatorService(args);
			 await validator.required('vars');
			 
			 const response = await ProfileService.create({ entity_id, vars });
 
			 logger.debug(context.id, 'Mutation::updateProfile has been processed with success status');
 
			 logger.debug(context.id, 'Mutation::updateProfile has been processed with success status');
			 return {
				 status: true,
			 };
		 
		 } catch (e) {
			 logger.debug(context.id, 'Mutation::updateProfile has been processed with fail status');
			 logger.error(context.id, 'Mutation::updateProfile error message:', e.toString());
			 throw e;
		 }
	 },
 }; 