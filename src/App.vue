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
          <v-stage ref="stageWrapper" @mousemove="handleDrawLine" @mouseup="StopDrawLine">
            <!-- <v-layer>
              <CircleNode fill-color="red" />
            </v-layer> -->

            <v-layer>
              <v-group>
                <v-arrow
                  v-for="item of connectionsLineLists"
                  :key="item.uuid"
                  :config="{ ...lineConfig, points: item.points }"
                ></v-arrow>
              </v-group>
              <v-group v-if="isDraw">
                <v-arrow ref="connectLine" :config="lineConfig"></v-arrow>
              </v-group>
              <v-group v-for="node of nodeLists" :key="node.uuid">
                <component
                  :ref="node.uuid"
                  v-bind="node"
                  :is-draw="isDraw"
                  :is="node.component"
                  @start-draw-connect-line="startDrawConnect"
                  @connect-to-target="handleConnectNode"
                  @update-node-xy="handleUpdateNodePosition"
                ></component>
              </v-group>
            </v-layer>
          </v-stage>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { v4 as uuidV4 } from 'uuid'
import MenuLists from './components/MenuLists.vue'
import CircleNode from './components/CircleNode.vue'
import RegularPolygon from './components/RegularPolygon.vue'
import useConfig from './composables/useConfig'
import {} from '@vue/composition-api'
const { color, configOfShape, componentOfShape, lineConfig } = useConfig()
export default {
  setup() {
    const { color, configOfShape, componentOfShape, lineConfig } = useConfig()
    return {
      color,
      configOfShape,
      componentOfShape,
      lineConfig
    }
  },

  components: { MenuLists, CircleNode, RegularPolygon },
  computed: {
    connectionsLineLists() {
      return this.nodeLists
        .map(node => {
          const { x: nodeX, y: nodeY } = node.groupConfig
          return node.to.map((toNode, index) => {
            const { x: toNodeX, y: toNodeY } = toNode
            return {
              uuid: `${node.uuid}__CONNECT-${index}-TO__${toNode.uuid}`,
              points: this.getConnectPositionOnShapeEdge(nodeX, nodeY, toNodeX, toNodeY, 80)
            }
          })
        })
        .flat()
    }
  },
  data() {
    return {
      nodeLists: [],
      isDraw: false,
      lineFromTo: { fromX: 0, fromY: 0, toX: 0, toY: 0 },
      sourceUuid: ''
    }
  },
  methods: {
    handleDropNode(e) {
      const data = JSON.parse(e.dataTransfer.getData('nodeData'))
      this.nodeLists.push({
        ...data,
        component: componentOfShape[data.shape],
        shapeConfig: {
          ...configOfShape[data.shape],
          fill: color[data.type].color
        },
        from: [],
        to: [],
        groupConfig: { x: e.offsetX, y: e.offsetY, draggable: true },
        uuid: uuidV4()
      })
    },
    startDrawConnect({ uuid, x: fromX, y: fromY }) {
      this.isDraw = true
      this.sourceUuid = uuid
      this.lineFromTo = { fromX, fromY, toX: fromX, toY: fromY }
      this.$nextTick(() => {
        const line = this.$refs.connectLine.getNode()
        line.points(Object.values(this.lineFromTo))
        line.draw()
      })
    },
    handleDrawLine(e) {
      if (!this.isDraw) return
      const line = this.$refs.connectLine.getNode()
      this.lineFromTo.toX = e.evt.offsetX
      this.lineFromTo.toY = e.evt.offsetY
      line.points(Object.values(this.lineFromTo))
      line.draw()
    },
    handleConnectNode({ targetUuid, x: targetX, y: targetY }) {
      const { fromX: sourcePositionX, fromY: sourcePositionY } = this.lineFromTo
      this.nodeLists = this.nodeLists.map(node => {
        if (node.uuid === targetUuid) {
          node.from.push({ sourceUuid: this.sourceUuid, x: sourcePositionX, y: sourcePositionY })
        }
        if (node.uuid === this.sourceUuid) {
          node.to.push({ targetUuid: targetUuid, x: targetX, y: targetY })
        }
        return node
      })
      this.isDraw = false
    },
    handleMouseDown() {},
    StopDrawLine() {
      this.isDraw = false
    },
    handleUpdateNodePosition({ uuid, x: nodeX, y: nodeY }) {
      this.nodeLists = this.nodeLists.map(node => {
        if (node.uuid === uuid) {
          node.groupConfig = { ...node.groupConfig, x: nodeX, y: nodeY }
        }
        node.to = node.to.map(toNode => {
          if (toNode.targetUuid === uuid) {
            return { ...toNode, x: nodeX, y: nodeY }
          }
          return toNode
        })
        return node
      })
    },
    getConnectPositionOnShapeEdge(fromX, fromY, toX, toY, radius) {
      const dx = toX - fromX
      const dy = toY - fromY
      const angle = Math.atan2(-dy, dx)
      return [
        fromX + -radius * Math.cos(angle + Math.PI),
        fromY + radius * Math.sin(angle + Math.PI),
        toX + -radius * Math.cos(angle),
        toY + radius * Math.sin(angle)
      ]
    }
  },
  mounted() {
    const stage = this.$refs.stageWrapper.getNode()
    stage.height(this.$refs.wrapper.scrollHeight)
    stage.width(this.$refs.wrapper.scrollWidth)
  }
}
</script>

<style lang="scss"></style>
