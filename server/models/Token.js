const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TokenSchema = new Schema({
    _userId: { type: Schema.Types.ObjectId, required: true, ref: 'users' },
    token: { type: String, required: true },
    createdAt: { type: Date, expires: '3600', default: Date.now }
});

const Token = mongoose.model("tokens", TokenSchema);

module.exports = Token;