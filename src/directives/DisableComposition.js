export default {
	bind(el, binding, vnode) {
		let instance = {}

		if (vnode.componentInstance.handleComposition) {
			// el-select multiple
			vnode.componentInstance.handleComposition = () => {}

			// el-select
			instance = vnode.componentInstance.$refs.reference
		} else {
			// el-input || el-autocomplete
			instance = vnode.componentInstance.handleCompositionStart ? vnode.componentInstance : vnode.componentInstance.$refs.input
		}

		instance.handleCompositionStart = () => {}
		instance.handleCompositionUpdate = () => {}
	},
}