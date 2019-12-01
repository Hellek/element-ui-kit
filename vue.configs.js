const path = require('path')
const findFreePort = require('find-free-port-sync')

const analyzerPort = findFreePort({
	start: 8000,
	end: 9000,
})

function addSlashInTheEndIfHasNo(str) {
	return `${str.replace(/\/$/, '')}/`
}

module.exports = {
	configureWebpack: {
		devServer: {
			open: true,
		},
		devtool: process.env.VUE_APP_MODE === 'development' ? 'source-map' : 'nosources-source-map',
	},
	pluginOptions: {
		webpackBundleAnalyzer: {
			analyzerMode: 'disabled', // В 99,99% запусков сервера и билдов мы не используем analyzer, но если вдруг, то 'server', 'static'
			openAnalyzer: false,
			analyzerPort,
		},
		lintOnBuild: false,
		lintStyleOnBuild: false,
	},
	getAliases({
		dirname,
		useLocalKit = false,
		localKitPath = '',
		assignAliases = {},
	}) {
		const aliases = {
			Styles: path.resolve(dirname, 'src/assets/styles/'),
			Pages: path.resolve(dirname, 'src/pages/'),
			Components: path.resolve(dirname, 'src/components/'),
			Plugins: path.resolve(dirname, 'src/plugins/'),
			Images: path.resolve(dirname, 'src/assets/images/'),
			Mixins: path.resolve(dirname, 'src/mixins/'),
		}

		if (useLocalKit && localKitPath === '') {
			throw Error(`If getAliases() has { useLocalKit: true }, you should set 'localKitPath'\nFor example: getAliases({ useLocalKit: true, localKitPath: 'C:/Users/user/element-ui-kit/' })`)
		}

		let kitPath = useLocalKit ? localKitPath : 'node_modules/element-ui-kit/'
		kitPath = addSlashInTheEndIfHasNo(kitPath)

		Object.assign(aliases, {
			KitComponents: path.resolve(`${kitPath}src/components/`),
			KitMixins: path.resolve(`${kitPath}src/mixins/`),
			KitPlugins: path.resolve(`${kitPath}src/plugins/`),
			KitStyles: path.resolve(`${kitPath}src/styles/`),
		})

		Object.keys(assignAliases).forEach(alias => {
			if (Object.hasOwnProperty.call(assignAliases, alias)) {
				aliases[alias] = path.resolve(`${kitPath}${assignAliases[alias]}`)
			}
		})

		return aliases
	},
	/*
	// npm i -D raw-loader@2.0.0
	rawLoader(config) {
		config.module
			.rule('raw-loader')
			.test(/\.xml$/)
			.use('raw-loader')
			.loader('raw-loader')
			.end()
	},
	// npm i -D vue-i18n@8.8.1 @kazupon/vue-i18n-loader@0.3.0
	i18nLoader(config) {
		config.module
			.rule('i18n')
			.resourceQuery(/blockType=i18n/)
			.type('javascript/auto')
			.use('i18n')
			.loader('@kazupon/vue-i18n-loader')
			.end()
	},
	*/
}