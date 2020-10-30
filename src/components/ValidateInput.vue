<!--
  @Author: lvcy
  @Date: 2020/10/29/ 21:06:34
  @Description: 
-->
<template>
  <div class="validate-input pb-3">
    <input
      v-if="tag !== 'textarea'"
      class="form-control"
      :class="{'is-invalid': inputRef.error}"
      :value="inputRef.val"
      @blur="validateInput"
      @input="updateValue"
      v-bind="$attrs"
    />
    <textarea
      v-else
      class="form-control"
      :class="{'is-invalid': inputRef.error}"
      :value="inputRef.val"
      @blur="validateInput"
      @input="updateValue"
      v-bind="$attrs"
    ></textarea>
    <span v-if="inputRef.error" class="invalid-feedback">{{inputRef.message}}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, reactive } from "vue";
import { emitter } from "./ValidateForm.vue";
const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
interface RuleProp {
  type: "required" | "email";
  message: string;
}
export type RulesProp = RuleProp[];
export type TagType = "input" | "textarea";
export default defineComponent({
  name: "ValidateInput",
  inheritAttrs: false,
  props: {
    rules: Array as PropType<RulesProp>,
    modelValue: String,
    tag: {
      type: String as PropType<TagType>,
      default: "input",
    },
  },
  setup(props, context) {
    const inputRef = reactive({
      val: props.modelValue || "",
      error: false,
      message: "",
    });
    const updateValue = (e: KeyboardEvent) => {
      const targetValue = (e.target as HTMLInputElement).value;
      inputRef.val = targetValue;
      context.emit("update:modelValue", targetValue);
    };
    const validateInput = () => {
      if (props.rules) {
        const allPass: boolean = props.rules.every((rule) => {
          let passed = true;
          inputRef.message = rule.message;
          switch (rule.type) {
            case "required":
              passed = inputRef.val.trim() !== "";
              break;
            case "email":
              passed = emailReg.test(inputRef.val);
              break;
            default:
              break;
          }
          return passed;
        });
        inputRef.error = !allPass;
        return allPass;
      }
      return true;
    };
    onMounted(() => {
      emitter.emit("form-item-created", validateInput);
    });
    return {
      inputRef,
      validateInput,
      updateValue,
    };
  },
});
</script>

<style lang="less">
</style>