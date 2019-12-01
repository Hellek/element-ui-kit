function $isFormValid(refName) {
	let isValid = true

	this.$refs[refName].validate(valid => {
		isValid = valid
	})

	return isValid
}

export default {
	install(Vue) {
		Vue.prototype.$isFormValid = $isFormValid
	},
}