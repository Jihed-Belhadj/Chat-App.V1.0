const mongoose = require("mongoose");
const schema = mongoose.Schema;

const conversationSchema = new schema(
    {
        isGroup: {
            type: Boolean,
            default: false  
        },

        users: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }],
        
        lastMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Message'
        }
    },
    
    {
        timestamps: true
    });

module.exports = mongoose.model('Conversation', conversationSchema);
