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
    username: '',
    password: '',
  });
  const checked = ref<boolean>(false);

  const rules = reactive<FormRules<typeof ruleForm>>({
    username: [{ required: true, trigger: 'blur', message: t('sys.login.rules.userName') }],
    password: [{ required: true, trigger: 'blur', message: t('sys.login.rules.password') }],
  });

  const router = useRouter();
  const onLogin = async (): Promise<void> => {
    const res = await getUserInfo(ruleForm.username, ruleForm.password);
    if (res.code === 1) {
      useUserInfoStoreHook().setUserInfo(res.data);
      await initRoute(res.data.role);
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
    <el-form-item prop="username" class="enter-y">
      <el-input v-model="ruleForm.username" :prefix-icon="Avatar" clearable placeholder="用户名：admin" />
    </el-form-item>
    <el-form-item prop="password" class="enter-y">
      <el-input
        v-model="ruleForm.password"
        type="password"
        :prefix-icon="Lock"
        clearable
        show-password
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
