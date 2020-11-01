<!--
  @Author: lvcy
  @Date: 2020/10/30/ 21:41:07
  @Description: 
-->
<template>
  <div class="column-datail-page mx-auto">
    <div class="column-info row mb-4 border-bottom pb-4 align-items-center" v-if="column">
      <div class="col-3 text-center">
        <img
          :src="column.avatar && column.avatar.url"
          :alt="column.title"
          class="rounded-circle border w-100"
        />
      </div>
      <div class="col-9">
        <h4>{{column.title}}</h4>
        <p class="text-muted">{{column.description}}</p>
      </div>
    </div>
    <post-list :list="list"></post-list>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
import { useRoute } from "vue-router";
import PostList from "@/components/PostList.vue";
import { useStore } from "vuex";
import { GlobalDataProps } from "@/store";

export default defineComponent({
  name: "column-datail-page",
  components: {
    PostList,
  },
  setup() {
    const store = useStore<GlobalDataProps>();
    const route = useRoute();
    const currentId = route.params.id;
    onMounted(() => {
      store.dispatch("fetchColumn", currentId);
      store.dispatch("fetchPosts", currentId);
    });
    const column = computed(() => store.getters.getColumnById(currentId));
    const list = computed(() => store.getters.getPostsByCid(currentId));
    console.log(route);
    return {
      column,
      list,
    };
  },
});
</script>

<style lang="less">
.column-datail-page {
  padding: 0 12px;
}
</style>