<!--
  @Author: lvcy
  @Date: 2020/11/03/ 20:50:46
  @Description: 
-->
<template>
  <div class="user-profile">
    <div class="d-flex align-items-center">
      <img :src="fitUrl" :alt="user.nickName" class="rounded-circle img-thumbnail" />
      <div class="detail ml-2">
        <h6 class="d-block mb-0">{{user.nickName}}</h6>
        <span class="text-truncate text-muted d-block">{{user.description}}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { addColumnAvatar } from "@/helper";
import { UserProps } from "@/store";
import { computed, defineComponent, PropType } from "vue";
export default defineComponent({
  name: "UserProfile",
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true,
    },
  },
  setup(props) {
    const fitUrl = computed(() => {
      addColumnAvatar(props.user, 50, 50);
      const { avatar } = props.user;
      return avatar && avatar.fitUrl;
    });
    return {
      fitUrl,
    };
  },
});
</script>

<style lang="less">
</style>