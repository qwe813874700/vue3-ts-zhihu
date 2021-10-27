<template>
  <div class="column-detail-page w-690 mx-auto mt-5 mb-5">
    <div class="column-info row mb-4 border-bottom pb-4 align-items-center">
      <div class="col-3 text-center">
        <img src="http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5f3e3a17c305b1070f455202.jpg?x-oss-process=image/resize,m_pad,h_100,w_100" alt="Vehicle攻城狮" class="rounded-circle border w-100">
      </div>
      <div class="col-9">
        <h4>Vehicle攻城狮</h4>
        <p class="text-muted">
          半吊子系统和程序狗，沉迷高端理论，日渐消瘦。
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
import { GlobalDataProps } from '../../store'
export default defineComponent({
  setup () {
    const store = useStore<GlobalDataProps>()
    return {
      postsList: computed(() => store.state.postsList)
    }
  }
})
</script>

<style lang="scss">
.w-690 {
  width: 690px;
}
</style>