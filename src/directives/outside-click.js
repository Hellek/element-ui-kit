export default {
	bind(el, binding, vnode) {
		el.clickOutsideEvent = function (event) {
			// here I check that click was outside the el and his childrens
			if (!(el === event.target || el.contains(event.target))) {
				// and if it did, call method provided in attribute value
				// если передали аргумент, то берём его v-outside-click:[customData]="callbackFunc"
				vnode.context[binding.expression](binding.arg || event)
			}
		}
		document.body.addEventListener('click', el.clickOutsideEvent)
	},
	unbind(el) {
		document.body.removeEventListener('click', el.clickOutsideEvent)
	},
}