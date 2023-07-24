import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import 'vuetify/dist/vuetify.min.css';
import CustomIcon1 from './assets/icons/customIcon1.svg'

Vue.config.productionTip = false

vuetify.icons = {
  customIcon1: CustomIcon1, 
};


new Vue({
  vuetify,
  render: h => h(App),
}).$mount('#app')
