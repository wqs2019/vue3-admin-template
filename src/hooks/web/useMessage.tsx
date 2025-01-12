import { ElMessage, ElMessageBox } from 'element-plus';
import type { ElMessageBoxOptions } from 'element-plus';

function createElMessageBox(message: string, title: string, options: ElMessageBoxOptions) {
  ElMessageBox.confirm(message, title, options)
    .then(() => {})
    .catch(() => {});
}

function createErrorModal(message: string) {
  createElMessageBox(message, '错误提示', {
    confirmButtonText: '确认',
    cancelButtonText: '关闭',
    type: 'error',
  });
}

function createErrorMsg(message: string) {
  ElMessage.error(message);
}

export function useMessage() {
  return {
    createErrorModal,
    createErrorMsg,
  };
}
