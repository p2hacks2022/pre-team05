<template>
  <div class="compass-view">
    <div class="compass-base">
      <div class="compass-needle" :style="{ transform: 'rotate(' + (heading - phai) + 'deg)' }">
        <div class="compass-needle-arrow" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    phai: Number
  },
  data() {
    return {
      heading: 0,
      interval: null
    }
  },
  methods: {
    updateHeading() {
      const self = this
      navigator.geolocation.getCurrentPosition((pos) => {
        self.heading = pos.coords.heading || 0
        // self.heading++
        console.log(self.heading)
      }, (err) => {
        console.error(err)
      })
    }
  },
  mounted() {
    this.interval = setInterval(this.updateHeading, 100)
  },
  beforeUnmount() {
    clearInterval(this.interval)
  }
}
</script>

<style scoped>
.compass-view {
  width: 100%;
  display: grid;
  place-items: center;
}

.compass-base {
  margin: 32px 0;
  width: 200px;
  height: 200px;
  background-color: lightgray;
  border-radius: 100px;
}

.compass-needle {
  position: relative;
  left: 50%;
  width: 5px;
  top: 20px;
  height: 80px;
  background-color: red;
  transform-origin: 50% 100%;
  /* transform: rotate(75deg); */
}

.compass-needle-arrow {
  position: relative;
  left: -12.5px;
  top: -21px;
  width: 30px;
  height: 30px;
  border-right: 15px solid transparent;
  border-bottom: 34.682px solid red;
  border-left: 15px solid transparent;
}
</style>
