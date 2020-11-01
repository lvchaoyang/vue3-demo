<!--
  @Author: lvcy
  @Date: 2020/11/01/ 18:30:49
  @Description: 
-->
<template>
  <teleport to="#back">
    <div
      class="loading d-flex justify-content-center align-items-center h-100 w-100 loading-container"
      :style="{backgroundColor: background || ''}"
    >
      <div class="loading-content">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">{{text || 'loading'}}</span>
        </div>
        <p v-if="text" class="text-primary small">{{text}}</p>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useDOMCreate from "../hooks/useDOMCreate";
export default defineComponent({
  name: "Loading",
  props: {
    text: {
      type: String,
    },
    background: {
      type: String,
    },
  },
  setup() {
    useDOMCreate("back");
  },
});
</script>

<style lang="less">
.loading.loading-container {
  background: rgba(255, 255, 255, 0.5);
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  .loading-content {
    text-align: center;
  }
}
</style>