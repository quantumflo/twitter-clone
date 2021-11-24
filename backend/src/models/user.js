const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator")
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {type: String, required: true},
    uid:  {type: String, required: true, unique: true},
    password:  {type: String, required: true, minLength: 5},
    following:[{type: String}],
})

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User",userSchema);