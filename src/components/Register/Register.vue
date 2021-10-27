<template>
  <div class="w-330 mx-auto p-3">
    <h5 class="my-4 text-center">注册账户</h5>
    <validate-form class="mb-3 mt-3" @form-submit="formSubmit">
      <vaildate-input v-model="loginInfo.email" :rules="ruleList" placeholder="请输入您的邮箱" label="邮箱账号"></vaildate-input>
      <vaildate-input v-model="loginInfo.nickName" :rules="ruleList2" placeholder="请输入您的昵称" label="昵称"></vaildate-input>
      <vaildate-input v-model="loginInfo.password" :rules="ruleList2" type="password" placeholder="请输入您的密码" label="密码"></vaildate-input>
      <vaildate-input v-model="loginInfo.confirmPassword" type="password" :rules="ruleList2" placeholder="请输入您的邮箱" label="确认密码"></vaildate-input>
      <template #submit>
        <div class="btn btn-primary">
          注册
        </div>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import VaildateInput, { RulesProp } from '../ValidateForm/ValidateInput.vue'
import ValidateForm from '../ValidateForm/ValidateFrom.vue'
export default defineComponent({
  name: 'login',
  components: {
    VaildateInput,
    ValidateForm
  },
  setup () {
    const store = useStore()
    const router = useRouter()
    const ruleList: RulesProp[] = [
      {type: 'require', message: '邮箱账号不能为空'},
      {type: 'email', message: '邮箱账号格式不正确'}
    ]
    const ruleList2: RulesProp[] = [
      {type: 'require', message: '内容不能为空'}
    ]
    const loginInfo = reactive({
      email: '',
      password: '',
      nickName: '',
      confirmPassword: ''
    })
    
    const formSubmit = (result) => {
      if (result && loginInfo.password === loginInfo.confirmPassword) {
        store.dispatch('register', {
          email: loginInfo.email,
          password: loginInfo.password,
          nickName: loginInfo.nickName
        }).then(res => {
          router.push({name: 'login'})
        })
      }
    }
    return {
      loginInfo,
      ruleList,
      ruleList2,
      formSubmit
    }
  }
})
</script>

<style lang="scss">
  .w-330 {
    max-width: 330px;
  }
</style>
