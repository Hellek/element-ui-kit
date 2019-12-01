export default {
	Router: {},
	routes: [],
	create(Router, routes) {
		this.routes = routes

		this.Router = new Router({
			mode: 'history',
			base: '/',
			routes,
		})

		return this.Router
	},
	ifEmptyPathRedirectToHomePage() {
		this.Router.beforeEach((to, from, next) => {
			if (to.path !== '/' || (to.meta && to.meta.tags && to.meta.tags.includes('homepage'))) {
				next()
				return
			}

			const homepageRouteIndex = this.routes.findIndex(route => route.meta && route.meta.tags && route.meta.tags.includes('homepage'))

			if (homepageRouteIndex > -1) {
				next(this.routes[homepageRouteIndex].path)
			} else {
				next()
			}
		})
	},
	documentTitleDefaultOrCustom() {
		this.Router.beforeEach((to, from, next) => {
			document.title = to.meta.title ? to.meta.title(to) : to.name
			next()
		})
	},
}