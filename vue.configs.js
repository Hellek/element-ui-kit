const path = require('path')

let analyzerPort = null

if (process.env.VUE_APP_MODE === 'development') {
	const findFreePort = require('find-free-port-sync') // eslint-disable-line global-require

	analyzerPort = findFreePort({
		start: 8000,
		end: 9000,
	})
}

function addSlashInTheEndIfHasNo(str) {
	return `${str.replace(/\/$/, '')}/`
}

module.exports.getAliases = function ({
	dirname,
	useLocalKit = false,
	localKitPath = '',
	assignAliases = {},
}) {
	const aliases = {
		Assets: path.resolve(dirname, 'src/assets/'),
		Images: path.resolve(dirname, 'src/assets/images/'),
		Styles: path.resolve(dirname, 'src/assets/styles/'),
		Components: path.resolve(dirname, 'src/components/'),
		Helpers: path.resolve(dirname, 'src/helpers/'),
		Mixins: path.resolve(dirname, 'src/mixins/'),
		Pages: path.resolve(dirname, 'src/pages/'),
		Plugins: path.resolve(dirname, 'src/plugins/'),
		Utils: path.resolve(dirname, 'src/utils/'),
	}

	if (useLocalKit && localKitPath === '') {
		throw Error(`If getAliases() has { useLocalKit: true }, you should set 'localKitPath'\nFor example: getAliases({ useLocalKit: true, localKitPath: 'C:/Users/user/element-ui-kit/' })`)
	}

	let kitPath = useLocalKit ? localKitPath : 'node_modules/element-ui-kit/'
	kitPath = addSlashInTheEndIfHasNo(kitPath)

	Object.assign(aliases, {
		KitComponents: path.resolve(`${kitPath}src/components/`),
		KitDirectives: path.resolve(`${kitPath}src/directives/`),
		KitIcons: path.resolve(`${kitPath}src/icons/`),
		KitMixins: path.resolve(`${kitPath}src/mixins/`),
		KitPlugins: path.resolve(`${kitPath}src/plugins/`),
		KitStyles: path.resolve(`${kitPath}src/styles/`),
		KitUtils: path.resolve(`${kitPath}src/utils/`),
	})

	Object.keys(assignAliases).forEach(alias => {
		if (Object.hasOwnProperty.call(assignAliases, alias)) {
			aliases[alias] = path.resolve(`${kitPath}${assignAliases[alias]}`)
		}
	})

	return aliases
}

// npm i -D raw-loader@2.0.0
module.exports.rawLoader = function (config) {
	config.module
		.rule('raw-loader')
		.test(/\.xml$/)
		.use('raw-loader')
		.loader('raw-loader')
		.end()
}

// npm i -D vue-i18n@8.8.1 @kazupon/vue-i18n-loader@0.3.0
module.exports.i18nLoader = function (config) {
	config.module
		.rule('i18n')
		.resourceQuery(/blockType=i18n/)
		.type('javascript/auto')
		.use('i18n')
		.loader('@kazupon/vue-i18n-loader')
		.end()
}

module.exports.vueConfig = {
	transpileDependencies: [
		'element-ui-kit',
	],
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
		lintOnBuild: true,
		lintStyleOnBuild: true,
	},
}