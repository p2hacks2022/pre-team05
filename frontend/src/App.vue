<script setup>
import HelloWorld from './components/HelloWorld.vue'
import io from 'socket.io-client'
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
    this.socket.on('connect', () => {
      console.log('Connected')
    })
    this.socket.on('signal', () => {
      console.log('Signaled!')

      //ここから
      const ReturnLatLong = (Long, Lat) => {
        return new Promise((resolve, reject) => {
          var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
          };

          var crd;
          function success(pos) {
            crd = pos.coords;

            console.log('Your current position is:');
            console.log(`Latitude : ${crd.latitude}`);
            console.log(`Longitude: ${crd.longitude}`);
            console.log(`More or less ${crd.accuracy} meters.`);
            Long = crd.latitude;
            Lat = crd.longitude;
            console.log("Long = "+Long);
            console.log("Lat = "+Lat);
            resolve(Long, Lat);
          }

          function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
          }

          navigator.geolocation.getCurrentPosition(success, error, options);
        })
      }

      const y1 = 0, x1 = 0;
      async function getLatLong() {
        await ReturnLatLong(y1, x1);
        console.log("y1 = "+y1);
        console.log("x1 = "+x1);
        this.socket.emit('connection', (y1, x1))
      }
      getLatLong();
      
      /*
      console.log("crd.longitude = " + crd.longitude);
      console.log("crd.latitude = " + crd.latitude);
      this.socket.emit('connection', (crd.longitude, crd.latitude))//ここを修正
      */
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
