<template>
  <v-group ref="groupEl" :config="groupConfig" @mouseup="connectLineToGroup" @dragmove="updateXY">
    <v-regular-polygon
      ref="nodeEl"
      :config="{ ...nodeConfig, ...shapeConfig }"
      @mouseenter="groupMouseEnter"
      @mouseleave="groupMouseLeave"
    ></v-regular-polygon>
    <v-circle
      ref="endpointEl"
      :config="endpointConfig"
      @mouseenter="endpointMouseEnter"
      @mouseleave="endpointMouseLeave"
      @mousedown="endpointMouseDown"
      @mouseup="endpointMouseUp"
    ></v-circle>
  </v-group>
</template>

<script>
import { onMounted, reactive, ref } from '@vue/composition-api'
export default {
  setup(props, { emit }) {
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
    const endpointMouseDown = () => {
      const startPosition = groupEl.value.getNode()
      emit('start-draw-connect-line', {
        uuid: props.uuid,
        x: startPosition.x(),
        y: startPosition.y()
      })
    }
    const endpointMouseUp = () => {
      emit('end-draw-connect-line')
    }

    const groupMouseEnter = () => {
      if (!props.isDraw) return
      emit('mouse-enter-node-group', props.uuid)
    }
    const groupMouseLeave = () => {
      if (!props.isDraw) return
      emit('mouse-leave-node-group')
    }
    const connectLineToGroup = () => {
      if (!props.isDraw) return
      emit('connect-to-target', {
        targetUuid: props.uuid,
        x: groupEl.value.getNode().x(),
        y: groupEl.value.getNode().y()
      })
    }

    let timer = null
    const updateXY = () => {
      if (timer !== null) return
      timer = setTimeout(() => {
        timer = null
      }, 20)
      emit('update-node-xy', {
        uuid: props.uuid,
        x: groupEl.value.getNode().x(),
        y: groupEl.value.getNode().y()
      })
    }
    return {
      nodeConfig,
      endpointConfig,
      groupEl,
      nodeEl,
      endpointEl,
      endpointMouseLeave,
      endpointMouseEnter,
      endpointMouseDown,
      endpointMouseUp,
      groupMouseEnter,
      groupMouseLeave,
      connectLineToGroup,
      updateXY
    }
  },
  props: {
    shapeConfig: Object,
    groupConfig: Object,
    uuid: String,
    isDraw: Boolean,
    from: Array
  },
  data() {
    return {}
  }
}
</script>

<style></style>
