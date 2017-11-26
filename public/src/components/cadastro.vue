<template>
  <div>
    <div class="columns is-centered">
      <md-tabs md-centered>
	<md-tab md-label="Parceiro">
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

	    <md-button class="md-raised md-primary" @click="add_parceiro()">Add</md-button>
	  </div>
	</md-tab>

	<md-tab md-label="Cliente">
	  <div class="columns is-centered">
	    <div class="column is-half is-centered">
	      <md-input-container>
		<label>Nome</label>
		<md-textarea v-model="nome_cliente" required></md-textarea>
	      </md-input-container>
	      
	      <md-input-container>
		<label>CPF</label>
		<md-textarea v-model="cpf_cliente" required></md-textarea>
	      </md-input-container>

	      <md-button class="md-raised md-primary" @click="add_cliente()">Add</md-button>
	    </div>
	  </div>
	</md-tab>
	
      </md-tabs>
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
       senha: '',
       nome_cliente: '',
       cpf_cliente: ''
     }
   },
   methods: {
     add_parceiro() {
       this.$http.post('parceiro', { cnpj: this.cnpj, nome_fantasia: this.nome_fantasia, razao_social: this.razao_social, email: this.email, nome_usuario: this.nome_usuario, senha: this.senha }).then(successCallback => {
	 swal({
	   title: 'Sucesso',
	   text: successCallback.body.mensagem,
	   type: 'success'
	 });
       }, errorCallback => {
	 swal({
	   title: errorCallback.statusText,
	   text: 'Erro: ' + errorCallback.status + ', ' + errorCallback.body.mensagem,
	   type: 'error'
	 });
       });
     },
     add_cliente() {
       this.$http.post('cliente', { cpf: this.cpf_cliente, nome: this.nome_cliente }, { headers: { Authorization: window.localStorage.token }}).then(successCallback => {
	 swal({
	   title: 'Sucesso',
	   text: successCallback.body.mensagem,
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
</script>
