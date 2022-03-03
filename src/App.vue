<template>
  <div id="app">
    <div class="p-4">
      <MenuLists :color="color" />
      <div class="border border-black rounded p-2 mt-2 w-full h-screen relative">
        <div
          ref="wrapper"
          class="overflow-auto h-full"
          @dragover.prevent.stop
          @drop="handleDropNode"
        >
          <v-stage ref="stageWrapper" @mousemove="handleMouseMove" @mouseup="handleMouseUp">
            <!-- <v-layer>
              <CircleNode fill-color="red" />
            </v-layer> -->

            <v-layer v-for="node of nodeLists" :key="node.uuid">
              <component
                :shape-config="node.config"
                :group-config="node.groupConfig"
                :is="node.component"
              ></component>
            </v-layer>
          </v-stage>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from '@vue/composition-api'
import { v4 as uuidV4 } from 'uuid'
import MenuLists from './components/MenuLists.vue'
import CircleNode from './components/CircleNode.vue'
import useConfig from './composables/useConfig'
export default {
  setup() {
    const nodeLists = reactive([])
    const { color, configOfShape, componentOfShape } = useConfig()

    const handleMouseDown = async () => {}
    const handleMouseMove = () => {}
    const handleMouseUp = () => {}

    const handleDropNode = e => {
      const data = JSON.parse(e.dataTransfer.getData('nodeData'))
      nodeLists.push({
        ...data,
        component: componentOfShape[data.shape],
        config: {
          ...configOfShape[data.shape],
          fill: color[data.type].color
        },
        groupConfig: { x: e.offsetX, y: e.offsetY, draggable: true },
        uuid: uuidV4()
      })
    }

    // 定義畫布寬高
    const wrapper = ref(null)
    const stageWrapper = ref(null)
    onMounted(() => {
      const stage = stageWrapper.value.getNode()
      stage.height(wrapper.value.scrollHeight)
      stage.width(wrapper.value.scrollWidth)
    })
    return {
      color,
      wrapper,
      stageWrapper,
      nodeLists,
      handleMouseDown,
      handleMouseMove,
      handleMouseUp,
      handleDropNode
    }
  },
  components: { MenuLists, CircleNode },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss"></style>
