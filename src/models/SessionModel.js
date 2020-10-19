const session = require('express-session')
const mongoose = require('mongoose')

const SessionSchema = new mongoose.Schema({
    expires: Date,
    session: String
})

const SessionModel = mongoose.model('Session', SessionSchema)

module.exports = async (userId) => {
    const txt = new RegExp(`"id":"${userId}"`, 'i')
    const sessions = await SessionModel.find({ session: { $regex: txt } }).deleteMany()
    return sessions
}