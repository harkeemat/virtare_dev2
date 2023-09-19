<template>
  <a-col :sm="24" :xs="24" class="mb-24">
    <a-card :title="title">
      <div class="pageTittle patientSummaryFilter">
      <DateFilter :Buttons="filterButtons" @clickButtons="showButton(deviceId)" :hideArray="hideFilterPatientsVital"  :commit="commit" />
      </div>
      <a-tabs v-if="!isEscalationAction">
        <a-tab-pane key="1" tab="Table" v-if="!escalationAdd" >
          <a-col :span="24">
            <strong>(<b class="brightRedColor">*</b>)</strong> <strong>Manual Entry. </strong>
          </a-col>
          <a-col :span="24">
              <div class="text-right mb-24" >
                <ExportToExcel disabled @click="exportExcel('patientTimelog_report',filtterDates)" />
              </div>
          </a-col>
          <VitalsTable  :columns="tableColumns" :data="tableData" :scroll="scroll"  />
        </a-tab-pane>
        <a-tab-pane key="2" tab="Graph" v-if="chartSeries" >
          <ApexChart type="area" height="350" :options="chartOptions" :series="chartSeries" />
        </a-tab-pane>
      </a-tabs>
      <a-tabs v-if="isEscalationAction">
      <a-tab-pane key="1" tab="Graph" v-if="chartSeries ">
          <ApexChart type="area" height="350" :options="chartOptions" :series="chartSeries" />
        </a-tab-pane>
        <a-tab-pane key="2" tab="Table" v-if="!escalationAdd" >
          <a-col :span="24">
            <strong>(<b class="brightRedColor">*</b>)</strong> <strong>Manual Entry. </strong>
          </a-col>
          <a-col :span="24">
          <div class="text-right mb-24" >
            <ExportToExcel disabled @click="exportExcel('patientTimelog_report',filtterDates)" />
          </div>
      </a-col>
          <VitalsTable :columns="tableColumns" :data="tableData" :scroll="scroll" />
        </a-tab-pane>
        
      </a-tabs>
      <template #extra v-if="!isEscalationAction">
        <a>
          <a-button class="btn blackBtn" @click="showModal">
            <PlusOutlined/>
          </a-button>
        </a>
      </template>
    </a-card>
  </a-col>
</template>

<script>
import {
  PlusOutlined,
  // InfoCircleOutlined
} from "@ant-design/icons-vue";
import VitalsTable from "@/components/patients/patientSummary/common/VitalsTable";
import ApexChart from "@/components/common/charts/ApexChart";
import DateFilter from "@/components/common/DateFilter"
import {  onMounted, onUnmounted, ref, watchEffect } from 'vue-demi';
import { useStore } from 'vuex';
import { dayWeekMonthdate ,hideFilterPatientsVital} from '@/commonMethods/commonMethod';
import { useRoute } from 'vue-router';
import ExportToExcel from "@/components/common/export-excel/ExportExcel.vue";

export default {
  components: {
    // InfoCircleOutlined,
    PlusOutlined,
    VitalsTable,
    ApexChart,
    DateFilter,
    ExportToExcel
  },
  props: {
    title: {
      type: String
    },
    deviceId: {
      type: Number
    },
    activeKey: {
      type: String
    },
    tableColumns: {
      type: Array
    },
    tableData: {
      type: Array
    },
    chartOptions: {
      type: Array
    },
    chartSeries: {
      type: Array
    },
    filterButtons: {
      type: Object
    },
    commit: {
      type: String
    },
    isEscalationAction:{
      type:Boolean
    },
    escalationAdd:{
      type:Boolean
    },
    scroll:{
      type:Object
    },
    patientId:{
      type:String
    },
  },
  setup(props, {emit}) {
    const store = useStore()
    const route = useRoute()

    const showModal = () => {
      emit('showModal')
    }

    // const filteredVitals = computed(() => {
    //   return store.state.patients.filteredVitals
    // })
    
    const bloodOxygenTimeline = store.getters.bloodOxygenTimeline
    const bloodGlucoseTimeline = store.getters.bloodGlucoseTimeline
    const bloodPressureTimeline = store.getters.bloodPressureTimeline
    const patientId = props.patientId ? ref(props.patientId) : ref(route.params.udid)
    function getVitals() {
      if(props.commit=="bloodOxygenTimeline"){
       // console.log("bloodOxygenTimeline.value",bloodOxygenTimeline.value)
        bloodOxygenTimeline.value ? apiCall(bloodOxygenTimeline.value, 100) : store.dispatch("timeLine", {
          id: 344,
          commit: "bloodOxygenTimeline"
        }).then(() => {
          apiCall(bloodOxygenTimeline.value, 100)
        })
      
    }else if(props.commit=="bloodGlucoseTimeline"){
     // console.log("bloodGlucoseTimeline.value",bloodGlucoseTimeline.value)
        bloodGlucoseTimeline.value ? apiCall(bloodGlucoseTimeline.value, 101) : store.dispatch("timeLine", {
          id: 344,
          commit: "bloodGlucoseTimeline"
        }).then(() => {
          apiCall(bloodGlucoseTimeline.value, 101)
        })
    }else  if(props.commit=="bloodPressureTimeline"){
      //console.log("bloodPressureTimeline.valu",bloodPressureTimeline.value)
        bloodPressureTimeline.value ? apiCall(bloodPressureTimeline.value, 99) : store.dispatch("timeLine", {
          id: 344,
          commit: "bloodPressureTimeline"
        }).then(() => {
          apiCall(bloodPressureTimeline.value, 99)
        })
    }
    }

    watchEffect(() => {
      
      
    })
    const interval = ref('')
    onMounted(() => {
      if(route.name == 'PatientSummary') {
        getVitals()

      }else{
        // getVitals()
      }
        
        interval.value =  setInterval(() => {
        if(route.name == 'PatientSummary') {
            getVitals()
      }
    }, 10000)
    
     
      
    })
     onUnmounted(()=>{
      clearInterval(interval.value);
     })
    function apiCall(data, deviceId) {
      let dateFormat = dayWeekMonthdate(data)
      let dateFilter = dateFormat ? "&fromDate=" + dateFormat.fromDate + "&toDate=" + dateFormat.toDate : ''
      if(deviceId) {
        store.dispatch("patientVitals", {
          patientId:patientId.value,
          deviceType: deviceId,
          filter: dateFilter,
        });
      }
      else {
        store.dispatch("patientVitals", {
          patientId:patientId.value,
          deviceType: 99,
          filter: dateFilter,
        });
        store.dispatch("patientVitals", {
          patientId:patientId.value,
          deviceType: 100,
          filter: dateFilter,
        });
        store.dispatch("patientVitals", {
          patientId:patientId.value,
          deviceType: 101,
          filter: dateFilter,
        });
      }
    }

    function showButton(deviceId) {
      //store.commit('filteredVitals', true)
      if(deviceId == 99) {
        apiCall(bloodPressureTimeline.value, deviceId)
      }
      if(deviceId == 100) {
        apiCall(bloodOxygenTimeline.value, deviceId)
      }
      if(deviceId == 101) {
        apiCall(bloodGlucoseTimeline.value, deviceId)
      }
    }

    return {
      showModal,
      showButton,
      hideFilterPatientsVital
    }
  }
}
</script>

<style lang="scss" scoped>
.active {
  background-color: #777;
  color: #fff;
}
.pageTittle {
  margin: 0;
  .filter {
    position: initial;
    text-align: right;
  }
}
.text-right {
  @media (max-width:767px) {
    text-align: left;
    margin-top: 15px;
  }
}
</style>