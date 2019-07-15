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
			if (to.path !== '/') next()

			const homepageRouteIndex = this.routes.findIndex(route => route.meta.tags.includes('homepage'))
			if (this.routes[homepageRouteIndex].path !== '/') next(this.routes[homepageRouteIndex].path)

			next()
		})
	},
	documentTitleDefaultOrCustom() {
		this.Router.beforeEach((to, from, next) => {
			document.title = to.meta.title ? to.meta.title(to) : to.name
			next()
		})
	},
}