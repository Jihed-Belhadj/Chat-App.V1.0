const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema(
    {
        username: {
            type: String, required: true, min: 4, max:20
        },
        
        email: {
            type:String, required:true, unique:true
        },

        password: {
            type:String, required:true, min:8
        },

        profilpic: {
            type: String,
            default:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/694px-Unknown_person.jpg'
        },

        gender: {
            type: String,
            default:'unknown'
        },

        isBanned: {
            type: Boolean,
            default:false
        },

        isAdmin: {
            type: Boolean,
            default:false
        }
    },

    {
        timestamps: true
    });

module.exports=mongoose.model('User', userSchema);