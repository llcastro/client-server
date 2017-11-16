<template>
  <div>
    <div class="columns">
      <input class="input is-hovered column is-2" type="text" v-model="username" placeholder="Usuário">
      <input class="input is-hovered column is-2" type="password" v-model="passwd" placeholder="Senha">
      <a class="button is-primary" @click="login()">Logar</a>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
 export default {
   data() {
     return {
       username: '',
       passwd: ''
     }
   },
   methods: {
     login() {
       if(!this.username || !this.passwd) {
	 swal({
	   title: 'Usuário ou senha em branco',
	   type: 'warning'
	 });
       } else {
	 this.$http.put('login', { nome_usuario: this.username, senha: this.passwd }).then(successCallback => {
	   window.localStorage.token = successCallback.body.token;
	   swal({
	     title: 'Sucesso',
	     type: 'success'
	   });
	 }, errorCallback => {
	   swal({
	     title: errorCallback.statusText,
	     text: 'Erro: ' + errorCallback.status + ', ' + errorCallback.body.mensagem,
	     type: 'error'
	   });
	 });
       }
     }
   }
 }
</script>
