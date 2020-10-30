<!--
  @Author: lvcy
  @Date: 2020/10/30/ 19:42:25
  @Description: 
-->
<template>
  <div class="validate-form">
    <slot name="default"></slot>
    <div class="submit-area" @click.prevent="submitForm">
      <slot name="submit">
        <button type="submit" class="btn btn-primary">提交</button>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from "vue";
import mitt from "mitt";
type ValidateFunc = () => boolean;
export const emitter = mitt();
export default defineComponent({
  name: "ValidateForm",
  emits: ["form-submit"],
  setup(props, context) {
    const funcArr: Array<ValidateFunc> = [];
    const submitForm = () => {
      const result = funcArr.map((func) => func()).every((result) => result);
      context.emit("form-submit", result);
    };
    const callback = (func?: ValidateFunc) => {
      funcArr.push(func as ValidateFunc);
    };
    emitter.on("form-item-created", callback);
    onUnmounted(() => {
      emitter.off("form-item-created", callback);
    });
    return {
      submitForm,
    };
  },
});
</script>

<style lang="less">
</style>