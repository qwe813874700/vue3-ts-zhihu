import { onUnmounted } from 'vue'

function useCreateDom (name: string) {
  const node = document.createElement('div')
  node.id = name
  document.body.append(node)

  onUnmounted(() => {
    document.body.removeChild(node)
  })
}

export default useCreateDom