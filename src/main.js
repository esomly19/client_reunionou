import Vue from 'vue'
import VueClipboard from 'vue-clipboard2';
import App from './App.vue'
import router from './router'
import 'bootstrap';
import VModal from "vue-js-modal";
import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import VueMapbox from "vue-mapbox";
import Mapbox from "mapbox-gl";

Vue.use(VueMapbox, { mapboxgl: Mapbox });
Vue.config.productionTip = false;
Vue.use(VueClipboard);
Vue.use(VModal);
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
