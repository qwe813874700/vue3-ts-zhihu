<template>
  <form class="validate-form">
    <slot></slot>
    <div class="submit-area" @click.prevent="formSubmit">
      <slot name="submit">
        <button type="submit" class="btn btn-primary btn-block btn-large">
          Submit
        </button>
      </slot>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from 'vue'
import mitt from 'mitt'

type validateFunc = () => boolean
type Events = {
  'form-item-created': validateFunc,
  'clear-form': any
}

export const mitter = mitt<Events>()

export default defineComponent({
  emits: ['form-submit'],
  setup (props, context) {
    const funArr:validateFunc[] = []
    const callback = (result: validateFunc) => {
      funArr.push(result)
    }
    mitter.on('form-item-created', callback)
    const clearForm = () => {
      mitter.emit('clear-form')
    }
    const formSubmit = () => {
      const validateResult = funArr.map(item => item()).every(result => result)
      context.emit('form-submit', validateResult)
      // clearForm()
    }
    onUnmounted(() => {
      mitter.off('form-item-created', callback)
    })
    return {
      formSubmit
    }
  }
})
</script>

<style lang="scss">
  
</style>
