<template>
  <div class="create-post-page container mt-3">
    <h4>新建文章</h4>
    <div class="file-upload" @click="clickFileSelect">
      <div class="file-upload-container d-flex align-items-center justify-content-center bg-light text-secondary w-100 my-4">
        <h2>点击上传头图</h2>
      </div>
      <input type="file" class="file-input d-none" ref="fileUpload"/>
    </div>
    <validate-form @form-submit="submitPosts">
      <validate-input label="文章标题" type="text" placeholder="请输入文章标题" v-model="titleValue"></validate-input>
      <validate-input label="文章详情" type="textarea" tag="textarea" rows="15" placeholder="请输入文章内容 支持markdown" v-model="contentValue"></validate-input>
      <template #submit>
        <div class="btn btn-primary">
          上传文章
        </div>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, reactive } from "vue"
import { useStore } from "vuex"
import { useRouter } from 'vue-router'
import ValidateForm from '../ValidateForm/ValidateFrom.vue'
import ValidateInput from '../ValidateForm/ValidateInput.vue'
import { PostsProps } from '../../interface/props'


export default defineComponent({
  name: 'create-post',
  components: {
    ValidateForm,
    ValidateInput
  },
  setup (props, context) {
    const store = useStore()
    const router = useRouter()

    const fileUpload = ref(null)
    const titleValue = ref('')
    const contentValue = ref('')
      const clickFileSelect = () => {
      fileUpload.value.click()
    }
    const submitPosts = (test) => {
      const postsInfo: PostsProps = {
        author: '123123123',
        image: {},
        title: titleValue.value,
        createdAt: new Date().toLocaleString(),
        excerpt: contentValue.value,
        column: '123123123123',
        key: Math.random()
      }
      store.commit('addPost', postsInfo)
      router.push({name: 'column', params: {
        id: 'asdasdasdasd'
      }})
    }
    return {
      fileUpload,
      clickFileSelect,
      submitPosts,
      titleValue,
      contentValue
    }
  }
})
</script>

<style lang="scss">
  .create-post-page {
    .file-upload-container {
      height: 200px;
      cursor: pointer;
      overflow: hidden;
    }
  }
</style>