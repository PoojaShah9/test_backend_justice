/**
 * Module dependencies
 */
const EntityModel = require('../db/models/entity.model');
const RoleModel = require('../db/models/modifiers/role.model');

/**
 * Exceptions
 */
const { CheckPermission } = require('../exceptions/role.exception');

const logger = console;

class RoleService {
	constructor(args) {
		this.args = args;

		// TODO: Move to DB
		this.permissionList = {
			canHello: true,
			// auth
			canLogin: true,
			canRegister: true,
			canResetPassword: true,
			canRestorePassword: true,
			// entity
			canFetchEntityRole: true,
			canMakeEntityRole: true,
			canEditEntityRole: true,
			canCloneEntityRole: true,
			canUnlinkEntityRole: true,
			// jurisdiction
			canFetchJurisdiction: true,
			canMakeJurisdiction: true,
			canEditJurisdiction: true,
			canCloneJurisdiction: true,
			// profile
			canFetchProfile: true,
			canMakeProfile: true,
			canEditProfile: true,
			canCloneProfile: true,
			canUnlinkProfile: true,
			// notification
			canFetchNotification: true,
		};
	}

	/**
	 * clone entityRole
	 *
	 * @static
	 * @return {{status: boolean}}
	 */
	static clone() {
		return {
			status: true,
		};
	}

	/**
	 * Check Permission
	 *
	 * @static
	 * @return {boolean}
	 */
	async checkPermission(PermissionStr, args, context) {
		logger.debug(`Query::Check Permission ${PermissionStr}`);
		
		if (!context.user) {
			if (!Object.keys(this.permissionList).some(k => k === PermissionStr)) {
				throw CheckPermission.cant_use(PermissionStr);
			}
			return true;
		}

		// noinspection JSUnresolvedVariable
		const entityId = context.user._doc.entity_id;

		const user = await EntityModel.findById(entityId);

		// noinspection JSUnresolvedVariable
		if (!user._doc.active) {
			throw CheckPermission.disabled();
		}

		// noinspection JSUnresolvedVariable
		if (!context.user._doc.can_login) {
			throw CheckPermission.cant_login();
		}

		const roleList = await RoleModel.find({ entityId });

		if (!Object.keys(this.permissionList).some(k => k === PermissionStr)) {
			// TODO: Check role list
			if (roleList.length === 0) {
				throw CheckPermission.cant_use(PermissionStr);
			}
		}

		// TODO: Check role to object

		return true;
	}

	/**
	 * edit entityRole
	 *
	 * @static
	 * @return {{status: boolean}}
	 */
	static edit() {
		return {
			status: true,
		};
	}

	/**
	 * make entityRole
	 *
	 * @static
	 * @return {{status: boolean}}
	 */
	static make() {
		return {
			status: true,
		};
	}

	/**
	 * unlink entityRole
	 *
	 * @static
	 * @return {{status: boolean}}
	 */
	static unlink() {
		return {
			status: true,
		};
	}
}

// Export Singleton
module.exports = new RoleService();
