<template>
  <div>
    <div class="columns is-centered">
      <md-tabs md-centered>
	  <md-tab md-label="Pesquisar">
	    <div class="columns is-centered">
	      <div class="column is-half is-centered">
		<md-input-container>
		  <label>CPF do cliente</label>
		  <md-textarea v-model="cpf" required></md-textarea>
		</md-input-container>

		<md-button class="md-raised md-primary" @click="search()">Pesquisar</md-button>
	      </div>
	    </div>
	  </md-tab>

	  <md-tab md-label="Títulos">
	    <div class="columns is-centered">
	      <table class="table">
		<thead>
		  <tr>
		    <th>ID título</th>
		    <th v-if="token">ID parceiro</th>
		    <th v-if="token">ID cliente</th>
		    <th v-if="token">Valor</th>
		    <th>Descrição</th>
		    <th>Situação</th>
		    <th v-if="token">Data pagamento</th>
		    <th v-if="token">Data emissão</th>
		  </tr>
		</thead>
		<tbody>
		  <tr v-for="item in clients">
		    <td>{{ item.id_titulo }}</td>
		    <td v-if="token">{{ item.id_parceiro }}</td>
		    <td v-if="token">{{ item.id_cliente }}</td>
		    <td v-if="token">{{ item.valor }}</td>
		    <td>{{ item.descricao }}</td>
		    <td>{{ item.situacao }}</td>
		    <td v-if="token">{{ item.data_pagamento }}</td>
		    <td v-if="token">{{ item.data_emissao }}</td>
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
       clients: [],
       cpf: '',
       token: null
     }
   },
   methods: {
     search() {
       if (!this.cpf) {
	 swal({
	   title: 'CPF vazio',
	   text: 'Favor digitar um CPF',
	   type: 'warning'
	 });
       } else {
	 if (window.localStorage.token) {
	   this.getDataPartner();
	 } else {
	   this.getDataClient();
	 }
       }
     },
     getDataPartner() {
       this.$http.get('consulta/parceiro/' + this.cpf, { headers: { Authorization: window.localStorage.token }}).then(response => {
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
     getDataClient() {
       this.$http.get('consulta/cliente/' + this.cpf).then(response => {
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
     }
   },
   beforeMount() {
     this.token = window.localStorage.token;
   }
 }
</script>
