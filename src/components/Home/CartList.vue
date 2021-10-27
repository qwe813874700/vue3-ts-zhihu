<template>
  <div v-for="item in list" :key="item.key" class="col-4 mb-4">
    <div class="card h-100 shadow-sm">
      <div class="card-body text-center">
        <img :src="item.avatar.url" :alt="item.title" class="rounded-circle border border-light my-3">
        <h5 class="card-title text-truncate">
          {{item.title}}
        </h5>
        <p class="card-text text-left description text-secondary">
          {{ item.description }}
        </p>
        <router-link :to="`/column/${item.avatar._id}`" class="btn btn-outline-primary">
          进入专栏
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '../../store'
export default defineComponent({
  setup () {
    const store = useStore<GlobalDataProps>()
    return {
      list: computed(() => store.state.columnList)
    }
  }
})
</script>