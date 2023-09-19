
<template>
<a-col :span="24">
    <a-table class="sortIconTable" rowKey="id" :columns="meta.programColumns" :data-source="meta.manageProgramList"  :scroll="{ x: 900,y:tableYScroller}" @change="handleTableChange" :pagination=false>
        <!-- <template #actions="text">
            <a-tooltip placement="bottom" v-if="arrayToObjact(screensPermissions,16)">
                <template #title>
                    <span>{{$t('global.edit')}}</span>
                </template>
                <a class="icons" @click="editProgram(text.record)">
                    <EditOutlined />
                </a>
            </a-tooltip>
            <a-tooltip placement="bottom" v-if="arrayToObjact(screensPermissions,17)">
                <template #title>
                    <span>{{$t('global.delete')}}</span>
                </template>
                <a class="icons" @click="deleteProgram(text.record)">
                    <DeleteOutlined />
                </a>
            </a-tooltip>
        </template> -->
        <template #isActive="{record}" >
          <!-- :disabled="!arrayToObjact(screensPermissions,16)" -->
            <a-switch v-model:checked="record.isActive" @change="UpdateProgramStatus(record.udid, $event)"  :disabled="true"/>
        </template>
    </a-table>
    <TableLoader />
</a-col>
</template>
<script>
import { ref, onMounted, watchEffect } from "vue";
//import { DeleteOutlined, EditOutlined } from "@ant-design/icons-vue";
import {
  warningSwal,
  arrayToObjact,
  tableYScroller
} from "@/commonMethods/commonMethod";
import { messages } from "@/config/messages";
import { useStore } from "vuex";

import TableLoader from "@/components/loader/TableLoader";
export default {
  components: {
    TableLoader,
    //DeleteOutlined,
    //EditOutlined,
  },
  setup(props, { emit }) {
    const store = useStore();
    const checked = ref([false]);
    watchEffect(() => {
      store.dispatch("manageProgramList");
      store.dispatch("searchTable", "&search=");
      store.dispatch("orderTable", {
        data: "&orderField=&orderBy=",
      });
    });

    function editProgram(getRecord) {
      store.dispatch("editManageProgram", getRecord.udid);
      emit("is-edit", {
        check: true,
        id: getRecord.udid,
      });
    }

    function deleteProgram(id) {
      warningSwal(messages.deleteWarning).then((response) => {
        if (response == true) {
          store.commit('loadingTableStatus', true)
          store.dispatch("deleteManageProgram", id.udid).then(()=>{
            store.dispatch("manageProgramList")
          })
          
          
        }
      });
    }
    const UpdateProgramStatus = (id, status) => {
      const data = {
        isActive: status,
      };
      store.dispatch("updateManageProgram", {id,data,})
    };
    //ifinitescroller
    const meta = store.getters.programsRecord.value;
    const loader = ref(false);
    
    let data = [];
    let scroller = "";
        onMounted(() => {
            var tableContent = document.querySelector(".ant-table-body");
            tableContent?.addEventListener("scroll", (event) => {
                let maxScroll = event.target.scrollHeight - event.target.clientHeight;
                let currentScroll = event.target.scrollTop + 2;
                if (currentScroll >= maxScroll) {
          let current_page = meta.programMeta.current_page + 1;

          if (current_page <= meta.programMeta.total_pages) {
            scroller = maxScroll;
            data = meta.manageProgramList;
            loader.value = true;
            store.state.program.programMeta = "";
            store.state.programs.manageProgramList = "";

            store
              .dispatch(
                "manageProgramList",
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
      const newData = meta.manageProgramList;
      newData.forEach((element) => {
        data.push(element);
      });
      meta.manageProgramList = data;
var tableContent = document.querySelector(".ant-table-body");

            setTimeout(() => {
                tableContent.scrollTo(0, scroller);
            }, 50);
            
      loader.value = false;
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
          "manageProgramList",
          store.getters.searchTable.value + orderParam
        );
      } else {
        store.dispatch("orderTable", {
          data: "&orderField=&orderBy=",
        });
        store.dispatch(
          "manageProgramList",
          store.getters.searchTable.value + store.getters.orderTable.value.data
        );
      }
    };
    return {
      meta,
      screensPermissions: store.getters.screensPermissions,
      arrayToObjact,
      loader,
      checked,
      deleteProgram,
      editProgram,
      UpdateProgramStatus,
      tableYScroller,
      handleTableChange,
    };
  },
};
</script>
