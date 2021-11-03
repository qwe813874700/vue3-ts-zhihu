<template>
  <div v-for="item in list" :key="item.key" class="col-4 mb-4">
    <div class="card h-100 shadow-sm">
      <div class="card-body text-center">
        <img :src="`${item.avatar.url}?x-oss-process=image/resize,m_pad,h_50,w_50`" :alt="item.title" class="rounded-circle border border-light my-3">
        <h5 class="card-title text-truncate">
          {{item.title}}
        </h5>
        <p class="card-text text-left description text-secondary">
          {{ item.description }}
        </p>
        <router-link :to="`/column/${item._id}`" class="btn btn-outline-primary">
          进入专栏
        </router-link>
      </div>
    </div>
  </div>
  <button class="btn btn-outline-primary mt-2 mb-5 mx-auto btn-block w-25" @click="getColmnList" v-if="colmnList.currentPage * colmnList.pageSize < colmnList.count">
    加载更多
  </button>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps, PageProp } from '../../store'
import { ColumnPostsListProps, ColumnProps } from '../../interface/props'
export default defineComponent({
  setup () {
    const store = useStore<GlobalDataProps>()
    const colmnList = computed<ColumnPostsListProps<ColumnProps>>(() => store.state.columnList)
    const getColmnList = () => {
      const pageInfo: PageProp = {
        currentPage: colmnList.value.currentPage + 1,
        pageSize: colmnList.value.pageSize
      }
      store.dispatch('getColmnList', pageInfo)
    }
    getColmnList()
    return {
      list: computed(() => store.state.columnList.list),
      getColmnList,
      colmnList
    }
  }
})
</script>

<style lang="scss">
.description {
  line-height: 20px;
  height: 60px;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  word-break: break-all;
  display: -webkit-box;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>