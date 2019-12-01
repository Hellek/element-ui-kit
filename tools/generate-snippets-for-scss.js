/* eslint-disable prefer-destructuring */
const path = require('path')
const fs = require('fs')
const vscodeDir = path.resolve('.vscode')
const scssSnippetsFile = 'scss.code-snippets'
const scssStaticSnippetsFile = 'scss-static.json'
const scssStaticSnippetsFileContent = require(`${vscodeDir}/${scssStaticSnippetsFile}`)

// Копируем содержимое статического файла
fs.writeFileSync(`${vscodeDir}/${scssSnippetsFile}`, JSON.stringify(scssStaticSnippetsFileContent, null, '\t'))