// DayJS
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

const overlay = document.querySelector('.overlay'),
    saidaDados = document.querySelector('#saidaDados')

// Formulário de login/cadastro
const formAcesso = document.querySelector('#form-acesso')

// Criar nova nota
const campoNovaNota = document.querySelector('.campoAddNota > form > section'),
    tituloNovaNota = document.querySelector('#tituloNovaNota'),
    textoNovaNota = document.querySelector('#textoNovaNota')

// Janela de visualização da nota
const janelaVisu = document.querySelector('.visualizacao'),
    titleVisu = janelaVisu.querySelector('.title-visu'),
    contentVisu = janelaVisu.querySelector('.content-visu')

// Edição de nota
const janelaEdit = document.querySelector('#editaNota'),
    formEdit = janelaEdit.querySelector('#form-edita-nota'),
    tituloEdit = janelaEdit.querySelector('#tituloEdita'),
    conteudoEdit = janelaEdit.querySelector('#conteudoEdita')

// Janela exclusão de nota
const janelaConfirmaExcluir = document.querySelector('.confirmaExcluir')

// Filtros de pesquisa
const inputFiltrar = document.querySelector('#inputFiltrar'),
    campoSelect = document.querySelector('#selectOrdenar'),
    inputData = document.querySelector('#inputData')

// Armazena todas as notas
const todasNotas = [...document.querySelectorAll('.nota')]

// Captura eventos de click na página
document.addEventListener('click', el => {
    const e = el.target

    // Se existir balão aberto, será fechado
    if (document.querySelector('.aberto')) {
        if (e.classList.contains('fecharBalao') || e.classList.contains('overlay')) {
            document.querySelector('.aberto').classList.remove('aberto')
            overlay.classList.remove('aberto')
        }
    }

    // Fecha notificação antes do tempo acabar
    if (e.classList.contains('btnFechaNotificacao')) {
        e.parentElement.remove()
    }

    // Faz login
    if (e.id === 'btnEntrar') {
        formAcesso.setAttribute('action', '/login')
    }

    // Faz cadastro
    if (e.id === 'btnCadastrar') {
        formAcesso.setAttribute('action', '/register')
    }

    // Abre ou fecha código acesso
    if (e.id === 'btnCod') {
        abreJanela(document.querySelector('.ticket_acesso'))
    }

    // Abre ou fecha menu opções
    if (e.id === 'btnOpc') {
        abreJanela(document.querySelector('.opcoes'))
    }

    // Expande nova nota
    if (e.id === 'tituloNovaNota' || e.id === 'textoNovaNota') {
        campoNovaNota.parentElement.classList.add('ativo')
        textoNovaNota.setAttribute('placeholder', 'Texto')
    } else if (textoNovaNota.value.trim() == '') {
        textoNovaNota.value = ''
        textoNovaNota.style.height = '45px'
        textoNovaNota.setAttribute('placeholder', '')
        campoNovaNota.parentElement.classList.remove('ativo')
    }

    // Mostra ou oculta opções
    if (e.id === 'mostrarOpc') {
        document.querySelector('.campoOpc').classList.toggle('oculto')
    }

    // Criar nova nota
    if (e.id === 'btnAddNota') {
        textoNovaNota.style.height = '45px'
    }

    // Filtrar notas
    if (e.id === 'btnFiltrar') {
    }

    // Limpar campos de entrada de dados
    if (e.id === 'btnLimpar') {
        limpaCampos()
    }

    // Copiar texto da nota ao clicar no botão
    if (e.id === 'btnCopia') {
        const nota = e.parentElement.parentElement
        copiarNota(nota)
        notificaCopiou(nota)
    }

    // Abre janela de edição
    if (e.id === 'btnEdita') {
        janelaEdita(e.parentElement.parentElement)
    }

    // Excluir nota
    if (e.id === 'btnRemove') {
        janelaConfirmaExcluir.setAttribute('data-note-confirm', e.parentElement.parentElement.dataset.noteId)
        abreJanela(janelaConfirmaExcluir)
    }

    // Confirma a exclusão
    if (e.id === 'btnConfirmaExcluir') {
        location.href = `/note/delete/${janelaConfirmaExcluir.dataset.noteConfirm}`
    }
})

// Expande nota
todasNotas.forEach(n => {
    n.addEventListener('mouseover', e => {
        if (e.target.classList.contains('titulo_nota') || e.target.classList.contains('txt_nota') || e.target.classList.contains('line')) {
            n.classList.add('visualizar')
        }
    })

    n.addEventListener('mousemove', e => {
        if (!e.target.classList.contains('titulo_nota') && !e.target.classList.contains('txt_nota') && !e.target.classList.contains('line')) {
            n.classList.remove('visualizar')
        }
    })

    n.addEventListener('mouseleave', () => {
        n.classList.remove('visualizar')
    })

    n.addEventListener('click', e => {
        if (e.target.classList.contains('nota')) {
            titleVisu.textContent = n.querySelector('.titulo_nota').textContent
            contentVisu.textContent = n.querySelector('.txt_nota').textContent
            abreJanela(janelaVisu)
        }
    })
})

// Ouvindo mudança de algum campo de pesquisa
inputFiltrar.addEventListener('input', realizaPesquisa)
campoSelect.addEventListener('change', realizaPesquisa)
inputData.addEventListener('input', realizaPesquisa)

// Dispara a pesquisa
function realizaPesquisa() {
    const notasFiltradas = todasNotas.filter(n => {
        const titulo = n.querySelector('.titulo_nota').textContent.toLowerCase()
        const conteudo = n.querySelector('.txt_nota').textContent.toLowerCase()
        const data = dayjs(n.querySelector('.date').textContent, 'DD/MM/YYYY').locale('pt-br')

        const textoFiltro = inputFiltrar.value.toLowerCase().trim()
        if (titulo.indexOf(textoFiltro) === -1 && conteudo.indexOf(textoFiltro) === -1) return false
        if (dayjs(inputData.value).isValid())
            if (data.format('DD/MM/YYYY') !== dayjs(inputData.value).locale('pt-br').format('DD/MM/YYYY')) return false

        return true
    })

    if (campoSelect.value === 'antigos') notasFiltradas.reverse()

    saidaDados.innerHTML = '<span></span>'
    notasFiltradas.forEach(n => saidaDados.appendChild(n))
}

// Abre janela
function abreJanela(janela) {
    janela.classList.add('aberto')
    overlay.classList.add('aberto')
}

// Copia conteúdo da nota
function copiarNota(p) {
    const range = document.createRange()
    window.getSelection().removeAllRanges()
    range.selectNode(p.querySelector('.txt_nota'))
    window.getSelection().addRange(range)
    document.execCommand('copy')
    window.getSelection().removeAllRanges()
}

// Aviso de cópia
function notificaCopiou(nota) {
    if (!nota.classList.contains('copiado')) {
        nota.classList.add('copiado')
        setTimeout(() => nota.classList.remove('copiado'), 1000)
    }
}

// Limpa os campos de entrada de dados
function limpaCampos() {
    inputFiltrar.value = ''
    campoSelect.value = 'recentes'
    inputData.value = ''
    todasNotas.forEach(n => saidaDados.appendChild(n))
}

// Abre a janela de edição
function janelaEdita(nota) {
    const titulo = nota.querySelector('.titulo_nota').textContent
    const conteudo = nota.querySelector('.txt_nota').textContent

    tituloEdit.value = titulo ? titulo : 'Sem título'
    conteudoEdit.value = conteudo

    // Mostra janela
    formEdit.setAttribute('action', `/note/edit/${nota.dataset.noteId}`)
    abreJanela(janelaEdit)
}

// Resize campo do editar
function ajustaCampoEdicao() {
    const observer = new MutationObserver(function () {
        autosize()
    })

    // Monitora janela de edição
    observer.observe(document.querySelector('#editaNota'), {
        attributes: true,
        attributeFilter: ['class'],
        childList: false,
        characterData: false
    })

    const textarea = document.querySelector('#editaNota textarea')
    textarea.addEventListener('keydown', autosize)

    function autosize() {
        textarea.style.cssText = 'height: auto'
        textarea.style.cssText = '-moz-box-sizing: content-box'
        textarea.style.cssText = 'height:' + textarea.scrollHeight + 'px'
    }
}

// Resize conteúdo nota nota
function ajustaCampoNovaNota() {
    textoNovaNota.addEventListener('input', autosize)

    function autosize() {
        textoNovaNota.style.cssText = 'height: auto'
        textoNovaNota.style.cssText = '-moz-box-sizing: content-box'
        textoNovaNota.style.cssText = 'height:' + textoNovaNota.scrollHeight + 'px'
    }
}

ajustaCampoEdicao()
ajustaCampoNovaNota()