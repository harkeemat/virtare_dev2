<template>
<a-table rowKey="id" :data-source="meta.staffs" :scroll="{ x: 1020,y:'calc(100vh - 460px)'}" :pagination=false :columns="meta.columns" @change="handleTableChange">
    <template #name="{text,record}" v-if="arrayToObjact(screensPermissions,38)">
        <router-link :to="{ name: 'CoordinatorSummary', params: { udid:record.uuid?record.uuid:'eyrer8758458958495'  }}">{{ text }}</router-link>
        <!-- <a @click="showStaffModal( record.uuid)"  class="nameInfoIcon"> <InfoCircleOutlined/></a> -->
    </template>
   
    <template #name="{text}" v-else>
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
        <a-switch v-model:checked="record.isActive" @change="updateStatus(record.id, $event)" :disabled="!arrayToObjact(screensPermissions,38) || record?.uuid==userName?.user?.staffUdid" />
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
        <a-tooltip placement="bottom" v-if="arrayToObjact(screensPermissions,39) && record?.uuid!=userName?.user?.staffUdid">
            <template #title  v-if="record.user_id == 1" disabled>
                <span>Can't Delete Super Admin</span>
            </template>
            <template #title v-else>
                <span>{{$t('global.delete')}}</span>
            </template>
            <a class="icons" v-if="record.user_id == 1"  :disabled="record?.uuid==userName?.user?.staffUdid">
                <DeleteOutlined @click="deletestaff(record.uuid)" /></a>
                <a class="icons" v-else @click="deletestaff(record.uuid)">
                <DeleteOutlined  />
            </a>
        </a-tooltip>
        <a-tooltip placement="bottom" v-else-if="arrayToObjact(screensPermissions,39)" disabled>
            <template #title disabled>
                <span>{{$t('global.delete')}}</span>
            </template>
            <a class="icons"  disabled>
                <DeleteOutlined  disabled/></a>
                
        </a-tooltip>

    </template>
</a-table>
<ResetPassword v-model:visible="resetPasswordVisible" @saveModal="saveModal($event)" endPoint="staff" :id="idData" />
</template>

<script>
import { WarningOutlined,DeleteOutlined, } from "@ant-design/icons-vue";
import {
  dateFormat,
  arrayToObjact,
  showStaffModal
} from "@/commonMethods/commonMethod";
import { defineComponent, onMounted,ref,defineAsyncComponent } from "vue";
import { useStore } from "vuex";
import {
    messages
} from "@/config/messages";
import {
    warningSwal,tableYScrollerCounterPage
} from "@/commonMethods/commonMethod";
export default defineComponent({
    name: "DataTable",
    components: {
        WarningOutlined,
        DeleteOutlined,
        ResetPassword: defineAsyncComponent(() => import("@/components/reset-password/modal/ResetPassword")),
    },
    props: {},
    setup() {
        const store = useStore();
        const userName = JSON.parse(localStorage.getItem("auth"));
        //const fields = reactive(props.staffRecords.columns)
        const resetPasswordVisible = ref()
        const idData = ref()
        const meta = store.getters.staffRecord.value;
        let data = [];
        let scroller = "";
        onMounted(() => {
            var tableContent = document.querySelector(".ant-table-body");
            tableContent?.addEventListener("scroll", (event) => {
                let maxScroll = event.target.scrollHeight - event.target.clientHeight;
                let currentScroll = event.target.scrollTop + 2;
                if (currentScroll >= maxScroll) {
                    let current_page = meta.staffMeta.current_page + 1;

                    if (current_page <= meta.staffMeta.total_pages) {
                        scroller = maxScroll;
                        meta.staffMeta = "";
                        data = meta.staffs;
                        //store.state.careCoordinator.staffs = "";

                        store
                            .dispatch(
                                "staffs",
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
            const newData = meta.staffs;

            newData.forEach((element) => {
                data.push(element);
            });
            meta.staffs = data;
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
                    "staffs",
                    "?page=" + store.getters.searchTable.value + orderParam
                );
            } else {
                store.dispatch("orderTable", {
                    data: "&orderField=&orderBy=",
                });
                store.dispatch(
                    "staffs",
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

        function deletestaff(id) {
            warningSwal(messages.deleteWarning).then((response) => {
                if (response == true) {

                    var index = meta.staffs.findIndex(function (o) {
                        return o.uuid === id;
                    })

                    store.dispatch("staffDelete", id)
                    meta.staffs.splice(index, 1)
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
            showStaffModal,
            deletestaff,
            tableYScrollerCounterPage,
            userName
        };
    },
});
</script>
