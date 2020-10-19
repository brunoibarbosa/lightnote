const cron = require('node-cron')
const Login = require('./src/models/LoginModel')

cron.schedule('* */1 * * *', async () => {
    await Login.deleteOld()
})