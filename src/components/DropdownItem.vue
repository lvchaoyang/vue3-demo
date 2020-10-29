<!--
  @Author: lvcy
  @Date: 2020/10/29/ 19:34:25
  @Description: 
-->
<template>
  <li class="dropdown-item dropdown-option" :class="{'is-disabled': disabled}">
    <slot></slot>
  </li>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "DropdownItem",
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style lang="less">
.dropdown-item {
  &.is-disabled * {
    color: #6c757d;
    pointer-events: none;
    background-color: transparent;
  }
}
</style>