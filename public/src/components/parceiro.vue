<template>
  <div>
    <div class="columns is-centered">
      <md-tabs md-centered>
	<md-tab md-label="Meus dados">
	  <div class="columns is-centered">
	    <table class="table">
	      <thead>
		<tr>
		  <th>Nome Fantasia</th>
		  <th>Razao Social</th>
		  <th>E-mail</th>
		</tr>
	      </thead>
	      <tbody>
		<tr>
		  <td>{{ nome_fantasia }}</td>
		  <td>{{ razao_social }}</td>
		  <td>{{ email }}</td>
		</tr>
	      </tbody>
	    </table>
	  </div>
	</md-tab>

	<md-tab md-label="Editar">
	  <div class="columns is-centered">
	    <div class="column is-half is-centered">
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
		<label>Senha</label>
		<md-textarea v-model="senha" required></md-textarea>
	      </md-input-container>

	      <md-button class="md-raised md-primary" @click="edit()">Editar</md-button>
	      <md-button class="md-raised md-primary" @click="remove()">Desativar</md-button>
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
       nome_fantasia: '',
       razao_social: '',
       email: '',
       senha: ''
     }
   },
   methods: {
     edit() {
       this.$http.put('parceiro', { nome_fantasia: this.nome_fantasia, razao_social: this.razao_social, email: this.email, senha: this.senha }, { headers: { Authorization: window.localStorage.token }}).then(successCallback => {
	 swal({
	   title: 'Sucesso',
	   text: successCallback.body.mensagem,
	   type: 'success'
	 });
	 this.getData();
       }, errorCallback => {
	 swal({
	   title: errorCallback.statusText,
	   text: 'Erro: ' + errorCallback.status + ', ' + errorCallback.body.mensagem,
	   type: 'error'
	 });
       });
     },
     getData() {
       this.$http.get('parceiro', { headers: { Authorization: window.localStorage.token }}).then(response => {
	 if (response.data) {
	   this.nome_fantasia = response.data.nome_fantasia ;
	   this.razao_social = response.data.razao_social;
	   this.email = response.data.email;
	 }
       }, response => {
	 swal({
	   title: response.statusText,
	   text: 'Erro: ' + response.status + ', ' + response.body.mensagem,
	   type: 'error'
	 });
       });
     },
     remove() {
       this.$http.delete('parceiro', { headers: { Authorization: window.localStorage.token }}).then(successCallback => {
	 swal({
	   title: 'Sucesso',
	   text: successCallback.body.mensagem,
	   type: 'success'
	 });
	 this.getData();
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
     this.getData();
   }
   
 }
</script>
