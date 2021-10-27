import { ref, onMounted, onUnmounted, Ref } from 'vue'

const isClickOutSide = (elementRef: Ref<null | HTMLElement>) => {
  const isClick = ref(false)
  const handle = (e: Event) => {
    if (elementRef.value) {
      if (elementRef.value.contains(e.target as HTMLElement)) {
        isClick.value = true
      } else {
        isClick.value = false
      }
    }
  }
  onMounted(() => {
    document.addEventListener('click', handle)
  })
  onUnmounted(() => {
    document.removeEventListener('click', handle)
  })
  return isClick
}

export default isClickOutSide
