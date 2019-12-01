function $notifyUserAboutError(anyTypeError) {
	if (typeof anyTypeError === 'string') {
		this.$notify.error(anyTypeError)
		return
	}

	if (!anyTypeError.response) {
		this.$notify.error(anyTypeError.message)
		return
	}

	const { response } = anyTypeError

	if (!response.data) {
		this.$notify.error(response)
		return
	}

	if (response.data.errors) {
		let message = ''

		Object.keys(response.data.errors).forEach(e => {
			message += `${e} ${response.data.errors[e].msg}<br>`
		})

		this.$notify.error({
			title: response.status,
			dangerouslyUseHTMLString: true,
			message,
		})

		return
	}

	this.$notify.error({
		title: response.data.status || response.status,
		message: response.data.error || response.data.message,
	})
}

export default {
	install(Vue) {
		Vue.prototype.$notifyUserAboutError = $notifyUserAboutError
	},
}