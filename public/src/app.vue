<template>
  <div>
    <md-toolbar class="md-medium columns md-fixed">
      <md-button class="md-icon-button" @click="toggleLeftSidenav">
	<md-icon>menu</md-icon>
      </md-button>
      
      <h1 class="md-title">Serasa</h1>
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
 import vue from 'vue';
 import vuerouter from 'vue-router';

 vue.use(vuerouter);
 
 export default {
   data() {
     return {
     }
   },
   methods: {
     loadCategory(category) {
       console.log(category);
     },
     toggleLeftSidenav() {
       this.$refs.leftSidenav.toggle();
     },
     loadCategory(category) {
       this.$refs.leftSidenav.close();
       this.$router.push({ name: category });
     }
   },
   beforeMount() {
     this.$router.push({ name: 'home' });
   }
 }
</script>
