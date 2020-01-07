import axios from 'axios'

const options = {
	baseURL: process.env.VUE_APP_URL_API,
	withCredentials: true,
}

// as js object
export const http = axios.create(options)

// as vue plugin
export default {
	install(Vue) {
		Vue.prototype.$http = http
	},
}