export default async function copyToClipboard(text) {
	if (navigator.clipboard) {
		await navigator.clipboard.writeText(text)
		return true
	}

	const element = document.createElement('span')
	element.style.width = 0
	element.style.height = 0
	element.style.position = 'absolute'
	element.style.left = '-999999px'
	element.innerHTML = text

	document.body.appendChild(element)

	const range = document.createRange()
	range.selectNode(element)
	const selection = window.getSelection()
	selection.removeAllRanges()
	selection.addRange(range)

	try {
		const successful = document.execCommand('copy')

		return successful
	} finally {
		document.body.removeChild(element)
	}
}