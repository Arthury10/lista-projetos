export default function list() {
	const btCriar = document.querySelector('#btnCreate')
	const btDeletar = document.querySelectorAll('.btnDelete')
	const localList = document.querySelector('#localList')
	//pegar imagem do input file já carregada
	const imgList = document.querySelector('#photo-preview')

	const projetos = document.querySelectorAll('.projetos')

	//nova lista
	const novaLista = (title, description, link) => {
		const html = `<div class="projetos">
  <img
    class="item-projeto"
    src=${imgList.src}
  />
  <div class="projeto-description">
    <h3 class="portTitle">${title}</h3>
		<h1 class="btnDelete">X</h1>
    <p class="portText">
      <span class="cor-2">></span> ${description}
    </p>
    <div class="tecnologia-usada-pack">
      <p class="portText">
        <span class="cor-2">></span> Tecnologias
        usadas
      </p>
      <div class="tecnologias-usada">
        <img
          class="tecSkill"
          src="assets/projetos/tecnologia/html5.svg"
          alt="HTML"
        />
        <img
          class="tecSkill"
          src="assets/projetos/tecnologia/css3.svg"
          alt="CSS"
        />
        <img
          class="tecSkill"
          src="assets/projetos/tecnologia/javascript.svg"
          alt="CSS"
        />
      </div>
    </div>
    <a class="btnProjeto" target="_blanck" href="${link}">VER NO GITHUB</a>
  </div>
</div>`
		return html
	}

	//obtem dados dos inputs
	frmAdicionar.addEventListener('submit', e => {
		// evita (previne) o comportamento padrão do form (que é enviar os dados / refresh)
		e.preventDefault()

		// obtém o produto digitado no form
		const title = frmAdicionar.inTitle.value.trim()
		const description = frmAdicionar.inDescription.value.trim()
		const link = frmAdicionar.inLink.value.trim()

		if (title.length > 0 && description.length > 0 && link.length > 0) {
			localList.innerHTML += novaLista(title, description, link)
			frmAdicionar.reset() // limpa o form
			//remova os dados do input file
			imgList.src = ''
		}
	})

	btCriar.addEventListener('click', () => {
		if (localList.children.length > 0) {
			return
		}

		let lista = ''

		for (item of localList.children) {
			lista += item.innerHTML + ';'
		}
		const listaProjetos = lista.slice(0, -1)

		//salvar lista no localStorage
		localStorage.setItem('listaProject', listaProjetos)
	})

	//deletar item da lista
	localList.addEventListener('click', e => {
		if (e.target.className === 'btnDelete') {
			e.target.parentElement.parentElement.remove()
		}
	})

	//carregar lista do localStorage
	window.addEventListener('load', () => {
		const listaProjetos = localStorage.getItem('listaProject')
		if (listaProjetos) {
			const lista = listaProjetos.split(';')
			for (item of lista) {
				localList.innerHTML += item
			}
		}
	})
}
