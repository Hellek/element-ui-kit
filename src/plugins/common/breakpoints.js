const breakpoints = {
	sm: 420,
	md: 768,
	lg: 992,
	xl: 1440,
}

function defaultData() {
	return {
		xs: true,
		xsOnly: true,
		...Object.keys(breakpoints).reduce((obj, bp, index) => {
			obj[bp] = false

			if (index < Object.keys(breakpoints).length - 1) {
				obj[`${bp}Only`] = false
				obj[`${bp}AndUp`] = false
				obj[`${bp}AndDown`] = false
			}

			return obj
		}, {}),
	}
}

function $onResize() {
	const width = window.outerWidth
	this.$breakpoints.xs = width >= 0
	this.$breakpoints.xsOnly = width < breakpoints.sm

	const breakpointNames = Object.keys(breakpoints)

	breakpointNames.forEach((breakpoint, index) => {
		this.$breakpoints[breakpoint] = width >= breakpoints[breakpoint]

		if (index === breakpointNames.length - 1) {
			this.$breakpoints[`${breakpoint}Only`] = width >= breakpoints[breakpoint]
		} else {
			const andUp = width >= breakpoints[breakpoint]
			const andDown = width < breakpoints[breakpointNames[index + 1]]

			this.$breakpoints[`${breakpoint}AndUp`] = andUp
			this.$breakpoints[`${breakpoint}AndDown`] = andDown
			this.$breakpoints[`${breakpoint}Only`] = andUp && andDown
		}
	})
}

export default {
	install(Vue) {
		Vue.prototype.$breakpoints = defaultData()
		Vue.observable(Vue.prototype.$breakpoints)

		window.addEventListener('resize', $onResize.bind(Vue.prototype))

		$onResize.call(Vue.prototype)
	},
}