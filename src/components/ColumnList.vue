<!--
  @Author: lvcy
  @Date: 2020/10/28/ 22:43:10
  @Description: ColumnList
-->
<template>
  <div class="column-list">
    <div class="row">
      <div v-for="column in columnList" :key="column.id" class="col-4 mb-4">
        <div class="card h-100 shadow-sm">
          <div class="card-body text-center">
            <img
              :src="column.avatar"
              :alt="column.title"
              class="rounded-circle border border-light my-3"
            />
            <h5 class="card-title">{{ column.title }}</h5>
            <p class="card-text text-left">{{ column.description }}</p>
            <router-link :to="`/column/${column.id}`" class="btn btn-outline-primary">进入专栏</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, reactive, toRefs } from "vue";
import { ColumnProps } from "@/testData";
export default defineComponent({
  name: "ColumnList",
  props: {
    list: {
      required: true,
      type: Array as PropType<ColumnProps[]>,
    },
  },
  setup(props) {
    const data = reactive({
      columnList: computed(() => {
        return props.list.map((column) => {
          if (!column.avatar) {
            column.avatar = require("@/assets/column.jpg");
          }
          return column;
        });
      }),
    });
    return {
      ...toRefs(data),
    };
  },
});
</script>
<style lang="less">
.column-list {
  .card-body {
    img {
      width: 50px;
      height: 50px;
    }
  }
}
</style>
