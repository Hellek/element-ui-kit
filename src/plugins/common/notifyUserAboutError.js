function $notifyUserAboutError(anyTypeError) {
	if (typeof anyTypeError === 'string') {
		this.$notify.error({
			title: 'Ошибка',
			message: anyTypeError,
		})

		return
	}

	const { response } = anyTypeError

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