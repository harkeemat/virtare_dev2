<template>
    <a-button type="primary">
      {{ $t("global.exportToExcel") }}
      <template #icon><DownloadOutlined /></template>
    </a-button>
</template>
<script>
import { defineComponent } from "vue";
import { DownloadOutlined } from "@ant-design/icons-vue";
export default defineComponent({
 components:{
  DownloadOutlined
 },
  setup() {
    return {

    };
  },
});
</script>