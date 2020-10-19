const Login = require('../models/LoginModel')
const Note = require('../models/NoteModel')
const dayjs = require('dayjs')

exports.index = async (req, res) => {
    try {
        const noteActive = req.session.noteActive ? { ...req.session.noteActive } : {}
        req.session.noteActive = {}

        // Se tiver algum usuário logado, atualiza o lastLogin
        if (req.session.user)
            await Login.updateUser(req.session.user.id)

        const notes = req.session.user ? await Note.searchNotes(req.session.user.id) : []

        return res.render('index', { notes, noteActive, dayjs })
    } catch (e) {
        console.log(e)
        res.render('404')
    }
}