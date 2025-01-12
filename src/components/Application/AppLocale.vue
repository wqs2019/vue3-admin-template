<script setup lang="ts">
  import SvgIcon from '@/components/SvgIcon/index.vue';
</script>

<template>
  <el-dropdown trigger="click">
    <SvgIcon class="icon cursor" name="locales" />
    <template #dropdown>
      <el-dropdown-menu>
        <!-- <el-dropdown-item v-for="item in localesList" :key="item.locale" :command="item.locale">
          {{ item.name }}
        </el-dropdown-item> -->
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style lang="scss" scoped>
  .icon {
    color: var(--text-color-primary);
    font-size: var(--font-size-extra-large);
  }
</style>
