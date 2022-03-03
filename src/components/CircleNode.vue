<template>
  <v-group ref="groupEl" :config="groupConfig">
    <v-circle ref="nodeEl" :config="{ ...nodeConfig, ...shapeConfig }"></v-circle>
    <v-circle
      ref="endpointEl"
      :config="endpointConfig"
      @mouseenter="endpointMouseEnter"
      @mouseleave="endpointMouseLeave"
    ></v-circle>
  </v-group>
</template>

<script>
import { onMounted, reactive, ref } from '@vue/composition-api'
export default {
  setup() {
    const groupEl = ref(null)
    const nodeEl = ref(null)
    const endpointEl = ref(null)
    const nodeConfig = reactive({
      radius: 70
    })
    const endpointConfig = reactive({
      name: 'source',
      radius: 10,
      fill: 'white',
      stroke: 'black',
      strokeWidth: 2
    })

    onMounted(() => {
      const node = nodeEl.value.getNode()
      const group = groupEl.value.getNode()
      const endpoint = endpointEl.value.getNode()
      console.log('width', node.width())
      console.log('height', node.height())
      node.absolutePosition({ x: group.x(), y: group.y() })
      endpoint.absolutePosition({
        x: group.x() + node.width() / 2,
        y: group.y()
      })
    })

    const endpointMouseEnter = () => {
      const group = groupEl.value.getNode()
      group.draggable(false)
      console.log('cant drag')
    }
    const endpointMouseLeave = () => {
      const group = groupEl.value.getNode()
      group.draggable(true)
      console.log('can drag again')
    }

    return {
      nodeConfig,
      endpointConfig,
      groupEl,
      nodeEl,
      endpointEl,
      endpointMouseLeave,
      endpointMouseEnter
    }
  },
  props: {
    shapeConfig: Object,
    groupConfig: Object
  },
  data() {
    return {}
  }
}
</script>

<style></style>
