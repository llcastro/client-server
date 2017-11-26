import vue from 'vue';
import vuerouter from 'vue-router';
import 'vue-material/dist/vue-material.css';
import vue_material from 'vue-material';
import vue_resource from 'vue-resource';
import 'bulma/css/bulma.css';
import swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import conf from '../conf.json';

import app from './app.vue';
import home from './components/home.vue';
import cadastro from './components/cadastro.vue';
import tarefas from './components/tarefas.vue';
import parceiro from './components/parceiro';
import cliente from './components/cliente';

vue.use(vuerouter);
vue.use(vue_material);
vue.use(vue_resource);

vue.http.options.root = conf.host.root;
window.swal = swal;
window.vue = vue;

const router = new vuerouter({
  base: __dirname,
  routes: [
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/tarefas',
      name: 'tarefas',
      component: tarefas
    },
    {
      path: '/parceiro',
      name: 'parceiro',
      component: parceiro
    },
    {
      path: '/cadastro',
      name: 'cadastro',
      component: cadastro
    },
    {
      path: '/cliente',
      name: 'cliente',
      component: cliente
    }
  ]
});

new vue({
  el: '#app',
  router,
  template: '<app></app>',
  components: { app }
});
