<template>
  <div>
    <div class="columns is-centered">
      <div class="column is-half is-centered">
	<md-input-container>
	  <label>CNPJ</label>
	  <md-textarea v-model="cnpj" required></md-textarea>
	</md-input-container>
	
	<md-input-container>
	  <label>Nome fantasia</label>
	  <md-textarea v-model="nome_fantasia" required></md-textarea>
	</md-input-container>
	
	<md-input-container>
	  <label>Razão social</label>
	  <md-textarea v-model="razao_social" required></md-textarea>
	</md-input-container>
	
	<md-input-container>
	  <label>e-mail</label>
	  <md-textarea v-model="email" required></md-textarea>
	</md-input-container>
	
	<md-input-container>
	  <label>Nome usuário</label>
	  <md-textarea v-model="nome_usuario" required></md-textarea>
	</md-input-container>
	
	<md-input-container>
	  <label>Senha</label>
	  <md-textarea v-model="senha" required></md-textarea>
	</md-input-container>

	<md-button class="md-raised md-primary" @click="add()">Add</md-button>
      </div>
    </div>
    
    <router-view></router-view>
  </div>
</template>

<script>
 export default {
   data() {
     return {
       cnpj: '',
       nome_fantasia: '',
       razao_social: '',
       email: '',
       nome_usuario: '',
       senha: ''
     }
   },
   methods: {
     add() {
       this.$http.post('./parceiro', { cnpj: this.cnpj, nome_fantasia: this.nome_fantasia, razao_social: this.razao_social, email: this.email, nome_usuario: this.nome_usuario, senha: this.senha }).then(successCallback => {
	 console.log(successCallback);
	 swal({
	   title: 'Sucesso',
	   text: successCallback.body.message,
	   type: 'success'
	 });
       }, errorCallback => {
	 console.log(errorCallback);
	 swal({
	   title: errorCallback.statusText,
	   text: 'Erro: ' + errorCallback.status,
	   type: 'error'
	 });
       });
     }
   }
   
 }
</script>
