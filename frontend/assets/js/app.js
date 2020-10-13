const overlay = document.querySelector('.overlay'),
    saidaDados = document.querySelector('#saidaDados'),
    janelaNotificacao = document.querySelector('.janelaNotificacao')

// Formulário de login/cadastro
const formAcesso = document.querySelector('#form-acesso')

// Criar nova nota
const campoNovaNota = document.querySelector('.campoAddNota > form > section'),
    tituloNovaNota = document.querySelector('#tituloNovaNota'),
    textoNovaNota = document.querySelector('#textoNovaNota')

// Edição de nota
const janelaEdit = document.querySelector('#editaNota'),
    formEdit = janelaEdit.querySelector('#form-edita-nota'),
    tituloEdit = janelaEdit.querySelector('#tituloEdita'),
    conteudoEdit = janelaEdit.querySelector('#conteudoEdita')

// Janela exclusão de nota
const janelaConfirmaExcluir = document.querySelector('.confirmaExcluir')

// Filtros de pesquisa
const inputFiltrar = document.querySelector('#inputFiltrar'),
    btnSelect = document.querySelector('#selectOrdenar'),
    inputData = document.querySelector('#inputData')

document.addEventListener('click', el => {
    const e = el.target

    // Se existir balão aberto, será fechado
    if (document.querySelector('.aberto')) {
        if (e.classList.contains('fecharBalao') || e.classList.contains('overlay')) {
            document.querySelector('.aberto').classList.remove('aberto')
            overlay.classList.remove('aberto')
        }
    }

    if (e.classList.contains('btnFechaNotificacao')) {
        e.parentElement.remove()
    }

    if (e.id === 'btnEntrar') {
        formAcesso.setAttribute('action', '/login')
    }

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
        const nota = e.parentElement.parentElement.querySelector('.txt_nota')
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

// Abre janela
function abreJanela(janela) {
    janela.classList.add('aberto')
    overlay.classList.add('aberto')
}

// Copia conteúdo da nota
function copiarNota(p) {
    const range = document.createRange()
    window.getSelection().removeAllRanges()
    range.selectNode(p)
    window.getSelection().addRange(range)
    document.execCommand('copy')
    window.getSelection().removeAllRanges()
}

// Aviso de cópia
function notificaCopiou(p) {
    if (!p.parentElement.classList.contains('copiado')) {
        p.parentElement.classList.toggle('copiado')
        setTimeout(() => p.parentElement.classList.toggle('copiado'), 1000)
    }
}

// Limpa os campos de entrada de dados
function limpaCampos() {
    tituloNovaNota.value = ''
    textoNovaNota.value = ''
    inputFiltrar.value = ''
    btnSelect.value = 'recentes'
    inputData.value = ''
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