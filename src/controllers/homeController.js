const Note = require('../models/NoteModel')
const dayjs = require('dayjs')

exports.index = async (req, res) => {
    const noteActive = req.session.noteActive ? { ...req.session.noteActive } : {}
    req.session.noteActive = {}

    const notes = req.session.user ? await Note.searchNotes(req.session.user.id) : []

    return res.render('index', { notes, noteActive, dayjs })
}