<template>
  <a-layout-sider>
    <div class="icon">
        <MenuOutlined @click="barMenu"/>
    </div>
    <div class="menuList">
      <a-menu id="dddddd"  mode="inline"
        @click="handleClick">
        <!-- <router-link to="/dashboard">
                <a-menu-item>
                    <HomeOutlined /><span class="menuItem">{{$t('global.dashboard')}}</span></a-menu-item>
            </router-link> -->

        <a-menu-item key="1">
          <router-link to="/dashboard">
            <HomeOutlined /><span class="menuItem">Clinical Dashboard</span>
          </router-link>
        </a-menu-item>

        <a-menu-item key="2">
          <router-link to="/businessDashboard" v-if="
            arrayToObjact(widgetsPermissions, 3) ||
            arrayToObjact(widgetsPermissions, 4) ||
            arrayToObjact(widgetsPermissions, 5) ||
            arrayToObjact(widgetsPermissions, 6)
          ">
            <CreditCardOutlined /><span class="menuItem">Business Dashboard</span>
          </router-link>
        </a-menu-item>

        <a-menu-item  key="3">
          <router-link to="/escalation" v-if="arrayToObjact(screensPermissions, 404)">
            <DashboardOutlined /><span class="menuItem">{{
              "Escalations"
            }}</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="4">
          <router-link to="/audit-escalation" v-if="arrayToObjact(screensPermissions, 404)">
            <FormOutlined /><span class="menuItem">{{
              $t("sidebar.auditEscalation")
            }}</span>
          </router-link>
        </a-menu-item>
        <a-menu-item  key="5">
          <router-link to="/referral" v-if="arrayToObjact(screensPermissions, 409)">
            <FileDoneOutlined /><span class="menuItem">Referrals</span>
          </router-link>
        </a-menu-item>
        <a-menu-item  key="6">
          <router-link :to="{
            name: 'Communications',
            query: {
              view: communicationRoute ? communicationRoute : 'dashboard',
            },
          }" v-if="arrayToObjact(screensPermissions, 109)">
            <MailOutlined /><span class="menuItem">{{
              $t("sidebar.communications")
            }}</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="7">
          <router-link :to="{ name: 'UnprocessedCommunications' }" v-if="
            arrayToObjact(screensPermissions, 505) ||
            arrayToObjact(screensPermissions, 506) ||
            arrayToObjact(screensPermissions, 507)
          ">
            <PhoneOutlined /><span class="menuItem">Unprocessed Communications</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="8">
          <router-link to="/manage-care-coordinator" v-if="arrayToObjact(screensPermissions, 40)">
            <TeamOutlined /><span class="menuItem">Care Coordinators</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="9">
          <router-link to="/specialists" v-if="arrayToObjact(screensPermissions, 40)">
            <MedicineBoxOutlined /><span class="menuItem">Specialists</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="10">
          <router-link to="/manage-patients" v-if="
            arrayToObjact(screensPermissions, 490) ||
            arrayToObjact(widgetsPermissions, 65) ||
            arrayToObjact(widgetsPermissions, 62) ||
            arrayToObjact(widgetsPermissions, 63)
          ">
            <UserOutlined /><span class="menuItem">{{
              $t("sidebar.patients")
            }}</span>
          </router-link>
        </a-menu-item>
        <a-menu-item  key="11">
          <router-link to="/appointment-calendar" v-if="arrayToObjact(screensPermissions, 112)">
            <CalendarOutlined /><span class="menuItem">Appointments</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="12">
          <router-link :to="{
            name: 'Tasks',
            query: { view: tasks ? tasks : 'dashboard' },
          }" v-if="arrayToObjact(screensPermissions, 113)">
            <BarChartOutlined /><span class="menuItem">{{
              $t("sidebar.tasks")
            }}</span>
          </router-link>
        </a-menu-item>

        <a-menu-item  key="13">
          <router-link to="/thresholds" v-if="arrayToObjact(screensPermissions, 329)">
            <ProjectOutlined /><span class="menuItem">{{
              $t("sidebar.generalParameters")
            }}</span>
          </router-link>
        </a-menu-item>
        <a-menu-item  key="14">
          <router-link to="/time-log-report" v-if="arrayToObjact(screensPermissions, 332)">
            <FormOutlined /><span class="menuItem">{{
              $t("sidebar.auditTimeLog")
            }}</span>
          </router-link>
        </a-menu-item>
        <a-menu-item  key="15">
          <router-link to="/time-log-approval" v-if="arrayToObjact(screensPermissions, 415)">
            <FieldTimeOutlined /><span class="menuItem">{{
              $t("sidebar.auditTimeLogApproval")
            }}</span>
          </router-link>
        </a-menu-item>

        <a-menu-item key="16">
          <router-link to="/time-tracking-report" v-if="arrayToObjact(screensPermissions, 411)">
            <DollarOutlined /><span class="menuItem">{{
              $t("sidebar.reports")
            }}</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="17">
          <router-link v-if="linkTo" :to="linkTo">
            <UserSwitchOutlined /><span class="menuItem">{{ $t("sidebar.administration") }}
            </span>
          </router-link>
        </a-menu-item>
      </a-menu>
    </div>
    <span class="version">V : 2.0 </span>
  </a-layout-sider>
</template>

<script>
import {
  defineComponent,
  computed,
  onUnmounted,
  ref,
  // onMounted,
  watch,
  watchEffect,
} from "vue";

import {
  DollarOutlined,
  HomeOutlined,
  MailOutlined,
  UserOutlined,
  CalendarOutlined,
  DashboardOutlined,
  CreditCardOutlined,
  FileDoneOutlined,
  TeamOutlined,
  MedicineBoxOutlined,
  ProjectOutlined,
  BarChartOutlined,
  FieldTimeOutlined,
  UserSwitchOutlined,
  PhoneOutlined,
  FormOutlined,
  MenuOutlined
} from "@ant-design/icons-vue";
import { useStore } from "vuex";
import { arrayToObjact } from "@/commonMethods/commonMethod";
export default defineComponent({
  components: {
    DollarOutlined,
    HomeOutlined,
    FormOutlined,
    MailOutlined,
    UserOutlined,
    CalendarOutlined,
    DashboardOutlined,
    CreditCardOutlined,
    FileDoneOutlined,
    TeamOutlined,
    MedicineBoxOutlined,
    ProjectOutlined,
    BarChartOutlined,
    FieldTimeOutlined,

    UserSwitchOutlined,
    PhoneOutlined,
    MenuOutlined
  },

  setup() {
    const store = useStore();
    const linkTo = ref(null);

    const screensPermissions = computed(() => {
      return store.state.screenPermissions.screensPermissions;
    });
    const roles = computed(() => {
      return localStorage.getItem("roleAuth");
    });

    const escalationStatus = computed(() => {
      return store.state.escalations.escalationStaus;
    });
    onUnmounted(() => {
      document.body.classList.remove("show");
    });

    watchEffect(() => {
      if (screensPermissions.value) {
        if (arrayToObjact(screensPermissions.value, 9)) {
          linkTo.value = { name: "CptCodes" };
        } else if (arrayToObjact(screensPermissions.value, 15)) {
          linkTo.value = { name: "ManageProgram" };
        } else if (arrayToObjact(screensPermissions.value, 22)) {
          linkTo.value = { name: "ManageProviders" };
        } else if (arrayToObjact(screensPermissions.value, 1)) {
          linkTo.value = { name: "RolesPermissions" };
        } else if (arrayToObjact(screensPermissions.value, 6)) {
          linkTo.value = { name: "GlobalCodes" };
        } else if (arrayToObjact(screensPermissions.value, 336)) {
          linkTo.value = { name: "Inventory" };
        } else if (arrayToObjact(screensPermissions.value, 447)) {
          linkTo.value = { name: "QuestionnaireTemplate" };
        } else if (arrayToObjact(screensPermissions.value, 445)) {
          linkTo.value = { name: "QuestionnaireBank" };
        } else if (arrayToObjact(screensPermissions.value, 422)) {
          linkTo.value = { name: "WorkFlow" };
        }
      }
    });

    // const selectedKeys = ref([]);
    const openKeys = ref(["sub1"]);

    const handleClick = (e) => {
      console.log("click", e);
    };

    const titleClick = (e) => {
      console.log("titleClick", e);
    };

    watch(
      () => openKeys,
      (val) => {
        console.log("openKeys", val);
      }
    );

    const tasks = computed(() => {
      return store.state.tasks.taskRoute;
    });
    const communicationRoute = computed(() => {
      return store.state.communications.communicationRoute;
    });
    function barMenu() {
            var barMenu = JSON.parse(localStorage.getItem("barmenu"));
            if (barMenu == true) {
                localStorage.setItem("barmenu", JSON.stringify(false));
            }
            else {
                localStorage.setItem("barmenu", JSON.stringify(true));
            }
            document.body.classList.toggle("show");
        }

    return {
      communicationRoute,
      tasks,
      escalationStatus,
      linkTo,
      arrayToObjact,
      roles,
      screensPermissions,
      widgetsPermissions: store.getters.widgetsPermissions,
      // selectedKeys,
      openKeys,
      handleClick,
      titleClick,
      barMenu,
    };
  },
});
</script>

<style lang="scss">
#nav {
  a {
    color: #000;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
