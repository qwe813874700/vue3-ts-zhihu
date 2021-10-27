import  { createApp } from 'vue'
import Message from '../components/Message/Message.vue'
type MessageType = 'error' | 'success' | 'default'
function useCreateMessage(message: string, type: MessageType = 'default', timeout: number = 2000) {
  const messgeNode = document.createElement('div')
  document.body.append(messgeNode)
  const messageInstance = createApp(Message, {
    type,
    message
  })
  messageInstance.mount(messgeNode)

  setTimeout(() => {
    messageInstance.unmount()
    document.body.removeChild(messgeNode)
  }, timeout)
}

export default useCreateMessage