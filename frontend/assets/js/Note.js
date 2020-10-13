import Notification from './Notification'

export default class Note {
    constructor(formClass) {
        this.form = document.querySelector(formClass)
    }

    init() {
        this.events()
    }

    events() {
        if (!this.form) return
        this.form.addEventListener('submit', e => {
            e.preventDefault()
            this.validate(e)
        })
    }

    validate(form) {
        if (!document.querySelector('.code-user')) {
            document.querySelector('#btnCod').click()
            return
        }

        const el = form.target
        const content = el.querySelector('textarea[name="content"]')

        if (content.value.trim() === '') {
            const notificacao = new Notification('error', 'note', 'É necessário que a nota tenha conteúdo!')
            notificacao.createNotification()
            return
        }

        el.submit()
    }
}