
<!--
  @Author: lvcy
  @Date: 2020/10/29/ 19:26:33
  @Description: 
-->
<template>
  <div class="dropdown" ref="dropdownRef">
    <a
      href="#"
      class="btn btn-outline-light my-2 dropdown-toggle"
      @click.prevent="toggleOpen"
    >{{title}}</a>
    <ul class="dropdown-menu" :style="{display: 'block'}" v-if="isOpen">
      <slot></slot>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, Ref, ref, toRefs, watch } from "vue";
import useClickOutside from "../hooks/useClickOutside";
export default defineComponent({
  name: "Dropdown",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  setup() {
    const dropdownRef = ref<null | HTMLElement>(null);
    const data = reactive({
      isOpen: false,
      toggleOpen: () => {
        data.isOpen = !data.isOpen;
      },
    });
    const isClickOutside: Ref<boolean> = useClickOutside(dropdownRef);

    watch(isClickOutside, () => {
      if (data.isOpen && isClickOutside.value) {
        data.isOpen = false;
      }
    });
    return {
      ...toRefs(data),
      dropdownRef,
    };
  },
});
</script>

<style lang="less">
</style>