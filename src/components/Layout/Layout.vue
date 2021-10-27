<template>
  <div class="layout d-flex flex-column h-100">
    <Loader v-if="loading"></Loader>
    <nav-header></nav-header>
    <div class="container-md">
      <router-view></router-view>
    </div>
    <nav-footer></nav-footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watch } from 'vue'
import NavHeader from './NavHeader.vue'
import NavFooter from './NavFooter.vue'
import Loader from '../Loader/Loader.vue'
import useMessageCreate from '../../hooks/useMessageCreate'
import { useStore } from 'vuex'
import { getToken } from '../../tool/tool'
export default defineComponent({
  name: 'layout',
  components: {
    NavHeader,
    NavFooter,
    Loader
  },
  setup () {
    const store = useStore()
    const error = computed(() => store.state.error)
    watch(() => error.value.status, () => {
      console.log(666)
      const { status, message } = error.value
      if (status && message) {
        useMessageCreate(message, 'error')
      }
    })
    if (!store.state.user.isLogin && getToken()) {
      store.dispatch('getCurrent')
    }
    if (!getToken()) {
      store.commit('logout')
    }
    return {
      loading: computed(() => store.state.loading)
    }
  }
})
</script>