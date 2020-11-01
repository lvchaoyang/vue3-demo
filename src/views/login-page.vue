<!--
  @Author: lvcy
  @Date: 2020/10/30/ 21:08:30
  @Description: 
-->
<template>
  <div class="login-page mx-auto p-3 w-330">
    <h5 class="my-4 text-center">登录到者也</h5>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">邮箱地址</label>
        <validate-input :rules="emailRules" v-model="emailRef" type="text" placeholder="请输入邮箱地址"></validate-input>
      </div>
      <div class="mb-3">
        <label class="form-label">密码</label>
        <validate-input
          :rules="passwordRules"
          v-model="passwordRef"
          type="password"
          placeholder="请输入密码"
        ></validate-input>
      </div>
      <template #submit>
        <button type="button" class="btn btn-danger">提交</button>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import ValidateInput, { RulesProp } from "@/components/ValidateInput.vue";
import ValidateForm from "@/components/ValidateForm.vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { GlobalDataProps } from "@/store";
import createMessage from "../components/createMessage";
export default defineComponent({
  name: "login-page",
  components: {
    ValidateInput,
    ValidateForm,
  },
  setup() {
    const store = useStore<GlobalDataProps>();
    const router = useRouter();
    const emailRules: RulesProp = [
      { type: "required", message: "电子邮箱地址不能为空" },
      { type: "email", message: "请输入正确的电子邮箱格式" },
    ];
    const passwordRules: RulesProp = [
      { type: "required", message: "密码不能为空" },
    ];
    const emailRef = ref("");
    const passwordRef = ref("");
    const onFormSubmit = (result: boolean) => {
      if (result) {
        const payload = {
          email: emailRef.value,
          password: passwordRef.value,
        };
        store
          .dispatch("loginAndFetch", payload)
          .then(() => {
            createMessage("登录成功，3秒后跳转首页", "success");
            setTimeout(() => {
              router.push({ path: "/home" });
            }, 3000);
          })
          .catch((e) => {
            console.log("Login Page Catch Error:" + e);
          });
      }
    };
    return {
      emailRef,
      emailRules,
      passwordRef,
      passwordRules,
      onFormSubmit,
    };
  },
});
</script>

<style lang="less">
</style>