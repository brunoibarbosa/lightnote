const express = require('express')
const route = express.Router()
const homeController = require('./src/controllers/homeController')
const loginController = require('./src/controllers/loginController')
const noteController = require('./src/controllers/noteController')

const { loginRequired } = require('./src/middlewares/middleware')

// Rotas da home
route.get('/', homeController.index)

// Rotas de login
route.post('/login', loginController.login)
route.post('/register', loginController.register)
route.get('/logout', loginController.logout)

// Rota sobre
route.get('/sobre')

// Rotas de nota
route.post('/note/register', loginRequired, noteController.register)
route.get('/note/delete/:id', loginRequired, noteController.delete)
route.post('/note/edit/:id', loginRequired, noteController.edit)

module.exports = route