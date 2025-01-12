<script setup lang="ts">
  import { useRootSetting } from '@/hooks/setting/useRootSetting';
  import { usePermissionStoreHook } from '@/store/modules/permission';
  import { _storage } from '@jsxiaosi/utils';
  import { ref } from 'vue';

  const { appConfig, setAppConfigMode } = useRootSetting();

  const { persistent } = usePermissionStoreHook();

  const labelPersistentRef = ref<boolean>(appConfig.value.tabPersistent);
  const labelPersistentChange = (e: string | number | boolean) => {
    if (!e) _storage.removeStorage('multiTabsList');
    else persistent();
    setAppConfigMode({ tabPersistent: Boolean(e) });
  };

  const hidePublicChange = () => {
    setAppConfigMode({});
  };
</script>

<template>
  <div>
    <div class="options">
      <span>隐藏侧边栏</span>
      <el-switch v-model="appConfig.hideSidebar" @change="hidePublicChange" />
    </div>
    <div class="options">
      <span>隐藏顶部导航栏</span>
      <el-switch v-model="appConfig.hideNavbart" @change="hidePublicChange" />
    </div>
    <div class="options">
      <span>隐藏标签栏</span>
      <el-switch v-model="appConfig.hideTabs" @change="hidePublicChange" />
    </div>
    <div class="options">
      <span>隐藏标签栏操作按钮</span>
      <el-switch v-model="appConfig.hideTabsConfig" @change="hidePublicChange" />
    </div>
    <div class="options">
      <span>关闭标签页拖拽</span>
      <el-switch v-model="appConfig.closeTabDrag" @change="hidePublicChange" />
    </div>
    <div class="options">
      <span>标签持久化</span>
      <el-switch v-model="labelPersistentRef" @change="labelPersistentChange" />
    </div>
    <div class="options">
      <span>侧边栏折叠按钮</span>
      <el-select
        v-model="appConfig.sidebarFold"
        class="select"
        placeholder="侧边栏折叠按钮"
        size="small"
        @change="hidePublicChange"
      >
        <el-option v-for="item in ['顶部', '底部', '不显示']" :key="item" :label="item" :value="item" />
      </el-select>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .options {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;

    .color-picker {
      position: relative;
      width: 50px;
      height: 24px;

      span {
        display: block;
        width: 100%;
        height: 100%;
      }
    }

    .select {
      width: 100px;
    }
  }
</style>
