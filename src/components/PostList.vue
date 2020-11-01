<!--
  @Author: lvcy
  @Date: 2020/10/30/ 22:01:01
  @Description: 
-->
<template>
  <div class="post-list">
    <article v-for="post in list" :key="post._id" class="card mb-3 shadow-sm">
      <div class="card-body">
        <h4>
          <router-link :to="`/posts/${post._id}/`">{{post.title}}</router-link>
        </h4>
        <div class="row my-3 align-items-center">
          <div v-if="post.image" class="col-4">
            <img :src="post.image.url" :alt="post.title" class="rounded-lg w-100" />
          </div>
          <p :class="{'col-8': post.image}" class="text-muted">{{post.excerpt}}</p>
        </div>
        <span class="text-muted">{{post.createdAt}}</span>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { PostProps } from "@/store";
import { defineComponent, PropType } from "vue";
export default defineComponent({
  name: "PostList",
  props: {
    list: {
      type: Array as PropType<Array<PostProps>>,
      required: true,
    },
  },
});
</script>

<style lang="less">
.post-list {
  h4 a {
    text-decoration: none;
    color: #1a1a1a;
    &:hover {
      color: #0d6efd;
    }
  }
}
</style>