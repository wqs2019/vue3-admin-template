<script lang="ts" setup>
  import { initRoute } from '@/router/utils';
  import { getUserInfo } from '@/server/useInfo';
  import { useUserInfoStoreHook } from '@/store/modules/user';
  import { Avatar, Lock } from '@element-plus/icons-vue';
  import { reactive, ref, useTemplateRef } from 'vue';
  import { useRouter } from 'vue-router';
  import type { FormInstance, FormRules } from 'element-plus';

  const ruleFormRef = useTemplateRef<FormInstance>('rule-form-ref');

  const ruleForm = reactive({
    userName: 'zyg4',
    userPass: 'ZiYun!1882024',
  });
  const checked = ref<boolean>(false);

  const rules = reactive<FormRules<typeof ruleForm>>({
    userName: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
    userPass: [{ required: true, trigger: 'blur', message: '请输入密码' }],
  });

  const router = useRouter();
  const onLogin = async (): Promise<void> => {
    const res = await getUserInfo(ruleForm.userName, ruleForm.userPass);
    if (res.code === 200) {
      useUserInfoStoreHook().setUserInfo(res.data);
      await initRoute();
      router.push('/');
    }
  };

  const submitForm = (formEl: FormInstance | null) => {
    if (!formEl) return;
    formEl.validate(valid => {
      if (valid) {
        onLogin();
      } else {
        console.log('error submit!');
      }
    });
  };
</script>

<template>
  <el-form ref="rule-form-ref" :model="ruleForm" :rules="rules" size="large" class="demo-ruleForm">
    <el-form-item prop="userName" class="enter-y">
      <el-input v-model="ruleForm.userName" :prefix-icon="Avatar" clearable placeholder="用户名：admin" />
    </el-form-item>
    <el-form-item prop="userPass" class="enter-y">
      <el-input
        v-model="ruleForm.userPass"
        type="userPass"
        :prefix-icon="Lock"
        clearable
        show-user-pass
        placeholder="密码：admin123"
      />
    </el-form-item>

    <el-form-item class="enter-y">
      <div class="form-item-container">
        <el-checkbox v-model="checked" label="记住密码" />
        <el-button link type="primary"> 忘记密码？ </el-button>
      </div>
    </el-form-item>

    <el-form-item class="enter-y">
      <el-button class="submit-btn" @click="submitForm(ruleFormRef)"> 登录 </el-button>
    </el-form-item>
  </el-form>
</template>

<style lang="scss" scoped>
  .submit-btn {
    width: 100%;
  }

  .form-item-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 30px;
  }
</style>
