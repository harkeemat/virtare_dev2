
<template>
  <a-table class="sortIconTable" rowKey="id" :columns="appointments.staffSummaryAppointmentCols" :data-source="appointments.staffSummaryAppointment" :pagination="false">
    <template #patient="{ record }">
      <router-link :to="{ name: 'PatientSummary', params: { udid: record.patientUdid } }">{{ record.patient }}</router-link>
    </template> 
    <template #appt="text">
      <span >{{ text.text }}</span>
    </template>
     <template #action>
        <a-tooltip placement="bottom" >
            <template #title>
                <span>{{$t('global.delete')}}</span>
            </template>
            <a class="icons">
                <DeleteOutlined /></a>
        </a-tooltip>
    </template> -->
  </a-table>
</template>
<script>
import { useStore } from "vuex"
import { computed, onMounted } from "vue"
import { DeleteOutlined, } from "@ant-design/icons-vue";
import { useRoute } from 'vue-router';
export default {
  comments: {
    DeleteOutlined
  },
  setup() {
    const router = useRoute()
    const store = useStore()
    const appointments = computed(() => {
      return store.state.careCoordinatorSummary
    })
    let scroller = "";
    let data = []
    onMounted(() => {


      var tableContent = document.querySelector(".ant-table-body");

      tableContent?.addEventListener("scroll", (event) => {

        let maxScroll = event.target.scrollHeight - event.target.clientHeight;
        let currentScroll = event.target.scrollTop + 2;
        if (currentScroll >= maxScroll) {
          // you're at the bottom of the page
          let current_page = appointments.value.staffSummaryAppointmentMeta.value.current_page + 1;

          if (current_page <= appointments.value.staffSummaryAppointmentMeta.value.total_pages) {
            scroller = maxScroll;
            store.state.careCoordinatorSummary.staffSummaryAppointmentMeta = "";

            data = appointments.value.staffSummaryAppointment;
            //store.state.patients.patientList = ""

            store
              .dispatch(
                "staffSummaryAppointment", {
                  id: router.params.udid, data:
                    "?page=" +
                    current_page +
                    store.getters.orderTable.value.data
              }
              )
              .then(() => {
                loadMoredata();
              });
          }
        }
      });
    });

    function loadMoredata() {
      const newData = appointments.value.staffSummaryAppointment;
      newData.forEach((element) => {
        data.push(element);
      });
      appointments.value.staffSummaryAppointment = data;
      var tableContent = document.querySelector(".ant-table-body");

      setTimeout(() => {
        tableContent.scrollTo(0, scroller);
      }, 50);
    }
    return {
      appointments
    }
  }
};
</script>

<style>

</style>
