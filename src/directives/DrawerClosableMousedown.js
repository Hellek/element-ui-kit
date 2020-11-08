export default {
	bind(el, binding, vnode) {
		const instance = vnode.componentInstance

		instance.handleWrapperClick = () => {}

		el.addEventListener('mousedown', e => {
			if (!e.target.className.includes) return

			if (e.target.className.includes('el-drawer__container') && e.target.className.includes('el-drawer__open')) instance.closeDrawer()
		})
	},
}