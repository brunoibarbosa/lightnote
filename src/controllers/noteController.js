const Note = require('../models/NoteModel')

exports.register = async (req, res) => {
    try {
        req.body.userId = req.session.user.id
        const note = new Note(req.body)
        await note.register()

        if (note.errors.length > 0) {
            req.flash('errors', note.errors)
            req.session.save(() => {
                return res.redirect('/')
            })
            return
        }

        req.flash('success', 'Nota criada com sucesso!')
        req.session.save(() => {
            return res.redirect('/')
        })
    } catch (e) {
        console.log(e)
        res.render('404')
    }
}

exports.edit = async (req, res) => {
    try {
        if (!req.params.id) return res.render('404')
        req.body.userId = req.session.user.id
        const nota = new Note(req.body)
        await nota.edit(req.params.id)

        if (nota.errors.length > 0) {
            req.flash('errors', note.errors)
            req.session.save(() => {
                return res.redirect('/')
            })
            return
        }

        req.flash('success', 'Nota editada com sucesso!')
        req.session.save(() => {
            return res.redirect('/')
        })

    } catch (e) {
        console.log(e)
        res.render('404')
    }
}

exports.delete = async (req, res) => {
    try {
        if (!req.params.id) return res.render('404')

        const nota = await Note.delete(req.params.id, req.session.user.id)
        if (!nota) return res.render('404')

        req.flash('success', 'Nota apagada com sucesso!')
        req.session.save(() => res.redirect('/'))

    } catch (e) {
        console.log(e)
        res.render('404')
    }
}