export default function list() {
	//api github https://api.github.com/

	const profile = document.querySelector('#profile')
	const userName = document.querySelector('#userName')
	const resultado = document.querySelector('.resultado')
	const btnSearch = document.querySelector('#btnSearch')
	const btnDelete = document.querySelector('.btn-delete')

	btnSearch.addEventListener('click', e => {
		e.preventDefault()
		const user = userName.value
		fetch(`https://api.github.com/users/${user}`)
			.then(r => r.json())
			.then(body => {
				const {
					name,
					avatar_url,
					bio,
					public_repos,
					followers,
					following
				} = body

				if (name === undefined || name === null) {
					resultado.innerHTML = `
				<span class="btn-delete">X</span>
				<div class="card undefined">
					<p class="undefined">${userName.value} não encontrado</p>
				</div>`

					setTimeout(() => {
						resultado.innerHTML = ''
					}, 1000)
				} else {
					//sempre que pesquisarmos um usuario, limpa o resultado anterior e limpa o campo de pesquisa e a lista
					resultado.innerHTML = ''
					localList.innerHTML = ''
					resultado.innerHTML = `
					<span class="btn-delete">X</span>
					<a href="https://github.com/${user}" target="_blanck" class="card">
            <img src="${avatar_url}" alt="${name}" class="img-avatar">
            <div class="card-body">
						<div class="dados-principal">
                <h5 class="card-title">${name}</h5>
                <p class="card-text">${bio}</p>
						</div>		
                <p class="card-text">${public_repos} Repositórios</p>
                <p class="card-text">${followers} Seguidores</p>
                <p class="card-text">Seguindo ${following}</p>
            </div>
        	</a>
				`

					fetch(`https://api.github.com/users/${user}/repos`)
						.then(response => response.json())
						.then(data => {
							data.forEach(repo => {
								const { name, description, html_url } = repo
								const imgHtml =
									repo.language !== 'HTML'
										? `<svg
						version="1.1"
						xmlns="http://www.w3.org/2000/svg"
						width="32"
						height="32"
						viewBox="0 0 1024 1024"
					>
						<title>arrow-up</title>
						<g id="icomoon-ignore"></g>
						<path
							fill="var(--color-secondary)"
							d="M64 0h896l-81.493 920.021-367.488 103.979-365.397-104.021zM363.989 416l-9.899-115.968 429.184 0.128 9.813-111.872-562.176-0.128 29.781 341.76h389.376l-13.909 146.176-124.16 34.304-126.080-34.56-8.021-90.027h-111.317l14.080 177.963 231.339 61.867 229.504-61.568 31.744-348.032z"
						></path>
					</svg>` //html
										: ''
								const imgCss =
									repo.languages !== 'CSS'
										? `<svg
						version="1.1"
						xmlns="http://www.w3.org/2000/svg"
						width="32"
						height="32"
						viewBox="0 0 1024 1024"
					>
						<title>arrow-up</title>
						<g id="icomoon-ignore"></g>
						<path
							fill="var(--color-secondary)"
							d="M64 0h896l-81.493 920.021-367.488 103.979-365.44-104.021zM793.173 188.288l-562.347-0.128 9.088 111.872 432 0.085-10.88 115.883h-283.307l10.24 109.781h263.765l-15.616 150.315-124.16 34.304-126.123-34.56-8.021-90.027h-111.36l12.373 164.48 233.173 72.661 229.248-65.28z"
						></path>
					</svg>` //css
										: ''
								const imgJs =
									repo.languages !== 'JavaScript'
										? `<svg
						version="1.1"
						xmlns="http://www.w3.org/2000/svg"
						width="32"
						height="32"
						viewBox="0 0 1024 1024"
					>
						<title>arrow-up</title>
						<g id="icomoon-ignore"></g>
						<path
							fill="var(--color-secondary)"
							d="M0 0h1024v1024h-1024zM940.117 779.776c-7.467-46.72-37.888-85.973-128.128-122.581-31.403-14.72-66.304-24.96-76.672-48.64-3.883-14.080-4.48-21.76-1.963-30.080 6.4-27.563 39.040-35.84 64.64-28.16 16.64 5.12 32 17.92 41.643 38.4 44.117-28.843 44.117-28.843 74.88-48-11.52-17.92-17.237-25.643-25.003-33.28-26.88-30.080-62.677-45.44-120.917-44.117l-30.080 3.797c-28.843 7.040-56.32 22.4-72.96 42.88-48.64 55.083-34.603 151.083 24.277 190.763 58.24 43.52 143.403 53.077 154.283 94.080 10.24 49.92-37.12 65.92-83.883 60.16-34.603-7.68-53.76-25.003-74.88-57.003l-78.080 44.843c8.96 20.48 19.2 29.397 34.56 47.317 74.24 74.923 259.84 71.083 293.163-42.837 1.237-3.84 10.24-30.080 3.157-70.4zM556.843 470.656h-95.915c0 82.688-0.384 164.864-0.384 247.68 0 52.565 2.688 100.821-5.888 115.669-14.080 29.397-50.347 25.643-66.816 20.48-16.896-8.363-25.472-19.883-35.413-36.48-2.688-4.48-4.693-8.363-5.419-8.363l-77.867 48c13.013 26.88 32 50.005 56.491 64.725 36.48 21.76 85.504 28.8 136.832 17.28 33.408-9.643 62.208-29.483 77.269-60.203 21.76-39.68 17.152-88.32 16.939-142.763 0.512-87.637 0-175.317 0-263.637z"
						></path>
					</svg>` //javascript
										: ''

								localList.innerHTML += novaLista(
									name,
									description,
									imgHtml,
									imgCss,
									imgJs,
									html_url
								)
							})
						})
				}
			})
	})

	//btnDelete
	if (resultado) {
		resultado.addEventListener('click', e => {
			if (e.target.classList.contains('btn-delete')) {
				e.target.parentElement.remove()
				//quando pesquisarmos outro profile, a lista de repos é limpa
				localList.innerHTML = ''
			}
		})
	}

	const btCriar = document.querySelector('#btnCreate')
	const btDeletar = document.querySelectorAll('.btnDelete')
	const localList = document.querySelector('#localList')
	//pegar imagem do input file já carregada
	const imgList = document.querySelector('#photo-preview')

	//nova lista
	const novaLista = (title, description, imgHtml, imgCss, imgJs, link) => {
		//fazer verificação quando for null ou undefined mostrar uma descrição padrão
		if (description === null || description === undefined) {
			description = 'Sem descrição'
		}
		//fazer verificação quando for null ou undefined mostrar uma imagem padrão
		if (
			imgList.src === null ||
			imgList.src === undefined ||
			imgList.src === ''
		) {
			imgList.src = `assets/projetos/img-def.png` //imagem padrão
		}

		const html = `<div class="projetos repo-list">
  <img
    class="item-projeto"  
    src=${imgList.src}
  />
  <div class="projeto-description">
    <h3 class="portTitle repo-name">${title}</h3>
		<h1 class="btnDelete">X</h1>
    <p class="portText repo-description">
      <span class="cor-2">></span> ${description}
    </p>
    <div class="tecnologia-usada-pack">
      <p class="portText">
        <span class="cor-2">></span> Tecnologias
        usadas
      </p>
      <div class="tecnologias-usada repo-stack">
        ${imgHtml}
				${imgCss}
				${imgJs}
      </div>
    </div>
    <a class="btnProjeto" target="_blanck" href="${link}">VER NO GITHUB</a>
  </div>
</div>
`

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
		//quando o inHtml estiver selecionado pega a imagem do checkbox
		const imgHtml = frmAdicionar.inHtml.checked
			? `<svg
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
			width="32"
			height="32"
			viewBox="0 0 1024 1024"
		>
			<title>arrow-up</title>
			<g id="icomoon-ignore"></g>
			<path
				fill="var(--color-secondary)"
				d="M64 0h896l-81.493 920.021-367.488 103.979-365.397-104.021zM363.989 416l-9.899-115.968 429.184 0.128 9.813-111.872-562.176-0.128 29.781 341.76h389.376l-13.909 146.176-124.16 34.304-126.080-34.56-8.021-90.027h-111.317l14.080 177.963 231.339 61.867 229.504-61.568 31.744-348.032z"
			></path>
		</svg>`
			: ''
		const imgCss = frmAdicionar.inCss.checked
			? `<svg
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
			width="32"
			height="32"
			viewBox="0 0 1024 1024"
		>
			<title>arrow-up</title>
			<g id="icomoon-ignore"></g>
			<path
				fill="var(--color-secondary)"
				d="M64 0h896l-81.493 920.021-367.488 103.979-365.44-104.021zM793.173 188.288l-562.347-0.128 9.088 111.872 432 0.085-10.88 115.883h-283.307l10.24 109.781h263.765l-15.616 150.315-124.16 34.304-126.123-34.56-8.021-90.027h-111.36l12.373 164.48 233.173 72.661 229.248-65.28z"
			></path>
		</svg>`
			: ''
		const imgJs = frmAdicionar.inJs.checked
			? `<svg
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
			width="32"
			height="32"
			viewBox="0 0 1024 1024"
		>
			<title>arrow-up</title>
			<g id="icomoon-ignore"></g>
			<path
				fill="var(--color-secondary)"
				d="M0 0h1024v1024h-1024zM940.117 779.776c-7.467-46.72-37.888-85.973-128.128-122.581-31.403-14.72-66.304-24.96-76.672-48.64-3.883-14.080-4.48-21.76-1.963-30.080 6.4-27.563 39.040-35.84 64.64-28.16 16.64 5.12 32 17.92 41.643 38.4 44.117-28.843 44.117-28.843 74.88-48-11.52-17.92-17.237-25.643-25.003-33.28-26.88-30.080-62.677-45.44-120.917-44.117l-30.080 3.797c-28.843 7.040-56.32 22.4-72.96 42.88-48.64 55.083-34.603 151.083 24.277 190.763 58.24 43.52 143.403 53.077 154.283 94.080 10.24 49.92-37.12 65.92-83.883 60.16-34.603-7.68-53.76-25.003-74.88-57.003l-78.080 44.843c8.96 20.48 19.2 29.397 34.56 47.317 74.24 74.923 259.84 71.083 293.163-42.837 1.237-3.84 10.24-30.080 3.157-70.4zM556.843 470.656h-95.915c0 82.688-0.384 164.864-0.384 247.68 0 52.565 2.688 100.821-5.888 115.669-14.080 29.397-50.347 25.643-66.816 20.48-16.896-8.363-25.472-19.883-35.413-36.48-2.688-4.48-4.693-8.363-5.419-8.363l-77.867 48c13.013 26.88 32 50.005 56.491 64.725 36.48 21.76 85.504 28.8 136.832 17.28 33.408-9.643 62.208-29.483 77.269-60.203 21.76-39.68 17.152-88.32 16.939-142.763 0.512-87.637 0-175.317 0-263.637z"
			></path>
		</svg>`
			: ''

		if (title.length > 0 && description.length > 0 && link.length > 0) {
			localList.innerHTML += novaLista(
				title,
				description,
				imgHtml,
				imgCss,
				imgJs,
				link
			)
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

	//input search list of repositories
	const input = document.querySelector('#search')
	input.addEventListener('keyup', function (e) {
		let inputValue = e.target.value.toLowerCase()
		let list = document.querySelectorAll('.repo-list')
		list.forEach(item => {
			let title = item.querySelector('.repo-name').innerText.toLowerCase()
			let description = item
				.querySelector('.repo-description')
				.innerText.toLowerCase()
			//tecnologias
			if (title.indexOf(inputValue) != -1) {
				item.style.display = 'flex'
			} else if (description.indexOf(inputValue) != -1) {
				item.style.display = 'flex'
			} else {
				item.style.display = 'none'
			}
		})
	})
}
