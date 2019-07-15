import dayjsOriginal from 'dayjs'
import 'dayjs/locale/ru'

dayjsOriginal.locale('ru')

// dayjsOriginal.extend(require('dayjs/plugin/weekOfYear'))
// dayjsOriginal.extend(require('dayjs/plugin/relativeTime'))

// as js object
export const dayjs = dayjsOriginal

// as vue plugin
export default {
	install(Vue) {
		Vue.prototype.$dayjs = dayjsOriginal
	},
}