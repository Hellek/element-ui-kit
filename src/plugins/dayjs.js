import dayjsOriginal from 'dayjs'
import 'dayjs/locale/ru'

dayjsOriginal.locale('ru')

// as js object
export const dayjs = dayjsOriginal

// as vue plugin
export default {
	install(Vue) {
		Vue.prototype.$dayjs = dayjsOriginal
	},
}