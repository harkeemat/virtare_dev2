<template>
  <a-table class="sortIconTable" rowKey="id" :data-source="meta.specialists" :scroll="{ x: 1020,y:tableYScroller}" :pagination=false :columns="meta.specialistsColumns" @change="handleTableChange">
    <!-- <template #name="{text,record}" v-if="arrayToObjact(screensPermissions,38)">
      <router-link :to="{ name: 'SpecialistSummary', params: { udid:record.uuid ? record.uuid : 'eyrer8758458958495' }}">
        {{ text }}
      </router-link>
    </template>
   
    <template #name="{text}" v-else>
      <span>{{ text }}</span>
    </template> -->
   
    <template #name="{text}">
      <span>{{ text }}</span>
    </template>
    
    <template #role="{ record }">
      <span v-for="(role,i) in record.role" :key="role.id" >
        <br v-if="i > 0"/> {{ i!= 0  ? ', '+  role.name :  role.name }}
      </span>
    </template>
    <template #createdDate="text">
      <span>{{ dateFormat(text.text) }}</span>
    </template>
    <template #status="{record}">
      <a-switch v-model:checked="record.isActive" @change="updateStatus(record.id, $event)" :disabled="!arrayToObjact(screensPermissions,38)" />
    </template>
    <template #lastReadingDate>
      <WarningOutlined />
    </template>
    <template #action="{record}" >
      <!-- <a-tooltip placement="bottom">
        <template #title>
          <span>{{'Reset Password'}}</span>
        </template>
        <a class="icons">
          <KeyIcon height=16 width=16 alt="Reset Password" @click="resetPasseord(record.id)"/>
        </a>
      </a-tooltip> -->
      <a-tooltip placement="bottom" v-if="arrayToObjact(screensPermissions,39)">
        <template #title>
          <span>{{$t('global.delete')}}</span>
        </template>
        <a class="icons">
        <DeleteOutlined @click="deleteSpecialist(record.uuid)" /></a>
      </a-tooltip>
    </template>
</a-table>
<ResetPassword v-model:visible="resetPasswordVisible" @saveModal="saveModal($event)" endPoint="staff" :id="idData" />
</template>

<script>
import { 
  WarningOutlined,
  DeleteOutlined,
} from "@ant-design/icons-vue";
import {
  dateFormat,
  arrayToObjact,
  tableYScroller
} from "@/commonMethods/commonMethod";
import { 
  defineComponent,
  onMounted,
  ref,
  defineAsyncComponent
} from "vue";
import { useStore } from "vuex";
import {
  messages
} from "@/config/messages";
import {
  warningSwal,
} from "@/commonMethods/commonMethod";
// import KeyIcon from "@/components/common/KeyIcon";

export default defineComponent({
  name: "DataTable",
  components: {
    // KeyIcon,
    WarningOutlined,
    DeleteOutlined,
    ResetPassword: defineAsyncComponent(() => import("@/components/reset-password/modal/ResetPassword")),
  },
  props: {},
  setup() {
    const store = useStore();
    const resetPasswordVisible = ref()
    const idData = ref()
    const meta = store.getters.specialistRecord.value;
    let data = [];
    let scroller = "";
    onMounted(() => {
      var tableContent = document.querySelector(".ant-table-body");
      tableContent?.addEventListener("scroll", (event) => {
        let maxScroll = event.target.scrollHeight - event.target.clientHeight;
        let currentScroll = event.target.scrollTop + 2;
        if (currentScroll >= maxScroll) {
          let current_page = meta.specialistMeta.current_page + 1;

          if (current_page <= meta.specialistMeta.total_pages) {
            scroller = maxScroll;
            meta.specialistMeta = "";
            data = meta.specialists;

            store.dispatch("specialists",
              "?page=" +
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
      const newData = meta.specialists;
      newData.forEach((element) => {
        data.push(element);
      });
      meta.specialists = data;
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
          "specialists",
          "?page=" + store.getters.searchTable.value + orderParam
        );
      } else {
        store.dispatch("orderTable", {
          data: "&orderField=&orderBy=",
        });
        store.dispatch(
          "specialists",
          "?page=" +
          store.getters.searchTable.value +
          store.getters.orderTable.value.data
        );
      }
    };

    const updateStatus = (id, status) => {
      const data = {
        isActive: status,
      };
      store.dispatch("updateStaffStatus", {
        id,
        data,
      });
    };

    function deleteSpecialist(id) {
      warningSwal(messages.deleteWarning).then((response) => {
        if (response == true) {
          store.dispatch("staffDelete", id).then(() => {
            var index = meta.specialists.findIndex(function (o) {
              return o.uuid === id;
            })
            meta.specialists.splice(index, 1)
          })
        }
      })
    }

    const resetPasseord = (id) => {
      resetPasswordVisible.value = true;
      idData.value = id
    };

    const saveModal = (value) => {
      resetPasswordVisible.value = value
    }

    return {
      idData,
      resetPasswordVisible,
      resetPasseord,
      saveModal,
      screensPermissions: store.getters.screensPermissions,
      arrayToObjact,
      updateStatus,
      meta,
      dateFormat,
      handleTableChange,
      deleteSpecialist,
      tableYScroller
    };
  },
});
</script>
