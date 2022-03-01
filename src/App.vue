<template>
  <div id="app">
    <v-stage :config="configKonva">
      <v-layer>
        <v-circle :config="{ ...configCircle, fill: 'blue' }"></v-circle>
      </v-layer>
      <v-layer>
        <v-circle :config="configCircle"></v-circle>
      </v-layer>
    </v-stage>
  </div>
</template>

<script>
import { reactive } from '@vue/composition-api'
export default {
  setup() {
    const configKonva = reactive({
      width: 500,
      height: 500
    })
    const configCircle = reactive({
      x: 100,
      y: 100,
      radius: 70,
      fill: 'red',
      stroke: 'black',
      strokeWidth: 4,
      draggable: true
    })
    return {
      configKonva,
      configCircle
    }
  }
}
</script>

<style lang="scss"></style>
