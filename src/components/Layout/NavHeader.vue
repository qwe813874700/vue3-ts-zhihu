<template>
  <nav class="navbar navbar-light navbar-dark bg-primary justify-content-between">
    <div class="container">
      <a class="navbar-brand">明明明</a>
      <ul class="list-inline mb-0" v-if="!user.isLogin">
        <li class="list-inline-item">
          <router-link to="/login" class="btn btn-outline-light my-2">
            登陆
          </router-link>
        </li>
        <li class="list-inline-item">
          <router-link to="/register" class="btn btn-outline-light my-2">
            注册
          </router-link>
        </li>
      </ul>
      <dropdown :title="`你好 ${user.nickName}!`" v-if="user.isLogin">
        <dropdown-item>新建文章</dropdown-item>
        <dropdown-item>我的专栏</dropdown-item> 
        <dropdown-item>编辑资料</dropdown-item> 
        <dropdown-item @click="logout">退出登录</dropdown-item> 
      </dropdown>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import Dropdown from '../Dropdown/Dropdown.vue'
import DropdownItem from '../Dropdown/DropdownItem.vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '../../store' 
import { useRouter } from 'vue-router'
export interface ILoginProps{
  id?: string,
  name?: string,
  isLogin: boolean
}

export default defineComponent({
  name: 'layout',
  components: {
    Dropdown,
    DropdownItem
  },
  setup () {
    const store = useStore<GlobalDataProps>()
    const router = useRouter()

    const logout = () => {
      store.commit('logout')
      router.push({ name: 'home' })
    }
    return {
      user: computed(() => store.state.user),
      logout
    }
  }
})
</script>