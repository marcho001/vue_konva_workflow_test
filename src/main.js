import Vue from 'vue'
import App from './App.vue'
import './index.css'
import VueKonva from 'vue-konva'
import VueCompositionAPI from '@vue/composition-api'
Vue.use(VueCompositionAPI)

Vue.use(VueKonva)

Vue.config.productionTip = false
new Vue({
  render: h => h(App)
}).$mount('#app')
