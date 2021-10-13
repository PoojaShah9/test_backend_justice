/**
 * Models
 */
const IdentificationModel = require('../db/models/modifiers/identification.model');

class IdentificationService {
	static get(data) {
		return IdentificationModel.findOne(data);
	}

	static async getByEmail(email) {
		return this.get({ email });
	}
}

module.exports = IdentificationService;
