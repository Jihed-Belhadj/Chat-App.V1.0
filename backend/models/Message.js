const mongoose = require("mongoose");
const schema = mongoose.Schema;

const messageSchema = new schema(
    {
        conversation:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Conversation'

        },

        sender:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },

        text:
        {
            type: String, required: true
        }

    },
    {
        timestamps: true
    });

module.exports = mongoose.model('Message', messageSchema);