<template>
  <div class="w-330 mx-auto p-3">
    <h5 class="my-4 text-center">登录</h5>
    <validate-form class="mb-3 mt-3" @form-submit="formSubmit">
      <vaildate-input v-model="loginInfo.email" :rules="ruleList" placeholder="请输入您的邮箱" :label="'邮箱账号'"></vaildate-input>
      <vaildate-input v-model="loginInfo.password" type="password" :rules="ruleList2" placeholder="请输入您的邮箱" :label="'密码'"></vaildate-input>
      <div class="form-text mb-3">
        <router-link to="/register">
          还没有账户？去注册一个新的吧！
        </router-link>
      </div>
      <template #submit>
        <div class="btn btn-primary">
          登录
        </div>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { LoginProp } from '../../store'
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
      {type: 'require', message: '密码不能为空'}
    ]
    const loginInfo = reactive<LoginProp>({
      email: '',
      password: ''
    })
    const formSubmit = (result) => {
      if (result) {
        store.dispatch('loginAndgetCurrent', {
          email: loginInfo.email,
          password: loginInfo.password
        }).then(() => {
          router.push({ name: 'home' })
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
