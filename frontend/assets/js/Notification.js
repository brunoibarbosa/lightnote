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

        const span = document.createElement('span')

        section.appendChild(span)
        section.appendChild(p)
        button.appendChild(img)
        section.appendChild(button)

        let tamanhoBarra = 100
        let timeBarra = setInterval(() => {
            span.style.width = `${tamanhoBarra--}%`
        }, 100)

        setTimeout(() => { this.clearNotification(section, timeBarra) }, 11000)

        document.querySelector('.janelaNotificacao').appendChild(section)
    }

    clearNotification(notification, intervalSpan) {
        clearInterval(intervalSpan)
        notification.remove()
    }
}