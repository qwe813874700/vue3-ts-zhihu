<template>
  <div class="column-detail-page w-690 mx-auto mt-5 mb-5">
    <div class="column-info row mb-4 border-bottom pb-4 align-items-center">
      <div class="col-3 text-center">
        <img :src="`${avatarInfo.avatar.url}?x-oss-process=image/resize,m_pad,h_100,w_100`" alt="Vehicle攻城狮" class="rounded-circle border w-100">
      </div>
      <div class="col-9">
        <h4>{{ avatarInfo.title }}</h4>
        <p class="text-muted">
          {{ avatarInfo.description }}
        </p>
      </div>
    </div>
    <div class="post-list">
      <article class="card mb-3 shadow-sm" v-for="list in postsList" :key="list.key">
        <div class="card-body">
          <h4 >
            <router-link :to="`/posts/${list._id}`" class="">
              {{ list.title }}
            </router-link>
          </h4>
          <div class="row my-3 align-items-center">
            <div class="col-4" v-if="list.image.url">
              <img :src="list.image.url" alt="看了这么多年美剧，我为什么还是没法摆脱字幕？" class="rounded-lg w-100" >
            </div>
            <p class="text-muted" :class="{'col-8': list.image.url}">
              {{ list.excerpt }}
            </p>
          </div>
          <span class="text-muted" >
            {{ list.createdAt }}
          </span>
        </div>
      </article>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { GlobalDataProps } from '../../store'
export default defineComponent({
  setup () {
    const store = useStore<GlobalDataProps>()
    const route = useRoute()
    
    return {
      postsList: computed(() => store.state.postsList),
      avatarInfo: computed(() => store.state.columnList.list.filter(item => item._id === route.params.id)[0]) // 根据id获取文章
    }
  }
})
</script>

<style lang="scss">
.w-690 {
  width: 690px;
}
</style>