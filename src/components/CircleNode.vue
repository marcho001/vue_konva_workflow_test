<template>
  <v-group ref="groupEl" :config="groupConfig" @mouseup="connectLineToGroup" @dragmove="updateXY">
    <v-circle
      ref="nodeEl"
      :config="{ ...nodeConfig, ...shapeConfig }"
      @mouseenter="groupMouseEnter"
      @mouseleave="groupMouseLeave"
    ></v-circle>
    <v-circle
      ref="endpointEl"
      :config="endpointConfig"
      @mouseenter="endpointMouseEnter"
      @mouseleave="endpointMouseLeave"
      @mousedown="endpointMouseDown"
      @mouseup="endpointMouseUp"
    ></v-circle>
    <v-group ref="deleteBtn">
      <v-path :config="trashIcon"></v-path>
      <v-circle :config="deleteBtnConfig"></v-circle>
    </v-group>
  </v-group>
</template>

<script>
import { onMounted, reactive, ref } from '@vue/composition-api'
import useConfig from '../composables/useConfig'
export default {
  setup(props, { emit }) {
    const { deleteBtnConfig } = useConfig()
    const groupEl = ref(null)
    const nodeEl = ref(null)
    const endpointEl = ref(null)
    const deleteBtn = ref(null)
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
      deleteBtn.value.getNode().absolutePosition({
        x: group.x() - node.width() / 2,
        y: group.y() - node.height() / 2
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

    const trashIcon = reactive({
      width: 10,
      height: 10,
      stroke: 'white',
      scale: {
        x: 2,
        y: 2
      },
      data: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM31.1 128H416V448C416 483.3 387.3 512 352 512H95.1C60.65 512 31.1 483.3 31.1 448V128zM111.1 208V432C111.1 440.8 119.2 448 127.1 448C136.8 448 143.1 440.8 143.1 432V208C143.1 199.2 136.8 192 127.1 192C119.2 192 111.1 199.2 111.1 208zM207.1 208V432C207.1 440.8 215.2 448 223.1 448C232.8 448 240 440.8 240 432V208C240 199.2 232.8 192 223.1 192C215.2 192 207.1 199.2 207.1 208zM304 208V432C304 440.8 311.2 448 320 448C328.8 448 336 440.8 336 432V208C336 199.2 328.8 192 320 192C311.2 192 304 199.2 304 208z"/></svg>`
    })
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
      updateXY,
      deleteBtnConfig,
      trashIcon,
      deleteBtn
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
