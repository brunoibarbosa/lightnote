export default class Notification {
    constructor(type, reason, message) {
        this.type = type
        this.reason = reason
        this.message = message
    }

    notificationExists() {
        const notif = document.querySelector(`.notificacao.${this.type}.${this.reason}`)
        if (notif) notif.remove()
    }

    createNotification() {
        this.notificationExists()

        const section = document.createElement('section')
        section.classList.add('notificacao', this.type, this.reason)
        const p = document.createElement('p')
        p.textContent = this.message
        const button = document.createElement('button')
        button.setAttribute('class', 'btnFechaNotificacao')
        const img = document.createElement('img')
        img.setAttribute('src', './img/close.svg')
        img.setAttribute('alt', 'Fechar notificação')

        section.appendChild(p)
        button.appendChild(img)
        section.appendChild(button)
        document.querySelector('.janelaNotificacao').appendChild(section)
    }
}