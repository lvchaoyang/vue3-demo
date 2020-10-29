<!--
  @Author: lvcy
  @Date: 2020/10/28/ 22:43:10
  @Description:
-->
<template>
  <div class="column-list">
    <ul>
      <li v-for="column in list" :key="column.id">
        <img :src="column.avatar" :alt="column.title" />
        <h5>{{ column.title }}</h5>
        <p>{{ column.description }}</p>
        <a href="#">进入专栏</a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
export interface ColumnProps {
  id: number;
  title: string;
  avatar: string;
  description: string;
}
export default defineComponent({
  name: 'ColumnList',
  props: {
    list: {
      required: true,
      type: Array as PropType<ColumnProps[]>
    }
  }
})
</script>
<style lang="less"></style>
