
<template>
<a-table  class="sortIconTable" rowKey="id" :pagination="false" :columns="staffs.roleListColms" :data-source="staffs.roleList" >
  <template #role="{record}">
        <span>{{ record.role.name }}</span>
    </template>
    <template #action="text" v-if="arrayToObjact(screensPermissions,57)">
        <a-tooltip placement="bottom" @click="deleteRole(text.record.id)">
            <template #title>
                <span>{{$t('global.delete')}}</span>
            </template>
            <a class="icons">
                <DeleteOutlined /></a>
        </a-tooltip>
    </template>
</a-table>
</template>
<script>
import { computed } from "vue";
import {
  DeleteOutlined,
} from "@ant-design/icons-vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { warningSwal,arrayToObjact } from "@/commonMethods/commonMethod";
import { messages } from "@/config/messages";
export default {
  components: {
    DeleteOutlined,
  },
  props: {
    Id: String,
  },
  setup(props) {
    const store = useStore();
    const router = useRoute();

    function deleteRole(id) {
      warningSwal(messages.deleteWarning).then((response) => {
        if (response == true) {
          store.dispatch("deleteStaffRole", {
            id: props.Id ? props.Id : router.params.udid,
            roleID: id,
          }).then(() => {
            store.dispatch("roleList", props.Id ? props.Id : router.params.udid);
            store.dispatch("staffSummary", router.params.udid);
          })
        }
      });
    }
    const staffs = computed(() => {
      return store.state.careCoordinator;
    });
    
    return {
      screensPermissions:store.getters.screensPermissions,
      arrayToObjact,
      staffs,
      deleteRole,
    };
  },
};
</script>
