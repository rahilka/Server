const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

const surveySchema = new Schema({
	title: String,
	body: String,
	subject: String,
	recipients: [RecipientSchema],
	yes: { type: Number, default: 0 }, 
	no: { type: Number, default: 0 },
	_user: { type: Schema.Types.ObjectId, ref: 'User' }, //the reference that we are making here belongs to the 'User's collection
	// the '_' means that it is a relation between this model and another one
	dateSent: Date,
	lastResponded: Date
});

mongoose.model('surveys', surveySchema);
