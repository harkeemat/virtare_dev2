<template>
  <!-- <a-layout>
    <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
      <Header />
    </a-layout-header>
    <a-layout>
      <a-layout-sider :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }">
        <Sidebar />
      </a-layout-sider> -->
      <Test :key="componentKey" />
    <!-- </a-layout>
  </a-layout> -->
</template>

<script>
import Test from "@/components/time-log-approval/Test"
// import Header from "@/components/layout/header/Header";
// import Sidebar from "@/components/administration/layout/sidebar/Sidebar";
import { computed } from 'vue-demi';
import { useStore } from 'vuex';

export default {
  name: 'ViewProviders',
  components: {
    Test,
    // Header,
    // Sidebar,
  },
  setup() {
    const store = useStore()
    const componentKey = computed(() => {
      return store.state.common.componentKey
    })

    return {
      componentKey,
    }
  }
}
</script>
