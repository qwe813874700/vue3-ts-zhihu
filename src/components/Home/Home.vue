<template>
  <section class="text-center container">
    <div class="row py-lg-5">
      <div class="col-lg-6 col-md-8 mx-auto">
        <img src="../../assets/home-back.svg" alt="callout" class="w-50">
        <h2 class="font-weight-light">随心写作，自由表达</h2>
        <p>
          <a href="#" class="btn btn-primary my-2">开始写文章</a>
        </p>
      </div>
    </div>
  </section>
  <div class="row">
    <card-list></card-list>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CardList from './CartList.vue'
export default defineComponent({
  name: 'home',
  components: {
    CardList
  }
})
</script>
