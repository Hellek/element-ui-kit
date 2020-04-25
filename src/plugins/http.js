import axios from 'axios'

let httpInstance = {}

if (process.env.VUE_APP_URL_API && process.env.VUE_APP_URL_APIS) {
	throw Error('Запрещено одновременное использование VUE_APP_URL_API и VUE_APP_URL_APIS')
}

if (process.env.VUE_APP_URL_APIS) {
	/*
		Переменная в .env
		VUE_APP_URL_APIS=[{"name":"yandex","baseURL":"https://ya.ru/api"},{"name":"google","baseURL":"https://google.ru"}]

		Пример использования
		this.$http.yandex.get(...)
		this.$http.google.get(...)
	*/
	JSON.parse(process.env.VUE_APP_URL_APIS).forEach(api => {
		httpInstance[api.name] = axios.create({
			baseURL: api.baseURL,
			withCredentials: true,
		})
	})
}

if (process.env.VUE_APP_URL_API) {
	httpInstance = axios.create({
		baseURL: process.env.VUE_APP_URL_API,
		withCredentials: true,
	})
}

export const http = httpInstance

// export as vue plugin
export default {
	install(Vue) {
		Vue.prototype.$http = httpInstance
	},
}