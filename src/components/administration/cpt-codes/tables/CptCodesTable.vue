
<template>
<a-table rowKey="id" :columns="cptCodesColumns" :scroll="{ y:'calc(100vh - 280px)'}" :data-source="meta.cptCodesList"  :pagination="false" @change="handleTableChange">
    <!-- <template #actions="{record}">
        <a-tooltip placement="bottom" @click="editCpt(record.udid)" v-if="arrayToObjact(screensPermissions,10)">
            <template #title>
                <span>{{$t('global.edit')}}</span>
            </template>
            <a class="icons">
                <EditOutlined /></a>
        </a-tooltip>
        <a-tooltip placement="bottom" @click="deleteCpt(record.udid)" v-if="arrayToObjact(screensPermissions,11)">
            <template #title>
                <span>{{$t('global.delete')}}</span>
            </template>
            <a class="icons">
                <DeleteOutlined /></a>
        </a-tooltip>
    </template> -->
    <template #isActive="{record}" >
        <a-switch v-model:checked="record.isActive" @change="UpdateCptStatus(record.udid, $event)" :disabled="!arrayToObjact(screensPermissions,10)"/>
    </template>
</a-table>
<Loader />
</template>
<script>
import { ref, onMounted } from "vue";
//import { DeleteOutlined, EditOutlined } from "@ant-design/icons-vue";
import { messages } from "@/config/messages";
import Loader from "@/components/loader/Loader";
import { useStore } from "vuex";
import {
  warningSwal,
  arrayToObjact,
  tableYScroller,
 
} from "@/commonMethods/commonMethod";

export default {
  components: {
    //DeleteOutlined,
    //EditOutlined,
    Loader,
  },
  props: {},
  setup(props, { emit }) {
    const store = useStore();

    function deleteCpt(id) {
      warningSwal(messages.deleteWarning).then((response) => {
        if (response == true) {
          store.dispatch("deleteCptCode", id).then(() => {
            store.state.cptCodes.cptCodesList = "";
            store.dispatch("cptCodesList");
          });
        }
      });
    }
    const UpdateCptStatus = (id, status) => {
      const data = {
        isActive: status,
      };

      store
        .dispatch("updateCptCode", {
          id,
          data,
        })
        .then(() => {});
    };

    function editCpt(id) {
      store.getters.cptRecords.value.cptCodeDetails=''
      store.dispatch("cptCodeDetails", id);
      emit("is-visible", {
        check: true,
        id: id,
      });
    }

    //infinite scroll
    let data = [];
    

    const meta = store.getters.cptRecords.value;
    const loader = ref(false);
 
   let scroller = "";
        onMounted(() => {
            var tableContent = document.querySelector(".ant-table-body");
            tableContent?.addEventListener("scroll", (event) => {
                let maxScroll = event.target.scrollHeight - event.target.clientHeight;
                let currentScroll = event.target.scrollTop + 2;
                if (currentScroll >= maxScroll) {
          let current_page = meta.cptMeta.current_page + 1;

          if (current_page <= meta.cptMeta.total_pages) {
            scroller = maxScroll;
            data = meta.timeLogReportList;
            loader.value = true;
            meta.cptMeta = "";
            store.state.cptCodes.cptCodesList = "";

            store
              .dispatch(
                "cptCodesList",
                store.getters.searchTable.value +
                  "&page=" +
                  current_page +
               
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
      const newData = meta.cptCodesList;

      newData.forEach((element) => {
        data.push(element);
      });
      meta.cptCodesList = data;
      loader.value = false;
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
        store.dispatch(
          "cptCodesList",
          store.getters.searchTable.value + orderParam
        );
      } else {
        store.dispatch("orderTable", {
          data: "&orderField=&orderBy=",
        });
        store.dispatch(
          "cptCodesList",
          store.getters.searchTable.value + 
          store.getters.orderTable.value.data
        );
      }
    };
const cptCodesColumns = [
  {
    title: "Activity",
    dataIndex: "name",
    sorter:true,
  },
    {
      title: "Cpt Code",
      dataIndex: "cptCode",
      sorter:true
    },
    
    {
      title: "Billing Amount",
      dataIndex: "billingAmout",
      sorter:true,
      align: 'right'
    },
]
    return {
      screensPermissions: store.getters.screensPermissions,
      arrayToObjact,
      loader,
      deleteCpt,
      editCpt,
      UpdateCptStatus,
      meta,
      cptCodesColumns,
      tableYScroller,
      handleTableChange,
    };
  },
};
</script>

<style>
</style>
