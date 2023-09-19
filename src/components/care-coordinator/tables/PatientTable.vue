<template>
  <a-table
    class="sortIconTable"
    rowKey="id"
    :columns="patients.staffSummaryPatientCols"
    :data-source="patients.staffSummaryPatient"
    :scroll="{ x: 800, y: 'calc(100vh - 570px)' }"
    :pagination="false"
    @change="handleTableChange"
  >
    <template
      #fullName="{ record }"
      v-if="arrayToObjact(screensPermissions, 63)"
    >
      <a @click="showPatientModal(record.id)" class="nameInfoIcon">
        <InfoCircleOutlined
      /></a>
      <router-link
        :to="{ name: 'PatientSummary', params: { udid: record.id } }"
        >{{
          record.fullName.length > 15
            ? record.fullName.substring(0, 20) + "..."
            : record.fullName
        }}</router-link
      >
    </template>
    <template #fullName="{ record }" v-else>
      <span>{{ record.firstName }}</span>
    </template>
    <template #lastName="text">
      <span>{{ text.text }}</span>
    </template>
    <template #flags="{ record }">
      <a-tooltip placement="bottom">
        <template #title>
          <span>{{ record.flagName }}</span>
        </template>
        <a class="icons">
          <span
            class="box"
            :style="{ 'background-color': record.flagColor }"
          ></span>
        </a>
      </a-tooltip>
    </template>
    <template #compliance>
      <a class="icons"> <WarningOutlined /></a>
    </template>

    <template #lastReadingValues>
      <WarningOutlined />
    </template>
    <template v-if="arrayToObjact(screensPermissions, 64)">
      <a-tooltip placement="bottom">
        <template #title>
          <span>{{ $t("global.delete") }}</span>
        </template>
        <a class="icons"> <DeleteOutlined /></a>
      </a-tooltip>
    </template>
  </a-table>
</template>

<script>
import { useStore } from "vuex";
import { computed, onMounted } from "vue";
import { DeleteOutlined, InfoCircleOutlined } from "@ant-design/icons-vue";
import { arrayToObjact, showPatientModal } from "@/commonMethods/commonMethod";
import { useRoute } from "vue-router";
export default {
  comments: {
    DeleteOutlined,
    InfoCircleOutlined,
  },
  setup() {
    const store = useStore();
    const router = useRoute();
    const patients = computed(() => {
      return store.state.careCoordinatorSummary;
    });
    const staffSummaryMeta = store.getters.staffSummaryMeta;
    let scroller = "";
    let data = [];
    onMounted(() => {
      var tableContent = document.querySelector(".ant-table-body");

      tableContent?.addEventListener("scroll", (event) => {
        let maxScroll = event.target.scrollHeight - event.target.clientHeight;
        let currentScroll = event.target.scrollTop + 2;
        if (currentScroll >= maxScroll) {
          // you're at the bottom of the page
          let current_page = staffSummaryMeta.value.current_page + 1;

          if (current_page <= staffSummaryMeta.value.total_pages) {
            scroller = maxScroll;
            store.state.careCoordinatorSummary.staffSummaryMeta = "";

            data = patients.value.staffSummaryPatient;
            //store.state.patients.patientList = ""

            store
              .dispatch("staffSummaryPatient", {
                id: router.params.udid,
                data:
                  "?page=" + current_page + store.getters.orderTable.value.data,
              })
              .then(() => {
                loadMoredata();
              });
          }
        }
      });
    });

    function loadMoredata() {
      const newData = patients.value.staffSummaryPatient;
      newData.forEach((element) => {
        data.push(element);
      });
      patients.value.staffSummaryPatient = data;
      var tableContent = document.querySelector(".ant-table-body");

      setTimeout(() => {
        tableContent.scrollTo(0, scroller);
      }, 50);
    }
    const handleTableChange = (pag, filters, sorter) => {
      if (sorter.order) {
        let order = sorter.order == "ascend" ? "ASC" : "DESC";
        let orderParam = "&orderField=" + sorter.field + "&orderBy=" + order;
        store.dispatch("orderTable", {
          data: orderParam,
          orderBy: order,
          page: pag,
          filters: filters,
        });

        store.dispatch("staffSummaryPatient", {
          id: router.params.udid,
          data: "?page=" + orderParam,
        });
      } else {
        store.dispatch("orderTable", {
          data: "&orderField=&orderBy=",
        });
        store.dispatch("staffSummaryPatient", {
          id: router.params.udid,
          data: "?page=" + store.getters.orderTable.value.data,
        });
      }
    };
    return {
      showPatientModal,
      arrayToObjact,
      screensPermissions: store.getters.screensPermissions,
      patients,
      handleTableChange,
    };
  },
};
</script>

<style>
</style>
