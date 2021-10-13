/**
 * Models
 */
const EntityModel = require('../db/models/entity.model');
const IdentificationModel = require('../db/models/modifiers/identification.model');
/**
 * Constants
 */
// const { HUMANITY } = require('../constants/jurisdiction.constant');

const logger = console;

class EntityService {
	static async create(data) {
		logger.debug('EntityService::create processing');

		try {
			if (await IdentificationModel.findOne({ email: data.email })) {
				// noinspection ExceptionCaughtLocallyJS
				throw new Error('email already exists');
			}

			const entity = await EntityModel.create({
				title: `User with email: ${data.email}`,
				description: '',
				active: true,
				def: data.def,
				entity_type: 'user',
				entity_create_date: new Date().toISOString(),
			});

			const identification = await IdentificationModel.create({
				entity_id: entity.id,
				can_login: true,
				type: 'password',
				email: data.email,
				username: data.email,
			});

			// noinspection JSUnresolvedFunction
			await identification.setHashPassword(data.password);

			logger.info('EntityService::create user model:', entity);

			logger.debug('EntityService::create has been processed with success status');
			return entity;
		} catch (e) {
			logger.debug('EntityService::create has been processed with fail status');
			logger.error('EntityService::create error message:', e.toString());
			throw e;
		}
	}

	/**
	 * get humanity entity
	 * @returns {Promise<EntityModel>}
	 */
	// static getHumanity() {
	// 	return EntityModel.findOne({
	// 		title: HUMANITY,
	// 		entity_type: 'jurisdiction',
	// 	});
	// }
}

module.exports = EntityService;
