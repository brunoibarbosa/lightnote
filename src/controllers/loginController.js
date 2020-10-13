const Login = require('../models/LoginModel')

exports.login = async (req, res) => {
    try {
        const login = new Login(req.body)
        await login.login()

        if (login.errors.length > 0) {
            req.flash('errors', login.errors)
            req.session.save(() => {
                return res.redirect('/')
            })
            return
        }

        req.session.save(() => {
            req.session.user = { id: login.user.id, code: login.user.code }
            req.session.noteActive = { title: req.query.title, content: req.query.content }
            return res.redirect('/')
        })
    } catch (e) {
        console.log(e)
        res.render('404')
    }
}

exports.register = async (req, res) => {
    try {
        const login = new Login(req.body)
        await login.register()

        if (login.errors.length > 0) {
            req.flash('errors', login.errors)
            req.session.save(() => {
                return res.redirect('/')
            })
            return
        }

        req.flash('success', 'Código de acesso criado!')
        req.session.save(() => {
            req.session.user = { id: login.user.id, code: login.user.code }
            return res.redirect('/')
        })
    } catch (e) {
        console.log(e)
        res.render('404')
    }
}

exports.logout = (req, res) => {
    req.session.destroy()
    res.redirect('/')
}