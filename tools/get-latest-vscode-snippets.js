/* eslint-disable prefer-destructuring */
const path = require('path')
const fs = require('fs')
// пути резолвятся относительно корня проекта, в который импортируется данный скрипт
const kitVscodeDir = path.resolve('node_modules/frontend-kit/.vscode')
const projectVscodeDir = path.resolve('.vscode')
// находим только нужные файлы
const fileList = fs.readdirSync(kitVscodeDir).filter(fileName => fileName.indexOf('.code-snippets') > -1)

// создаём директорию в текущем проекте, если её нет
if (!fs.existsSync(projectVscodeDir)) fs.mkdirSync(projectVscodeDir)

// копируем файлы
fileList.forEach(fileFullName => {
	fs.createReadStream(`${kitVscodeDir}/${fileFullName}`).pipe(fs.createWriteStream(`${projectVscodeDir}/${fileFullName}`))
})

console.log('\x1b[42m\x1b[30m', 'Последняя версия сниппетов находится в директории .vscode', '\x1b[0m')
