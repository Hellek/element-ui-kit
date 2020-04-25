const path = require('path')
const KitVueConfigs = require('./vue.configs')

module.exports = {
	...KitVueConfigs.vueConfig,
	configureWebpack: {
		...KitVueConfigs.vueConfig.configureWebpack,
		resolve: {
			alias: {
				KitComponents: path.resolve(__dirname, 'src/components/'),
				KitDirectives: path.resolve(__dirname, 'src/directives/'),
				KitIcons: path.resolve(__dirname, 'src/icons/'),
				KitMixins: path.resolve(__dirname, 'src/mixins/'),
				KitPlugins: path.resolve(__dirname, 'src/plugins/'),
				KitStyles: path.resolve(__dirname, 'src/styles/'),
			},
		},
	},
	chainWebpack: config => {
		KitVueConfigs.rawLoader(config)
	},
}