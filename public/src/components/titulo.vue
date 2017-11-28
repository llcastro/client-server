<template>
  <div>
    <div class="columns is-centered">
      <md-tabs md-centered>
	<md-tab md-label="Meus titulos">
	  <div class="columns is-centered">
	    <table class="table">
	      <thead>
		<tr>
		  <th>ID titulo</th>
		  <th>ID cliente</th>
		  <th>ID parceiro</th>
		  <th>Valor</th>
		  <th>Data emissão</th>
		  <th>Data pagamento</th>
		  <th>Situação</th>
		  <th>Descrição</th>
		  <th>Editar</th>
		  <th>Remover</th>
		</tr>
	      </thead>
	      <tbody>
		<tr v-for="item in titles">
		  <td>{{ item.id_titulo }}</td>
		  <td>{{ item.id_cliente }}</td>
		  <td>{{ item.id_parceiro }}</td>
		  <td>{{ item.valor }}</td>
		  <td>{{ item.data_emissao }}</td>
		  <td>{{ item.data_pagamento }}</td>
		  <td>{{ item.situacao }}</td>
		  <td>{{ item.descricao }}</td>
		  <td><button @click="edit(item.id_titulo, item.id_cliente, item.id_parceiro, item.valor, item.data_emissao, item.data_pagamento, item.situacao, item.descricao)">Editar</button></td>
		  <td><button @click="remove(item.id_titulo)">Remover</button></td>
		</tr>
	      </tbody>
	    </table>
	  </div>
	</md-tab>

	<md-tab md-label="Editar">
	  <div class="columns is-centered">
	    <div class="column is-half is-centered">
	      <md-input-container>
		<label>ID Cliente</label>
		<md-textarea v-model="id_cliente" required></md-textarea>
	      </md-input-container>

	      <md-input-container>
		<label>ID parceiro</label>
		<md-textarea v-model="id_parceiro" required></md-textarea>
	      </md-input-container>

	      <md-input-container>
		<label>Valor</label>
		<md-textarea v-model="valor" required></md-textarea>
	      </md-input-container>

	      <md-input-container>
		<label>Data Emissão</label>
		<md-textarea v-model="data_emissao" required></md-textarea>
	      </md-input-container>

	      <md-input-container>
		<label>Data pagamento</label>
		<md-textarea v-model="data_pagamento"></md-textarea>
	      </md-input-container>

	      <md-input-container>
		<label>Situação</label>
		<md-textarea v-model="situacao" required></md-textarea>
	      </md-input-container>

	      <md-input-container>
		<label>Descrição</label>
		<md-textarea v-model="descricao" required></md-textarea>
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
       titles: [],
       id_titulo: '',
       id_cliente: '',
       id_parceiro: '',
       valor: '',
       data_emissao: '',
       data_pagamento: '',
       situacao: '',
       descricao: ''
     }
   },
   methods: {
     save() {
       this.$http.put('titulo/' + this.id_titulo, { valor: this.valor, data_emissao: this.data_emissao, data_pagamento: this.data_pagamento, situacao: this.situacao, descricao: this.descricao }, { headers: { Authorization: window.localStorage.token }}).then(successCallback => {
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
     edit(id_titulo, id_cliente, id_parceiro, valor, data_emissao, data_pagamento, situacao, descricao) {
       this.id_titulo = id_titulo;
       this.id_cliente = id_cliente;
       this.id_parceiro = id_parceiro;
       this.valor = valor;
       this.data_emissao = data_emissao;
       this.data_pagamento = data_pagamento;
       this.situacao = situacao;
       this.descricao = descricao;
     },
     getData() {
       this.$http.get('titulo', { headers: { Authorization: window.localStorage.token }}).then(response => {
	 if (response.data) {
	   this.titles = response.data;
	 }
       }, response => {
	 swal({
	   title: response.statusText,
	   text: 'Erro: ' + response.status + ', ' + response.body.mensagem,
	   type: 'error'
	 });
       });
     },
     remove(id_titulo) {
       this.$http.delete('titulo/' + id_titulo, { headers: { Authorization: window.localStorage.token }}).then(successCallback => {
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
