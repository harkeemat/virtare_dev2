<template>
<div class="common-bg">
    <a-row>
        <a-col :span="24">
            <ShowModalButton @isVisible="showModal($event)" :headingText="$t('careCoordinator.coordinatorsModal.careCoordinator')" :buttonText="$t('careCoordinator.coordinatorsModal.addNewCoordinator')" v-if="arrayToObjact(screensPermissions,37)" />

        </a-col>
    </a-row>
    <a-row class="mb-24" :gutter="24" v-if="arrayToObjact(screensPermissions,40)">
        <a-col :xl="4" :xs="24" v-for="special,index in staffs.specializationStaff" :key="special.id">
            <h2 v-if="index==0">{{$t('global.specialization')}}</h2>
            <LongCard :class="index==0 ? 'active':''" :backgroundColor="special.color" textColor="" customClass="two" :count="special.total?special.total:0" :text="special.text" @click="filterData(special.text)"></LongCard>
        </a-col>
        <a-col :xl="4" :xs="24" v-for="network,index in staffs.networkStaff" :key="network.id">
            <h2 v-if="index==0">{{$t('global.network')}}</h2>
            <LongCard :backgroundColor="network.color" :class="index==0 ? 'active':''" textColor="" :count="network.total?network.total:0" :text="network.text" @click="filterData(network.text)"></LongCard>
        </a-col>
    </a-row>

    <a-row>
        <div class="commonTags">
            <a-tag v-if="route.query.filter" closable @close="filterData('remove')">{{ route.query.filter }}</a-tag>
        </div>
    </a-row>

    <a-row>
        <a-col :span="12" class=" mb-24">
            <SearchField endPoint="staff" v-if="arrayToObjact(screensPermissions,40)" />
        </a-col>
        <a-col :span="12">
            <div class="text-right mb-24">
                <ExportToExcel @click="exportExcel('careCoordinator_report','?filter='+route.query.filter +search +
                    orderTable.data+'&type=staff')" v-if="arrayToObjact(screensPermissions,41)" />
            </div>
        </a-col>
        <a-col :span="24">
            <CoordinatorTable></CoordinatorTable>
            <TableLoader />
        </a-col>
        <CareCoordinatorModalForms v-model:visible="visible" @saveModal="handleOk($event)" :staffType="342"></CareCoordinatorModalForms>
    </a-row>
</div>
</template>
<script>
import { watchEffect, ref, onUnmounted } from "vue";
import LongCard from "@/components/common/cards/LongCard";
import CoordinatorTable from "./tables/CoordinatorTable";
import CareCoordinatorModalForms from "@/components/modals/CoordinatorsModal";
import TableLoader from "@/components/loader/TableLoader";
import { useStore } from "vuex";
import ShowModalButton from "@/components/common/show-modal-button/ShowModalButton";
import { arrayToObjact, exportExcel } from "@/commonMethods/commonMethod";
import SearchField from "@/components/common/input/SearchField";
import ExportToExcel from "@/components/common/export-excel/ExportExcel.vue";
import { useRoute, useRouter } from "vue-router";

export default {
  components: {
    LongCard,
    CoordinatorTable,
    TableLoader,
    CareCoordinatorModalForms,
    ShowModalButton,
    SearchField,
    ExportToExcel,
  },
  setup() {
    const store = useStore();
    const searchoptions = ref([]);
    const visible = ref(false);
    const route = useRoute();
    const router = useRouter();

    watchEffect(() => {
      store.dispatch("specializationStaff");
      store.dispatch("networkStaff");
      store.dispatch("staffs");
      store.dispatch("searchTable", "&search=");
      store.dispatch("orderTable", {
        data: "&orderField=&orderBy=",
      });
    });

    const handleOk = (value) => {
      visible.value = value;
    };

    const showModal = (value) => {
      store.state.careCoordinator.documentStaffDetails = null;
      visible.value = value;
    };

    function filterData(event) {
      if (event != "remove") {
        setTimeout(() => {
          router.replace({
            query: {
              filter: event,
            },
          });
        }, 1000);
        store.dispatch("staffs", "?filter=" + event);
        store.dispatch("searchTable", "&search=" + event);
      } else {
        router.replace({
          query: {},
        });
        store.dispatch("staffs");
        store.dispatch("searchTable", "&search=");
      }
    }

    onUnmounted(() => {
      store.dispatch("searchTable", "&search=");
      store.dispatch("orderTable", {
        data: "&orderField=&orderBy=",
      });
    });

    const orderTable = store.getters.orderTable;
    return {
      exportExcel,
      screensPermissions: store.getters.screensPermissions,
      arrayToObjact,
      showModal,
      visible,
      handleOk,
      searchoptions,
      search: store.getters.searchTable,
      staffs: store.getters.staffRecord,
      orderTable,
      filterData,
      route,
    };
  },
};
</script>

<style lang="scss" scoped>
.colorBox {
  margin: 33px 0 10px;
  &.active {
    margin-top: 0;
  }
}
</style>
