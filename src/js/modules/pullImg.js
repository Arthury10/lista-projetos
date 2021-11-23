export default function pullImg() {
	const btnImg = document.querySelector('.pull-img')
	const inImg = document.querySelector('#inImg')
	btnImg.addEventListener('click', () => {
		inImg.click()
	})

	window.addEventListener('DOMContentLoaded', () => {
		inImg.addEventListener('change', () => {
			let file = inImg.files.item(0)
			//ler um arquivo
			let reader = new FileReader()
			reader.readAsDataURL(file)
			reader.onload = function (e) {
				let image = document.getElementById('photo-preview')
				image.src = e.target.result
			}
		})
	})
}
