<template>
  <div>
    <div class="columns is-centered">
      <md-tabs md-centered>
	<md-tab md-label="Meus clientes">
	  <div class="columns is-centered">
	    <table class="table">
	      <thead>
		<tr>
		  <th>ID</th>
		  <th>Nome</th>
		  <th>CPF</th>
		  <th>Editar</th>
		  <th>Remover</th>
		</tr>
	      </thead>
	      <tbody>
		<tr v-for="item in clients">
		  <td>{{ item.id_cliente }}</td>
		  <td>{{ item.nome }}</td>
		  <td>{{ item.cpf }}</td>
		  <td><button @click="edit(item.id_cliente, item.nome, item.cpf)">Editar</button></td>
		  <td><button @click="remove(item.id_cliente)">Remover</button></td>
		</tr>
	      </tbody>
	    </table>
	  </div>
	</md-tab>

	<md-tab md-label="Editar">
	  <div class="columns is-centered">
	    <div class="column is-half is-centered">
	      <md-input-container>
		<label>Nome</label>
		<md-textarea v-model="nome" required></md-textarea>
	      </md-input-container>
	      
	      <md-input-container>
		<label>CPF</label>
		<md-textarea v-model="cpf" required></md-textarea>
	      </md-input-container>

	      <md-button class="md-raised md-primary" @click="save()">Salvar</md-button>
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
       clients: [],
       nome: '',
       cpf: '',
       id: ''
     }
   },
   methods: {
     save() {
       this.$http.put('cliente/' + this.id, { nome: this.nome, cpf: this.cpf }, { headers: { Authorization: window.localStorage.token }}).then(successCallback => {
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
     edit(id_cliente, nome, cpf) {
       this.id = id_cliente;
       this.nome = nome;
       this.cpf = cpf
     },
     getData() {
       this.$http.get('cliente', { headers: { Authorization: window.localStorage.token }}).then(response => {
	 if (response.data) {
	   this.clients = response.data;
	 }
       }, response => {
	 swal({
	   title: response.statusText,
	   text: 'Erro: ' + response.status + ', ' + response.body.mensagem,
	   type: 'error'
	 });
       });
     },
     remove(id_cliente) {
       this.$http.delete('cliente/' + id_cliente, { headers: { Authorization: window.localStorage.token }}).then(successCallback => {
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
