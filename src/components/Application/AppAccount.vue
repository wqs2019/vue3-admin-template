<script setup lang="ts">
  import { usePermissionStoreHook } from '@/store/modules/permission';
  import { useUserInfoStoreHook } from '@/store/modules/user';
  import { useRouter } from 'vue-router';
  const router = useRouter();

  const command = (value: string) => {
    if (value === 'signOut') {
      usePermissionStoreHook().handleRemoveMultiTabs();
      useUserInfoStoreHook().removeUserInfo();
      router.push('/login');
    }
  };
  const userName = useUserInfoStoreHook().userInfo?.userName;
</script>

<template>
  <div class="account cursor">
    <el-dropdown trigger="click" @command="command">
      <!-- <img src="@/assets/login/logo.png" class="wave" /> -->
      <div class="username">{{ userName }}</div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="signOut"> 退出登录 </el-dropdown-item>
          <div><div /></div>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style lang="scss" scoped>
  .account {
    .username {
      color: #8c8c8c;
      font-size: 18px;
    }
  }
</style>
