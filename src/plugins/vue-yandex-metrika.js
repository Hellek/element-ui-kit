import Vue from 'vue'
import VueYandexMetrika from 'vue-yandex-metrika'
import router from 'Plugins/router' // eslint-disable-line import/no-unresolved

export default Vue.use(VueYandexMetrika, {
	id: Number(process.env.VUE_APP_PLUGIN_YA_METRIKA_ID),
	router,
	scriptSrc: 'https://mc.yandex.ru/metrika/tag.js',
	env: process.env.VUE_APP_MODE,
})