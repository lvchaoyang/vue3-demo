<template>
  <div class="app">
    <div class="container">
      <global-header :user="currentUser"></global-header>
      <loading v-if="isLoading"></loading>
      <router-view></router-view>
      <footer class="text-center py-4 text-secondary bg-light mt-6">
        <small>
          <ul class="list-inline mb-0">
            <li class="list-inline-item">© 2020 者也专栏</li>
            <li class="list-inline-item">课程</li>
            <li class="list-inline-item">文档</li>
            <li class="list-inline-item">联系</li>
            <li class="list-inline-item">更多</li>
          </ul>
        </small>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, watch } from "vue";
import "bootstrap/dist/css/bootstrap.min.css";
import GlobalHeader from "@/components/GlobalHeader.vue";
import Loading from "@/components/Loading.vue";
import createMessage from "./components/createMessage";
import { useStore } from "vuex";
import { GlobalDataProps } from "./store";

export default defineComponent({
  name: "App",
  components: {
    GlobalHeader,
    Loading,
  },
  setup() {
    const store = useStore<GlobalDataProps>();
    const currentUser = computed(() => store.state.user);
    const isLoading = computed(() => store.state.loading);
    const token = computed(() => store.state.token);
    const error = computed(() => store.state.error);
    onMounted(() => {
      if (!currentUser.value.isLogin && token.value) {
        store.dispatch("fetchCurrentUser");
      }
    });
    watch(
      () => error.value.status,
      () => {
        const { status, message } = error.value;
        if (status && message) {
          createMessage(message, "error");
        }
      }
    );
    return {
      currentUser,
      isLoading,
      error,
    };
  },
});
</script>

<style lang="less">
.app {
  .container {
    padding: 0;
  }
}
</style>
