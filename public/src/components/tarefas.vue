<template>
  <div>
    <div class="columns is-centered">
      <div class="column is-half is-centered">
	<md-input-container>
	  <md-icon>speaker_notes</md-icon>
	  <label>Tarefa</label>
	  <md-textarea></md-textarea>
	</md-input-container>
      </div>
      <div class="column is-2">
	<md-button class="md-raised md-primary">Add</md-button>
      </div>
    </div>

    <div class="columns is-centered">
      <md-list>
	<md-list-item>
	  <md-checkbox class="md-warn"></md-checkbox>
	  <span>item 1</span>
	  <md-button class="md-raised md-primary md-mini">
	    <md-icon>delete</md-icon>
	  </md-button>
	</md-list-item>

	<md-list-item>
	  <md-checkbox class="md-warn"></md-checkbox>
	  <span>item 2</span>
	  <md-button class="md-raised md-primary md-mini">
	    <md-icon>delete</md-icon>
	  </md-button>
	</md-list-item>

	<md-list-item>
	  <md-checkbox class="md-warn"></md-checkbox>
	  <span>item 3</span>
	  <md-button class="md-raised md-primary md-mini">
	    <md-icon>delete</md-icon>
	  </md-button>
	</md-list-item>
      </md-list>
    </div>
    
    <router-view></router-view>
  </div>
</template>

<script>
 export default {
   
 }
</script>
