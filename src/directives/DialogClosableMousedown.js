export default {
	bind(el, binding, vnode) {
		const instance = vnode.componentInstance

		instance.handleWrapperClick = () => {}

		el.addEventListener('mousedown', e => {
			if (!e.target.className.includes) return

			if (e.target.className.includes('el-dialog__wrapper')) instance.handleClose()
		})
	},
}