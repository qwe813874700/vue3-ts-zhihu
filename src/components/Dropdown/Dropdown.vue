<template>
  <div class="dropdown" ref="dropdownRef">
    <a class="btn btn-outline-light my-2 dropdown-toggle" @click.prevent="changeOpenState">
      {{ title }}
    </a>
    <ul class="dropdown-menu" :style="{display: 'block'}" v-if="isOpen">
      <slot></slot>
    </ul>
  </div>
</template>

<script>
import { defineComponent, ref, watch } from 'vue'
import clickOutSide from '../../hooks/useClickOutSide.ts' 
export default defineComponent({
  name: 'dropdown',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup () {
    const isOpen = ref(false)
    const changeOpenState = () => {
      isOpen.value = !isOpen.value
    }
    const dropdownRef = ref<null | HTMLElement>(null)
    const isClickOutSide = clickOutSide(dropdownRef)
    watch(isClickOutSide, () => {
      if (isOpen.value && !isClickOutSide.value) {
        isOpen.value = false
      }
    })
    return {
      isOpen,
      changeOpenState
    }
  }
})
</script>