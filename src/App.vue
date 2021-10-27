<template>
  <div class="container-fluid px-0 h-100">
    <Layout></Layout>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Layout from './components/Layout/Layout.vue'
import '../node_modules/bootstrap/dist/css//bootstrap.min.css'

export default defineComponent({
  name: 'App',
  components: {
    Layout
  }
})
</script>

<style lang="scss">
html, body {
  height: 100%;
}
</style>
