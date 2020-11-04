<!--
  @Author: lvcy
  @Date: 2020/10/28/ 22:43:10
  @Description: ColumnList
-->
<template>
  <div class="column-list">
    <div class="row">
      <div
        v-for="column in columnList"
        :key="column._id"
        class="column-item col-12 col-sm-6 col-md-4"
      >
        <div class="card h-100 shadow-sm">
          <div class="card-body text-center">
            <img
              :src="column.avatar && column.avatar.url"
              :alt="column.title"
              class="rounded-circle border border-light my-3"
            />
            <h5 class="card-title">{{ column.title }}</h5>
            <p class="card-text text-left">{{ column.description }}</p>
            <router-link :to="`/column/${column._id}`" class="btn btn-outline-primary">进入专栏</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, reactive, toRefs } from "vue";
import { ColumnProps } from "@/store";
import { addColumnAvatar } from "@/helper";
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
          addColumnAvatar(column, 50, 50);
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
  padding: 0 12px;
  .column-item {
    margin: 12px 0;
  }
  .card-body {
    img {
      width: 50px;
      height: 50px;
    }
  }
}
</style>
