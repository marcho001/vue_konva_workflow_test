<template>
  <div class="border border-black rounded p-2">
    <div class="flex overflow-x-auto w-full">
      <div
        v-for="(item, i) of menuLists"
        :key="`menuItem_${i}`"
        class="w-[100px] h-[100px] p-2 mx-2 shadow-sm block flex-shrink-0"
        :class="[color[item.type].className, { 'rounded-full': item.shape === 'circle' }]"
        draggable="true"
        @dragstart="handleDragStart($event, item)"
      >
        <div class="h-full text-center leading-[100px]">{{ item.type }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/composition-api'
export default {
  setup() {
    const menuLists = reactive([
      {
        id: 1,
        type: 'start',
        shape: 'circle',
        source: true,
        target: false,
        sourceMaxConnectionsCount: 3,
        targetMaxConnectionsCount: 0,
        acceptSource: []
      },
      {
        id: 2,
        type: 'event',
        shape: 'circle',
        source: true,
        target: true,
        sourceMaxConnectionsCount: 3,
        targetMaxConnectionsCount: 3,
        acceptSource: ['time', 'export', 'start']
      },
      {
        id: 3,
        type: 'time',
        shape: 'circle',
        source: true,
        target: true,
        sourceMaxConnectionsCount: 1,
        targetMaxConnectionsCount: 3,
        acceptSource: ['event', 'export', 'start']
      },
      {
        id: 4,
        type: 'export',
        shape: 'circle',
        source: true,
        target: true,
        sourceMaxConnectionsCount: 1,
        targetMaxConnectionsCount: 3,
        acceptSource: ['time', 'event', 'start']
      },
      {
        id: 5,
        type: 'export',
        shape: 'regularPolygon',
        source: true,
        target: true,
        sourceMaxConnectionsCount: 1,
        targetMaxConnectionsCount: 3,
        acceptSource: ['time', 'event', 'start']
      },
      {
        id: 6,
        type: 'export',
        shape: 'regularPolygon',
        source: true,
        target: true,
        sourceMaxConnectionsCount: 1,
        targetMaxConnectionsCount: 3,
        acceptSource: ['time', 'event', 'start']
      }
    ])

    const handleDragStart = (e, nodeData) => {
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.dropEffect = 'move'
      e.dataTransfer.setData('nodeData', JSON.stringify(nodeData))
    }
    return {
      menuLists,
      handleDragStart
    }
  },
  props: {
    color: Object
  }
}
</script>

<style></style>
