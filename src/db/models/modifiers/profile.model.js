const mongoose = require('mongoose');

const { Schema } = mongoose;

const profileSchema = new Schema({
	entity_id: { type: Schema.Types.ObjectId, ref: 'Entity', required: true },
	type: { type: Schema.Types.String, required: true },
	status: { type: Schema.Types.String, required: true },
	values: [
		[
			{
				key: { type: Schema.Types.String, required: true },
				value: { type: Schema.Types.String, required: true },
			},
			{
				key: { type: Schema.Types.String, required: true },
				value: { type: Schema.Types.Number, required: true },
			},
			{
				key: { type: Schema.Types.String, required: true },
				value: { type: Schema.Types.Boolean, required: true },
			},
			{
				key: { type: Schema.Types.String, required: true },
				value: { type: Schema.Types.ObjectId, ref: 'Entity', required: true },
			},
			{
				key: { type: Schema.Types.String, required: true },
				value: { type: Schema.Types.ObjectId, ref: 'File', required: true },
			},
		],
	],
	profile_create_date: { type: Schema.Types.Date, default: Date.now, required: true },
});

// index
profileSchema.index({ entity_id: 1, type: 1 }, { unique: true });

module.exports = mongoose.model('Profile', profileSchema);
