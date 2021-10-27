<template>
  <teleport to='#global'>
    <div class="loader-back w-100 h-100 d-flex justify-content-center align-items-center" :style="{backgroundColor: background}">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">{{ text }}</span>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, onUnmounted, onMounted } from 'vue'
export default defineComponent({
  props: {
    text: {
      type: String,
      default: 'Loading'
    },
    background: {
      type: String,
      default: 'rgba(255, 255, 255, .7)'
    }
  },
  setup (props) {
    const node = document.createElement('div')
    node.id = 'global'
    document.body.appendChild(node)
    onUnmounted(() => {
      document.body.removeChild(node)
    })
  }
})
</script>

<style lang="scss">
  .loader-back {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
  }
</style>