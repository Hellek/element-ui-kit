export default {
	bind(el, binding, vnode) {
		const instance = vnode.componentInstance

		instance.$watch('options', {
			immediate: true,
			handler: options => {
				if (instance.value || options.length !== 1) return

				const option = options[0]

				instance.$emit('input', option.value)
				instance.emitChange(option.value)
			},
		})
	},
}