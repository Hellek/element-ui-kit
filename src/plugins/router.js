const isHomePageRoute = route => route.meta && route.meta.tags && route.meta.tags.includes('homepage')

function getHomePagePath(routes, path = '') {
	for (let i = 0; i < routes.length; i += 1) {
		const route = routes[i]
		const newPath = `${path}/${route.path}`

		if (isHomePageRoute(route)) return newPath
		if (route.children) return getHomePagePath(route.children, newPath)
	}

	return ''
}

export default {
	Router: {},
	routes: [],
	homepagePath: '',
	create(Router, routes) {
		this.routes = routes

		this.Router = new Router({
			mode: 'history',
			base: '/',
			routes,
		})

		this.homepagePath = (getHomePagePath(this.routes) || '').replace(/\/\//g, '/')

		return this.Router
	},
	ifEmptyPathRedirectToHomePage() {
		this.Router.beforeEach((to, from, next) => {
			if (to.path === '/') {
				if (this.homepagePath) {
					next(this.homepagePath)
				} else {
					next()
				}
			} else {
				next()
			}
		})
	},
}