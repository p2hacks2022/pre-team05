<script setup>
import HelloWorld from './components/HelloWorld.vue'
import io from 'socket.io-client'
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
  あずらた
  <div>
    <p>緯度：{{ totalPrice }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      socket: io('http://localhost:3000')
    }
  },
  mounted() {
    this.socket.on('connect', () =>{
      console.log('Connected')
    })
    this.socket.on('signal', () => {
      console.log('Signaled!')
    })
  }
}
</script>

<<<<<<< HEAD
<style scoped>
button {
  font-weight: bold;
}
</style>

=======
>>>>>>> origin/azurata
<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
