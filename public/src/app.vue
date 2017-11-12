<template>
  <div>
    <md-toolbar class="md-medium columns md-fixed">
      <md-button class="md-icon-button" @click="toggleLeftSidenav">
	<md-icon>menu</md-icon>
      </md-button>
      
      <h1 class="md-title" style="flex: 1">Serasa</h1>

      <md-button v-if="this.$cookie.get('token')" class="md-raised" @click="logout()">Logout</md-button>
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
     return {}
   },
   methods: {
     toggleLeftSidenav() {
       this.$refs.leftSidenav.toggle();
     },
     loadCategory(category) {
       if (!this.$cookie.get('token')) {
	 swal({
	   title: 'Acesso não autorizado',
	   text: 'Usuário não logado',
	   type: 'warning'
	 });
	 return;
       }
       this.$refs.leftSidenav.close();
       this.$router.push({ name: category });
     },
     logout() {
       this.$http.put('logout').then(successCallback => {
	 swal({
	   title: 'Sucesso',
	   text: successCallback.body.mensagem,
	   type: 'success'
	 });
	 this.$cookie.delete('token');
	 this.$router.push({ name: 'home' });
       }, errorCallback => {
	 swal({
	   title: errorCallback.statusText,
	   text: 'Erro: ' + errorCallback.status + ', ' + errorCallback.body.mensagem,
	   type: 'error'
	 });
       });
     }
   },
   beforeMount() {
     this.$router.push({ name: 'home' });
   }
 }
</script>
