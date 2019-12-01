/* eslint-disable prefer-destructuring */
const path = require('path')
const fs = require('fs')
const vscodeDir = path.resolve('.vscode')
const scssHelpersDir = path.resolve('src/styles/helpers')
const vueHtmlSnippetsFile = 'vue-html.code-snippets'
const vueHtmlSnippetsFileFullPath = `${vscodeDir}/${vueHtmlSnippetsFile}`
const vueHtmlStaticSnippetsFile = 'vue-html-static.json'
const vueHtmlStaticSnippetsFileContent = require(`${vscodeDir}/${vueHtmlStaticSnippetsFile}`)

const fileList = fs.readdirSync(scssHelpersDir).filter(fileName => {
	switch (fileName) {
	case '_index.scss':
	case 'indentation.scss':
	case 'margin.scss':
	case 'padding.scss':
	case 'uncategorized.scss':
		return false
	default:
		break;
	}

	return fileName.indexOf('.scss') > -1
})

// Копируем содержимое <svg>-тега в xml файл
fileList.forEach(fileFullName => {
	// const iconName = fileFullName.substr(0, fileFullName.lastIndexOf('.'))
	const fileContent = fs.readFileSync(`${scssHelpersDir}/${fileFullName}`, 'utf-8')
	let matches;

	if (fileFullName === 'fills.scss') {
		matches = fileContent.match(/(\.(.+) path \{.+\})/g)
	} else {
		matches = fileContent.match(/\.(.+) \{(.+)\}/g)
	}

	if (matches) {
		matches.forEach(ruleString => {
			let ruleArr = []

			if (fileFullName === 'fills.scss') {
				const tempArr = /(\.(.+) path \{.+\})/g.exec(ruleString)

				ruleArr[1] = tempArr[2]
				ruleArr[2] = tempArr[1]
			} else {
				ruleArr = /\.(.+) \{(.+)\}/g.exec(ruleString)
			}

			// Добавляем динамические сниппеты к статическим
			vueHtmlStaticSnippetsFileContent[ruleArr[1]] = {
				prefix: ruleArr[1],
				body: ruleArr[1],
				description: ruleArr[2].trim(),
			}
		})
	}
})

fs.writeFileSync(vueHtmlSnippetsFileFullPath, JSON.stringify(vueHtmlStaticSnippetsFileContent, null, '\t'))