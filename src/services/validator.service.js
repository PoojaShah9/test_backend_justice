/**
 * Module dependencies
 */
const dns = require('dns');
/**
 * Exceptions
 */
const ValidatorException = require('../exceptions/validator.exception');

class ValidatorService {
	constructor(args) {
		this.args = args;
	}

	async required(field) {
		if (field in this.args === false || this.args[field].length === 0) throw ValidatorException.Required.check(field);

		return this;
	}

	async email(field) {
		const EmailValidator = async (email, domains = []) => {
			const tester =
				/^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
			// check email value
			if (!email) return false;
			// check email by regExp
			if (!tester.test(email)) return false;

			const parts = email.split('@');
			// check user part length value of email
			if (parts[0].length > 64) return false;

			const domain = parts[1];
			// check email domain part length value
			if (domain.split('.').some(part => part.length > 63)) return false;
			// check available domains
			if (Array.isArray(domains) && domains.length > 0 && !domains.some(item => item === domain)) return false;
			// check email domain dns
			if (await new Promise(resolve => dns.resolveMx(domain, error => resolve(error)))) return false;

			return true;
		};

		if (field in this.args && (await EmailValidator(this.args[field])) === false) {
			throw ValidatorException.Email.check(field);
		}

		return this;
	}

	async unique(model, field, expectId = null) {
		if (Boolean(model) === false || 'findById' in model === false) {
			throw ValidatorException.Model.init();
		}

		if (Boolean(field) === false) {
			throw ValidatorException.Field.init();
		}

		const query = {
			[field]: this.args[field],
		};

		if (Boolean(expectId) === true) {
			query._id = {
				$ne: expectId,
			};
		}

		if (Boolean(await model.findOne(query)) === true) {
			throw ValidatorException.Unique.check(field);
		}

		return this;
	}

	async exists(model, field) {
		if (Boolean(model) === false || 'findById' in model === false) {
			throw ValidatorException.Model.init();
		}

		if (Boolean(field) === false) {
			throw ValidatorException.Field.init();
		}

		const query = {
			[field]: this.args[field],
		};

		if (Boolean(await model.findOne(query)) === false) {
			throw ValidatorException.Exists.check(field);
		}

		return this;
	}
}

module.exports = ValidatorService;
