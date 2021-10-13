const mongoose = require('mongoose');
const config = require('jsconfig');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

// noinspection JSUnresolvedVariable
const { passwordSaltRounds = 10 } = config.env;

// let identitySchema = mongoose.model('Identification');

const identitySchema = new mongoose.Schema({
	entity_id: { type: Schema.Types.ObjectId, ref: 'Entity', required: false },
	can_login: { type: Schema.Types.Boolean, required: true },
	type: {
		type: Schema.Types.String,
		enum: ['password', 'oauth', 'else'],
		default: 'password',
	},
	usage: [
		{
			usage_status: {
				type: Schema.Types.String,
				enum: ['success', 'error'],
				default: 'success',
			},
			usage_date: { type: Schema.Types.Date, default: Date.now, required: true },
		},
	],
	email: { type: Schema.Types.String, required: true },
	secret: { type: Schema.Types.String, default: 'false', required: true },
	username: { type: Schema.Types.String, required: true },
	identification_create_date: { type: Schema.Types.Date, default: Date.now, required: true },
	identification_last_use_date: { type: Schema.Types.Date, default: Date.now, required: true },
});

// index
identitySchema.index({ entity_id: 1, type: 1 }, { unique: true });

// Methods
identitySchema.methods.validPassword = async function (password) {
	// noinspection JSUnresolvedVariable
	const identification = await this.model('Identification').findOne({ email: this._doc.email });

	// noinspection JSUnresolvedVariable
	if (!identification._doc.can_login) {
		return false;
	}

	// noinspection JSUnresolvedVariable
	return bcrypt.compare(password, identification._doc.secret);
};

identitySchema.methods.setHashPassword = async function (password) {
	// noinspection JSUnresolvedVariable
	const identification = await this.model('Identification').findOne({ email: this._doc.email });

	if (!identification) {
		throw Error('save identification before this');
	}

	// noinspection JSUnresolvedVariable
	if (!identification._doc.can_login) {
		throw Error('this user cant login');
	}

	// noinspection JSUnresolvedVariable
	if (!identification._doc.type === 'password') {
		throw Error('this identification not password');
	}

	// noinspection JSUnresolvedVariable
	identification._doc.secret = await bcrypt.hash(password, passwordSaltRounds);
	identification.markModified('secret');
	await identification.save();
};

module.exports = mongoose.model('Identification', identitySchema);
