const mongoose = require('mongoose');

const { Schema } = mongoose;

const entitySchema = new Schema({
	title: { type: String, required: true },
	description: { type: String, required: false },
	active: { type: Schema.Types.Boolean, default: true, required: true },
	def: {
		link: { type: Schema.Types.ObjectId, ref: 'Jurisdiction', required: false },
		path: { type: Schema.Types.String, required: false },
	},
	entity_type: {
		type: String,
		enum: ['office', 'user', 'object'],
		default: 'object',
	},
	exclusive_roles: [
		{
			type: { type: String, required: false },
			active: { type: Schema.Types.Boolean, default: true, required: true },
			recipients: [{ type: Schema.Types.ObjectId, ref: 'Entity', required: false }],
		},
	],
	forks: [{ type: Schema.Types.ObjectId, ref: 'Entity', required: false }],
	inheritors: [{ type: Schema.Types.ObjectId, ref: 'Entity', required: false }],
	entity_create_date: { type: Schema.Types.Date, default: Date.now, required: true },
});

module.exports = mongoose.model('Entity', entitySchema);
