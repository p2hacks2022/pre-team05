<template>
  <CompassView :phai="direction" />
  <div style="text-align: center;">
    距離: {{ distance }},
    方角: {{ direction }}
  </div>
</template>

<script>
import CompassView from './CompassView.vue';

export default {
  props: {
    distance: Number,
    direction: Number
  },
  components: { CompassView }
}
</script>
