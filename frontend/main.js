import 'core-js/stable'
import 'regenerator-runtime/runtime'

// SASS
import './assets/sass/main.scss'
import './assets/sass/home.scss'
import './assets/sass/about.scss'
import './assets/sass/404.scss'

// Imagens
import copy from './assets/img/copy.svg'
import github from './assets/img/github.svg'
import linkedin from './assets/img/linkedin.svg'
import logo from './assets/img/logo.svg'
import pencil from './assets/img/pencil.svg'
import remove from './assets/img/remove.svg'
import plus from './assets/img/plus.svg'
import ticket from './assets/img/ticket.svg'
import more from './assets/img/gear.svg'
import logout from './assets/img/logout.svg'
import close from './assets/img/close.svg'
import calendar from './assets/img/calendar.svg'
import expandnote from './assets/img/expand-note.svg'
import copynote from './assets/img/copy-note.svg'
import favicon from './assets/img/favicon.ico'

// JS
import './assets/js/app'
import Login from './assets/js/Login'
import Note from './assets/js/Note'

const acesso = new Login('#form-acesso')
acesso.init()

const nova_nota = new Note('#form-nova-nota')
nova_nota.init()

const nota_editada = new Note('#form-edita-nota')
nota_editada.init()