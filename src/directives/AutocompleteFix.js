function handleChange(value) {
	this.$emit('change', value)
}

export default {
	bind(el, binding, vnode) {
		const instance = vnode.componentInstance

		instance.handleChange = handleChange.bind(instance)
	},
}