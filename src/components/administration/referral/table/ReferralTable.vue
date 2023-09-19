
<template>

<a-table rowKey="id"  :columns="referralColumns" :data-source="referralList"  :scroll="{ y:'calc(100vh - 280px)'}" :pagination="false" @change="handleTableChange">
        <template #patientName="{ text, record }"  v-if="arrayToObjact(screensPermissions,65)">
            <router-link :to="{ name: 'PatientSummary', params: { udid: record.patientId } }">{{ text.length>20?text.substring(0,20)+'...':text }}</router-link>
          <a @click="showPatientModal( record.patientId)" v-if="arrayToObjact(screensPermissions, 65)" class="nameInfoIcon"> <InfoCircleOutlined/></a>
          <span v-else>{{text}}</span>
        </template> 
        <template #patientName="{ text }" v-else>
            <span>{{ text }}</span>
        </template> 
    
</a-table>
<TableLoader />
</template>
<script>
import { ref, onMounted ,} from "vue";
import { InfoCircleOutlined } from "@ant-design/icons-vue";

import TableLoader from "@/components/loader/TableLoader";
import { useStore } from "vuex";
import {
  
  arrayToObjact,
  showPatientModal
} from "@/commonMethods/commonMethod";
import { useRoute } from 'vue-router';
export default {
  components: {
  
    InfoCircleOutlined,
    TableLoader,
  },
  props: {},
  setup() {
    const store = useStore();
    const route = useRoute()
    //infinite scroll
    let data = [];
   
const  dateFilter = ref('')
    const meta = store.getters.referrareferralMetalList;
    const referralList = store.getters.referral
    const loader = ref(false);
    let filter = ''
    function checkDate(){
      dateFilter.value = route.query.fromDate && route.query.toDate ? "?fromDate=" + route.query.fromDate + "&toDate=" + route.query.toDate : "?fromDate=&toDate="
  filter = route.query.filter ? "&filter=" + route.query.filter : "&filter="
    }
     
        //dateFilter.value = route.query.fromDate && route.query.toDate ? "?fromDate=" + route.query.fromDate + "&toDate=" + route.query.toDate : "?fromDate=&toDate="
   
     let scroller = "";
        onMounted(() => {
           checkDate()
            var tableContent = document.querySelector(".ant-table-body");
            tableContent?.addEventListener("scroll", (event) => {
                let maxScroll = event.target.scrollHeight - event.target.clientHeight;
                let currentScroll = event.target.scrollTop + 2;
                if (currentScroll >= maxScroll) {
          let current_page = meta.value.current_page + 1;

          if (current_page <= meta.value.total_pages) {
            scroller = maxScroll;
            data = referralList.value
            loader.value = true;
            meta.value = "";
            //referralList.value=''
            store.state.referral.referralMeta = "";

            store
              .dispatch(
                "referral",
                 dateFilter.value + filter +
                  "&page=" +
                  current_page +
                  store.getters.searchTable.value +
                 
                  store.getters.orderTable.value.data
              )
              .then(() => {
                loadMoredata();
              });
          }
        }
      });
    });

    function loadMoredata() {
      const newData = referralList.value

      newData.forEach((element) => {
        data.push(element);
      });
    
      store.state.referral.referral = data
      loader.value = false;
      var tableContent = document.querySelector(".ant-table-body");

            setTimeout(() => {
                tableContent.scrollTo(0, scroller);
            }, 50);
            
    }

    const handleTableChange = (pag, filters, sorter) => {
      
      checkDate()
      if (sorter.order) {
        let order = sorter.order == "ascend" ? "ASC" : "DESC";
        let orderParam = "&orderField=" + sorter.field + "&orderBy=" + order;
        store.dispatch("orderTable", {
          data: orderParam,
          orderBy: order,
          page: pag,
          filters: filters,
        });
        store.dispatch(
          "referral",
          
          dateFilter.value + filter +
          store.getters.searchTable.value+
           orderParam
        );
      } else {
        store.dispatch("orderTable", {
          data: "&orderField=&orderBy=",
        });
        store.dispatch(
          "referral",
          dateFilter.value + filter + store.getters.searchTable.value+ store.getters.orderTable.value.data
        );
      }
    };
   
    return {
      showPatientModal,
      screensPermissions: store.getters.screensPermissions,
      arrayToObjact,
      loader,
      handleTableChange,
      referralColumns:store.getters.referralColumns,
      referralList,
     
    };
  },
};
</script>

<style>
</style>
