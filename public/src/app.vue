<template>
  <div>
    <md-toolbar class="md-medium columns md-fixed">
      <md-button class="md-icon-button" @click="toggleLeftSidenav">
	<md-icon>menu</md-icon>
      </md-button>
      
      <h1 class="md-title" style="flex: 1">Serasa</h1>

      <md-button v-if="!logged" class="md-raised" @click="home()">Login</md-button>
      <md-button v-if="logged" class="md-raised" @click="logout()">Logout</md-button>
    </md-toolbar>

    <md-sidenav class="md-left" ref="leftSidenav">
      <md-toolbar class="md-medium">
	<div class="md-toolbar-container">
	  <h3 class="md-title">Categorias</h3>
	</div>
      </md-toolbar>

      <md-list-item @click="loadCategory('parceiro')"
		    href="">
	Parceiro
      </md-list-item>
    </md-sidenav>
    
    <router-view></router-view>
  </div>
</template>

<script>
 export default {
   data() {
     return {
       logged: false
     }
   },
   methods: {
     toggleLeftSidenav() {
       this.$refs.leftSidenav.toggle();
     },
     loadCategory(category) {
       this.$refs.leftSidenav.close();
       this.$router.push({ name: category });
     },
     home() {
       this.$router.push({ name: 'home'});
     },
     logout() {
       this.$http.put('logout').then(successCallback => {
	 swal({
	   title: 'Sucesso',
	   text: successCallback.body.mensagem,
	   type: 'success'
	 });
	 this.$cookie.delete('token');
	 this.logged = false;
	 this.home();
       }, errorCallback => {
	 swal({
	   title: errorCallback.statusText,
	   text: 'Erro: ' + errorCallback.status + ', ' + errorCallback.body.mensagem,
	   type: 'error'
	 });
       });
     },
     getCookie() {
       console.log('app.vue, token:', this.$cookie.get('token'));
       if (this.$cookie.get('token')) {
	 this.logged = true;
       } else {
	 this.logged = false;
       }
     }
   },
   beforeMount() {
     this.getCookie();
     this.$router.push({ name: 'home' });
   }
 }
</script>
