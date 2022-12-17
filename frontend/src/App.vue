<script setup>
import HelloWorld from './components/HelloWorld.vue'
import io from 'socket.io-client'
import sendLatLong from './position'
</script>

<template>
  <div src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.1.1/socket.io.js"></div>
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
    <p>距離：{{ distance }}</p>
    <p>方角：{{ direction }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      socket: io('http://localhost:3000'),
      distance: 0.0,
      direction: 0.0
    }
  },
  mounted() {
    this.socket.on('connect', () => {
      console.log('Connected')
    })
    this.socket.on('signal', () => {
      console.log('Signaled!')
      sendLatLong(this.socket)
    })
    this.socket.on('distance', (d, phai) => {
      this.distance = d;
      this.direction = phai;
      console.log(d, phai)
    })
  }
}
</script>

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
