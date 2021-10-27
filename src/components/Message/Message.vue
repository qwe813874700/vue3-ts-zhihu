<template>
  <div 
    class="alert  w-50 mx-auto fixed-top mt-5 d-flex justify-content-between align-items-center" 
    role="alert"
    :class="{'alert-success': type === 'success', 'alert-danger': type === 'error', 'alert-primary': type === 'default'}">
    <span>{{ message }}</span>
    <button type="button" class="btn-close"></button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
export type MessageType = 'error' | 'success' | 'default'
export default defineComponent({
  props: {
    type: {
      type: String as PropType<MessageType>,
      default: 'default'
    },
    message: {
      type: String,
      default: ''
    }
  }
})

</script>

<style lang="scss">
</style>
