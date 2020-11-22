async function $notifyUserAboutError(error) {
	const title = 'Ошибка'

	if (typeof error === 'string') {
		this.$notify.error({ title, message: error })
		return
	}

	if (error.disableUserNotice) return

	if (!error.response) {
		this.$notify.error({ title, message: error.message })
		return
	}

	const { response } = error

	this.$notify.error({
		title: response.statusText,
		message: response.data,
	})
}

export default {
	install(Vue) {
		Vue.prototype.$notifyUserAboutError = $notifyUserAboutError
	},
}