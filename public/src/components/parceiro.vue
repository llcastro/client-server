<template>
  <div>
    <div class="columns is-centered">
      <md-tabs md-centered>
	<md-tab md-label="Cadastrar">
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
	</md-tab>

	
	<md-tab md-label="Lista">
	  <div class="columns is-centered">
	    <table class="table">
	      <thead>
		<tr>
		  <th>CNPJ</th>
		  <th>Nome Fantasia</th>
		  <th>Razao Social</th>
		  <th>Nome</th>
		  <th>E-mail</th>
		</tr>
	      </thead>
	      <tbody>
		<tr v-for="item in parceiros" :key="item.id">
		  <td>{{ item.cnpj }}</td>
		  <td>{{ item.nome_fantasia }}</td>
		  <td>{{ item.razao_social }}</td>
		  <td>{{ item.nome_usuario }}</td>
		  <td>{{ item.email }}</td>
		</tr>
	      </tbody>
	    </table>
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
       parceiros: [],
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
       this.$http.post('parceiro', { cnpj: this.cnpj, nome_fantasia: this.nome_fantasia, razao_social: this.razao_social, email: this.email, nome_usuario: this.nome_usuario, senha: this.senha }).then(successCallback => {
	 swal({
	   title: 'Sucesso',
	   text: successCallback.body.message,
	   type: 'success'
	 });
	 this.list();
       }, errorCallback => {
	 swal({
	   title: errorCallback.statusText,
	   text: 'Erro: ' + errorCallback.status,
	   type: 'error'
	 });
       });
     },
     list() {
       this.$http.get('parceiro').then(response => {
	 this.parceiros = response.data;
       }, response => {
	 swal({
	   title: response.statusText,
	   text: 'Erro: ' + response.status + ', ' + response.body.mensagem,
	   type: 'error'
	 });
       });
     }
   },
   beforeMount() {
     this.list();
   }
   
 }
</script>
