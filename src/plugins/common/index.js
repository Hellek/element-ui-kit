import notifyUserAboutError from './notifyUserAboutError'
import isFormValid from './isFormValid'
import breakpoints from './breakpoints'
import gutter from './gutter'

const plugins = [
	notifyUserAboutError,
	isFormValid,
	breakpoints,
	gutter,
]

export default {
	install(Vue, options = null) {
		plugins.forEach(plugin => plugin.install(Vue, options))
	},
}