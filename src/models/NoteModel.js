const mongoose = require('mongoose')

const NoteSchema = new mongoose.Schema({
    title: { type: String, required: false },
    content: { type: String, required: true },
    lastModified: { type: Date, required: true },
    userId: { type: String, required: true }
})

const NoteModel = mongoose.model('Note', NoteSchema)

class Note {
    constructor(body) {
        this.body = body
        this.errors = []
        this.note = null
    }

    async register() {
        this.validate()
        if (this.errors.length > 0) return
        this.note = await NoteModel.create(this.body)
        return
    }

    validate() {
        this.cleanUp()
        if (!this.body.content) this.errors.push('É necessário que a nota tenha algum conteúdo.')
    }

    cleanUp() {
        for (const key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = ''
            }
        }

        this.body = {
            title: this.body.title !== '' ? this.body.title : 'Sem título',
            content: this.body.content,
            lastModified: Date.now(),
            userId: this.body.userId
        }
    }

    async edit(noteId) {
        if (typeof noteId !== 'string') return
        this.validate()
        if (this.errors.length > 0) return
        this.note = await NoteModel.findOneAndUpdate({ _id: noteId, userId: this.body.userId }, this.body, { new: true })
    }

    static async delete(noteId, userId) {
        if (typeof noteId !== 'string' || typeof userId !== 'string') return
        const note = await NoteModel.findOneAndDelete({ _id: noteId, userId })
        return note
    }

    static async searchNotes(userId) {
        const notes = await NoteModel.find({ userId }).sort({ lastModified: -1 })
        return notes
    }
}

module.exports = Note