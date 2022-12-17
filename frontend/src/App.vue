<script setup>
import HelloWorld from './components/HelloWorld.vue'
import io from 'socket.io-client'
import sendLatLong from './position'
import Navbar from './components/Navbar.vue'
import ViewPartnerInfo from './components/ViewPartnerInfo.vue';
</script>

<template>
  <Navbar />
  <ViewPartnerInfo :distance="distance" :direction="direction" />
</template>

<script>
export default {
  data() {
    return {
      socket: io("https://p2hacks.azurata.me", { transports: ["websocket"] }),
      distance: 0.0,
      direction: 0.0
    };
  },
  mounted() {
    this.socket.on("connect", () => {
      console.log("Connected");
    });
    this.socket.on("signal", () => {
      console.log("Signaled!");
      sendLatLong(this.socket);
    });
    this.socket.on("distance", (d, phai) => {
      this.distance = d;
      this.direction = phai;
      console.log(d, phai);
    });
  },
  components: { ViewPartnerInfo }
}
</script>

<style scoped>

</style>
