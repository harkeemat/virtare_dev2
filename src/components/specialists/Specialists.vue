<template>
  <div class="common-bg">
  <a-row>
    <a-col :span="24">
      <ShowModalButton @isVisible="showModal" :headingText="$t('specialists.specialists')" :buttonText="$t('specialists.addSpecialist')" v-if="arrayToObjact(screensPermissions,37)"/>
    </a-col>
    <a-col :span="12" class=" mb-24">
      <SearchField endPoint="specialists" v-if="arrayToObjact(screensPermissions,40)"/>
    </a-col>
    <a-col :span="12" >
      <div class="text-right mb-24">
        <ExportToExcel @click="exportExcel('specialists_report','?fromDate=&toDate='+search)" v-if="arrayToObjact(screensPermissions,41)"/>
      </div>
    </a-col>
    <a-col :span="24" >
      <SpecialistsTable />
      <TableLoader />
    </a-col>
  </a-row>
  </div>
  <CoordinatorsModal v-model:visible="visibleCoordinatorsModal" @closeSpecialistModal="closeModal($event)" :staffType="343" />
</template>

<script>
// import CoordinatorsModal from "@/components/modals/CoordinatorsModal";
import CoordinatorsModal from "@/components/escalations/AddSpecialistModal"
import {
  watchEffect,
  ref,
  onUnmounted
} from "vue"
import SpecialistsTable from "@/components/specialists/tables/SpecialistsTable"
import TableLoader from "@/components/loader/TableLoader"
import {
  useStore
} from "vuex"
import {
  arrayToObjact,
  exportExcel
} from "@/commonMethods/commonMethod"
import SearchField from "@/components/common/input/SearchField";
import ExportToExcel from "@/components/common/export-excel/ExportExcel.vue";
import { useRoute, useRouter } from 'vue-router'
import ShowModalButton from "@/components/common/show-modal-button/ShowModalButton"

export default {
  components: {
    CoordinatorsModal,
    SpecialistsTable,
    TableLoader,
    SearchField,
    ExportToExcel,
    ShowModalButton,
  },
    setup() {
      const store = useStore()
      const searchoptions = ref([])
      const route = useRoute();
      const router = useRouter();
      const visibleCoordinatorsModal = ref(false)

      const showModal = () => {
        visibleCoordinatorsModal.value = true;
      };

      const closeModal = (value) => {
        console.log('value',value)
        visibleCoordinatorsModal.value = value ? value:false;
      };
        
      watchEffect(() => {
        store.dispatch("specialists")
        store.dispatch("searchTable", '&search=')
        store.dispatch('orderTable', {
          data: '&orderField=&orderBy='
        })
      })
      
      onUnmounted(() => {
        store.dispatch("searchTable", '&search=')
        store.dispatch('orderTable', {
          data: '&orderField=&orderBy='
        })
      })

      function filterData(event) {
        if (event != "remove") {
          setTimeout(() => {
            router.replace({
              query: {
                filter: event
              }
            })
          }, 1000)
          store.dispatch("staffs", "?filter="+event)
        }
        else {
          router.replace({
            query: {}
          })
          store.dispatch("staffs")
        }
      }

      return {
        exportExcel,
        screensPermissions:store.getters.screensPermissions,
        arrayToObjact,
        searchoptions,
        search:store.getters.searchTable,
        staffs: store.getters.staffRecord,
        filterData,
        route,
        showModal,
        closeModal,
        visibleCoordinatorsModal,
      };
    },
};
</script>


