<template>
  <div class="mb-3">
    <label for="exampleFormControlInput1" class="form-label">{{ label }}</label>
    <div class="validate-input-container pb-3 position-relative">
      <input
        class="form-control"
        :class="{'is-invalid': inputRef.error}"
        v-bind="$attrs"
        :value="inputRef.val"
        @blur="vaildateInput"
        @input="updateValue"
        v-if="tag === 'text'">
        <textarea
          class="form-control"
          :class="{'is-invalid': inputRef.error}"
          v-bind="$attrs"
          :value="inputRef.val"
          @blur="vaildateInput"
          @input="updateValue"
          v-if="tag === 'textarea'">
        </textarea>
        <div class="invalid-feedback position-absolute mt-1">
          {{ inputRef.message }}
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType, onMounted, onUnmounted } from 'vue'
import { mitter } from './ValidateFrom.vue'

export interface RulesProp {
  type: 'require' | 'email',
  message: string
}
  
export default defineComponent({
  name: 'valiedate-input',
  inheritAttrs: false,
  props: {
    modelValue: String,
    rules: Object as PropType<RulesProp[]>,
    label: String,
    tag: {
      default: 'text',
      type: String
    }
  },
  setup (props, context) {
    const inputRef = reactive({
      val: props.modelValue || '',
      message: '',
      error: false
    })
    const changeModelValue = (value: string) => {
      inputRef.val = value
      context.emit('update:modelValue', value)
    }
    const updateValue = (e: KeyboardEvent) => {
      const targetValue = (e.target as HTMLInputElement).value
      changeModelValue(targetValue)
    }
    
    const vaildateInput = (): boolean => {
      if (props.rules) {
        let passed: boolean = true
        for (let i = 0; i < props.rules.length; i++) {
          const element = props.rules[i];
          switch (element.type) {
            case 'require': 
              passed = (inputRef.val.trim() !== '')
              break;
            case 'email':
              const reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,5}$/
              passed = reg.test(inputRef.val)
              break;
            default:
              break;
          }
          if (!passed) {
            inputRef.error = true
            inputRef.message = element.message
            break
          } else {
            inputRef.error = false
          }
        }
        return passed
      }
      return true
    }
    onMounted(() => {
      mitter.emit('form-item-created', vaildateInput)
      mitter.on('clear-form', () => {
        changeModelValue('')
      })
    })
    onUnmounted(() => {
      mitter.off('clear-form')
    })
    return {
      updateValue,
      vaildateInput,
      inputRef
    }
  }
})
</script>
