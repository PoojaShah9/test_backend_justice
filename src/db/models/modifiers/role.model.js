const mongoose = require('mongoose');

const { Schema } = mongoose;

const roleSchema = new Schema({
	entity_id: { type: Schema.Types.ObjectId, ref: 'Entity', required: true },
	// Reference to the object that initiates the role
	initiator_id: { type: Schema.Types.ObjectId, ref: 'Entity', required: true },
	// Link to the jurisdiction where the role is described
	def: {
		link: { type: Schema.Types.ObjectId, ref: 'Jurisdiction', required: true },
		path: { type: Schema.Types.String, required: true },
	},
	// Accepted Role
	role: { type: Schema.Types.String, required: true },
	// The status of the role that the access rights depend on
	status: { type: Schema.Types.String, required: true },
	// Reference to objects to which roles are accepted
	interactions: [
		{
			// Specifying the object to which the role is assumed
			entity_id: { type: Schema.Types.ObjectId, ref: 'Entity', required: true },
			// List of changeable permissions
			permissions: [
				{
					value: { type: Schema.Types.String, required: true },
					active: { type: Schema.Types.Boolean, default: true, required: true },
					type: { type: Schema.Types.String, required: true },
					role_status: { type: Schema.Types.String, required: false },
					create_date: { type: Schema.Types.Date, required: true },
					expiration_date: { type: Schema.Types.Date, required: true },
				},
			],
		},
	],
	// Дата создания роли
	role_create_date: { type: Schema.Types.Date, default: Date.now, required: true },
});

// index
roleSchema.index({ entity_id: 1, type: 1, status: 1 }, { unique: true });

module.exports = mongoose.model('Role', roleSchema);
