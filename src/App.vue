<template>
  <div class="app">
    <div class="container">
      <global-header :user="currentUser"></global-header>
      <form>
        <div class="mb-3">
          <label class="form-label">邮箱地址</label>
          <validate-input :rules="emailRules" v-model="emailRef"></validate-input>
          {{emailRef}}
        </div>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Email address</label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Password</label>
          <input type="password" class="form-control" id="exampleInputPassword1" />
        </div>
      </form>
      <column-list :list="list" v-show="false"></column-list>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import "bootstrap/dist/css/bootstrap.min.css";
import ColumnList, { ColumnProp } from "@/components/ColumnList.vue";
import GlobalHeader, { UserProp } from "@/components/GlobalHeader.vue";
import ValidateInput, { RulesProp } from "@/components/ValidateInput.vue";
const emailRules: RulesProp = [
  { type: "required", message: "电子邮箱地址不能为空" },
  { type: "email", message: "请输入正确的电子邮箱格式" },
];
const currentUser: UserProp = {
  isLogin: true,
  name: "Young",
};
const testData: ColumnProp[] = [
  {
    id: 1,
    title: "test1的专栏",
    description: "这是的test1专栏，有一段非常有意思的简介，可以更新一下欧",
    avatar:
      "http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100",
  },
  {
    id: 2,
    title: "test2的专栏",
    description: "这是的test2专栏，有一段非常有意思的简介，可以更新一下欧",
    avatar:
      "http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100",
  },
  {
    id: 3,
    title: "test3的专栏",
    description: "这是的test3专栏，有一段非常有意思的简介，可以更新一下欧",
    avatar:
      "http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100",
  },
  {
    id: 4,
    title: "test4的专栏",
    description: "这是的test4专栏，有一段非常有意思的简介，可以更新一下欧",
  },
];
export default defineComponent({
  name: "App",
  components: {
    ColumnList,
    GlobalHeader,
    ValidateInput,
  },
  setup() {
    const emailRef = ref("Young");
    return {
      list: testData,
      currentUser,
      emailRules,
      emailRef,
    };
  },
});
</script>

<style lang="less">
</style>
