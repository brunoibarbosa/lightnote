import Notification from './Notification'

export default class Login {
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
        const el = form.target
        const code = el.querySelector('input[name="code"]')
        const password = el.querySelector('input[name="password"]')

        if (code.value.length < 1 || code.value.length > 6) {
            const notificacao = new Notification('error', 'login', 'É necessário digitar um código com 1 a 6 caracteres!')
            notificacao.createNotification()
            return
        }

        if (password.value.length < 4 || password.value.length > 8) {
            const notificacao = new Notification('error', 'login', 'É necessário digitar uma senha com 4 a 8 caracteres!')
            notificacao.createNotification()
            return
        }

        const tituloNovaNota = document.querySelector('#tituloNovaNota').value
        const textoNovaNota = document.querySelector('#textoNovaNota').value
        el.setAttribute('action', `${el.getAttribute('action')}?title=${tituloNovaNota}&content=${textoNovaNota}`)

        el.submit()
    }
}