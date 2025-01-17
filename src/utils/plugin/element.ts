// https://element-plus.org/zh-CN/component/icon.html
import {
  ArrowDown,
  ArrowRight,
  Avatar,
  Briefcase,
  CaretLeft,
  CaretRight,
  FullScreen,
  Grid,
  HomeFilled,
  Management,
  Operation,
  Printer,
  Refresh,
  RemoveFilled,
  Select,
  Setting,
} from '@element-plus/icons-vue';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import {
  ElAlert,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElButton,
  ElCalendar,
  ElCard,
  ElCascader,
  ElCheckbox,
  ElCheckboxGroup,
  ElCol,
  ElCollapseTransition,
  ElColorPicker,
  ElDatePicker,
  ElDescriptions,
  ElDescriptionsItem,
  ElDivider,
  ElDrawer,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElForm,
  ElFormItem,
  ElIcon,
  ElInfiniteScroll,
  ElInput,
  // 指令
  ElLoading,
  ElMenu,
  ElMenuItem,
  ElOption,
  ElProgress,
  ElRadio,
  ElRadioGroup,
  ElRow,
  ElScrollbar,
  ElSelect,
  ElSubMenu,
  ElSwitch,
  ElTable,
  ElTableColumn,
  ElTabPane,
  ElTabs,
  ElTag,
  ElText,
  ElTooltip,
} from 'element-plus';

import type { App, Component } from 'vue';

// Directives
const plugins = [ElLoading, ElInfiniteScroll];

const components = [
  ElTag,
  ElButton,
  ElInput,
  ElScrollbar,
  ElMenu,
  ElMenuItem,
  ElSubMenu,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElIcon,
  ElTooltip,
  ElDrawer,
  ElRow,
  ElCol,
  ElCard,
  ElDescriptions,
  ElDescriptionsItem,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElForm,
  ElFormItem,
  ElAlert,
  ElDatePicker,
  ElCascader,
  ElSelect,
  ElOption,
  ElCheckboxGroup,
  ElCheckbox,
  ElRadioGroup,
  ElRadio,
  ElTable,
  ElTableColumn,
  ElCalendar,
  ElTabs,
  ElTabPane,
  ElDivider,
  ElSwitch,
  ElProgress,
  ElColorPicker,
  ElText,
  ElCollapseTransition,
];

// Icon
export const iconComponents = [
  HomeFilled,
  Avatar,
  Operation,
  Grid,
  Setting,
  RemoveFilled,
  Refresh,
  CaretLeft,
  CaretRight,
  ArrowDown,
  Management,
  Select,
  ArrowRight,
  FullScreen,
  Briefcase,
  Printer,
];

const transElIconName = (iconName: string): string => {
  // 使用正则表达式将大写字母替换为 '-' 加小写字母
  let result = iconName.replace(/([A-Z])/g, match => {
    return `-${match.toLowerCase()}`;
  });
  // 如果转换后的字符串以 '-' 开头，将其移除
  if (result.startsWith('-')) {
    result = result.slice(1);
  }
  return `el-icon-${result}`;
};

export function useElementPlus(app: App) {
  // 注册组件
  components.forEach((component: Component) => {
    app.component(component.name as string, component);
  });
  // 注册指令
  plugins.forEach(plugin => {
    app.use(plugin);
  });

  // 注册图标
  for (const [_, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(transElIconName(component.name as string), component);
  }
  // iconComponents.forEach((component: Component) => {
  //   app.component(transElIconName(component.name as string), component);
  // });
}
