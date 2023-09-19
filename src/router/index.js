import { createRouter, createWebHashHistory } from 'vue-router'
// import Home from '../views/Home.vue'

const routes = [
  {
    path: "/escalation-action/:udid?",
    name: "EscalationAction",
    component: () => import("@/components/templates/EscalationAction.vue"),
  },

  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
    meta: { authAdmin: true },
  },
  {
    path: "/dashboard",
    name: "ClinicalDashboard",
    component: () => import("@/views/clinic/dashboard/Dashboard"),
    meta: { authAdmin: true },
  },

  {
    path: "/communications",
    name: "Communications",
    component: () => import("@/views/communications/Communications"),
    meta: { authAdmin: true },
  },

  {
    path: "/unprocessed-communications",
    name: "UnprocessedCommunications",
    component: () =>
      import("@/views/unprocessed-communications/UnprocessedCommunications"),
    meta: { authAdmin: true },
  },

  {
    path: "/manage-care-coordinator",
    name: "ManageCareCoordinators",
    component: () =>
      import("@/views/manage-care-coordinator/ManageCareCoordinator"),
    meta: { authAdmin: true },
  },

  {
    path: "/specialists",
    name: "Specialists",
    component: () => import("@/views/specialists/Specialists"),
    meta: { authAdmin: true },
  },

  {
    path: "/tasks",
    name: "Tasks",
    component: () => import("@/views/tasks/Tasks"),
    meta: { authAdmin: true },
  },

  {
    path: "/manage-patients",
    name: "PatientsWithFilter",
    component: () => import("@/views/patients/Patients"),
    meta: { authAdmin: true },
  },
  {
    path: "/manage-patients",
    name: "Patients",
    component: () => import("@/views/patients/Patients"),
    meta: { authAdmin: true },
  },

  {
    path: "/appointment-calendar",
    name: "AppointmnetCalendar",
    component: () => import("@/views/appoinment-calendar/AppointmentCalendar"),
    meta: { authAdmin: true },
  },

  {
    path: "/appointment-calendar/:udid",
    name: "Appointmnet Calendar for Patient",
    component: () => import("@/views/appoinment-calendar/AppointmentCalendar"),
    meta: { authAdmin: true },
  },

  {
    path: "/patients-summary/:udid",
    name: "PatientSummary",
    component: () => import("@/views/patients/PatientSummary"),
    //beforeLeave: ()=>{ console.log("before_leave") },
    meta: { authAdmin: true },
  },

  {
    path: "/coordinator-summary/:udid?",
    name: "CoordinatorSummary",
    component: () =>
      import("@/views/manage-care-coordinator/Coordinatorsummary"),
    meta: { authAdmin: true },
  },

  {
    path: "/specialist-summary/:udid?",
    name: "SpecialistSummary",
    component: () => import("@/views/specialists/SpecialistSummary"),
    meta: { authAdmin: true },
  },
  {
    path: "/time-tracking-report",
    name: "TimeTrackingReport",
    component: () => import("@/views/time-tracking-report/TimeTrackingReport"),
    meta: { authAdmin: true },
  },
  {
    path: "/thresholds",
    name: "Thresholds",
    component: () => import("@/views/thresholds/Thresholds"),
    meta: { authAdmin: true },
  },
  {
    path: "/time-log-report",
    name: "TimeLogReport",
    component: () => import("@/views/audit-timelog/AuditTimelog"),
    meta: { authAdmin: true },
  },

  {
    path: "/time-log-approval",
    name: "TimeLogApproval",
    component: () => import("@/views/time-log-approval/TimeLogApproval"),
    meta: { authAdmin: true },
  },

  {
    path: "/notifications",
    name: "Notifications",
    component: () => import("@/views/notifications/Notifications"),
    meta: { authAdmin: true },
  },
  {
    path: "/request-call-notifications",
    name: "CallNotifications",
    component: () => import("@/views/notifications/RequestCallNotifications"),
    meta: { authAdmin: true },
  },
  {
    path: "/video-call/:id?",
    name: "videoCall",
    component: () => import("@/views/video-call/VideoCall"),
    meta: { authAdmin: true },
  },
  {
    path: "/reset-password",
    name: "ResetPassword",
    component: () => import("@/views/reset-password/ResetPassword"),
    meta: { authAdmin: true },
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: () => import("@/components/forgot-password/ForgotPassword"),
  },

  {
    // path: '/',
    name: "Login",
    component: () => import("@/views/login/Login"),
  },

  {
    path: '/staff/:udid?/create-password:token?',
    name: 'CreatePassword',
    component: () => import('@/views/setup-password/CreatePassword.vue'),
  },
  {
    path: "/logout",
    name: "Logout",
    component: () => import("@/views/logout/Logout"),
    meta: { authAdmin: true },
  },

  {
    path: "/setup-password",
    name: "SetupPassword",
    component: () => import('@/views/setup-password/SetupPassword'),
  },
  {
    path: "/thank-you",
    name: "ThankYou",
    component: () => import("@/components/thankYou/ThankYou"),
  },
  {
    path: '/otp',
    name: 'Otp',
    component: () => import('@/views/otp/Otp'),
  },

  {
    path: "/admin/global-codes",
    name: "GlobalCodes",
    component: () => import("@/views/administration/global-codes/GlobalCodes"),
    meta: { authAdmin: true },
  },

  {
    path: "/admin/manage-programs",
    name: "ManageProgram",
    component: () => import("@/views/administration/programs/Programs"),
    meta: { authAdmin: true },
  },

  {
    path: "/admin/providers",
    name: "ManageProviders",
    component: () => import("@/views/administration/providers/Providers"),
    meta: { authAdmin: true },
  },

  {
    path: "/admin/provider-summary/:id",
    name: "providerSummary",
    component: () => import("@/views/administration/providers/ProviderSummary"),
    meta: { authAdmin: true },
  },

  {
    path: "/admin/roles-and-permissions",
    name: "RolesPermissions",
    component: () =>
      import(
        "@/views/administration/roles-and-permissions/RolesAndPermissions"
      ),
    meta: { authAdmin: true },
  },
  {
    path: "/admin/cpt-codes",
    name: "CptCodes",
    component: () => import("@/views/administration/cpt-codes/CptCodes"),
    meta: { authAdmin: true },
  },
  {
    path: "/admin/inventory",
    name: "Inventory",
    component: () => import("@/views/administration/inventory/Inventory"),
    meta: { authAdmin: true },
  },
  {
    path: "/admin/staff-groups",
    name: "StaffGroups",
    component: () => import("@/views/administration/staffGroups/StaffGroups"),
    meta: { authAdmin: true },
  },

  // testing Links
  {
    path: "/test",
    name: "Test",
    component: () => import("@/components/Test.vue"),
    meta: { authAdmin: true },
  },

  {
    path: "/admin/questionnaire",
    name: "Questionnaire",
    component: () =>
      import("@/views/administration/questionnaire/Questionnaire"),
    meta: { authAdmin: true },
  },
  {
    path: "/admin/questionnaire-bank",
    name: "QuestionnaireBank",
    component: () => import("@/views/questionnaire-bank/QuestionnaireBank"),
    meta: { authAdmin: true },
  },
  {
    path: "/admin/questionnaire-template",
    name: "QuestionnaireTemplate",
    component: () =>
      import("@/views/questionnaire-template/QuestionnaireTemplate"),
    meta: { authAdmin: true },
  },
  {
    path: "/admin/template-section",
    name: "QuestionnaireTemplateSection",
    component: () =>
      import("@/views/template-section/QuestionnaireTemplateSection"),
    meta: { authAdmin: true },
  },
  {
    path: "/admin/question-template-detail/:udid",
    name: "QuestionTemplateDetail",
    component: () =>
      import("@/views/questionnaire-template/QuestionTemplateDetail"),
    meta: { authAdmin: true },
  },
  {
    path: "/question-section-detail/:udid",
    name: "QuestionSectionDetail",
    component: () =>
      import("@/views/questionnaire-template/QuestionSectionDetail"),
    meta: { authAdmin: true },
  },
  {
    path: "/template-view/:udid",
    name: "TemplateResponse",
    component: () => import("@/views/template-response/TemplateResponse"),
    meta: { authAdmin: true },
  },
  {
    path: "/admin/questionnaire-response/:udid",
    name: "QuestionnaireResponse",
    component: () => import("@/views/questionnaire-response/TemplateResponse"),
    meta: { authAdmin: true },
  },
  {
    path: "/admin/resources",
    name: "Resources",
    component: () => import("@/views/resources/Resources"),
    meta: { authAdmin: true },
  },

  {
    path: "/admin/work-flow",
    name: "WorkFlow",
    component: () => import("@/views/workflow-setup/WorkFlowSetup"),
    meta: { authAdmin: true },
  },
  {
    path: "/admin/questionnaireResponse",
    name: "Questionnaire Response",
    component: () => import("@/views/questionnaireForm/QuestionnaireForm"),
    meta: { authAdmin: true },
  },

  {
    path: "/admin/workflow/:workflowUdid/workflow-actions",
    name: "WorkFlowActions",
    component: () => import("@/views/workflow-actions/WorkFlowActions"),
    meta: { authAdmin: true },
  },

  {
    path: "/admin/workflow/:workflowUdid/workflow-actions/:actionUdid",
    name: "WorkFlowActionsDetails",
    component: () => import("@/views/workflow-actions/WorkFlowActionsDetails"),
    meta: { authAdmin: true },
  },

  {
    path: "/businessDashboard",
    name: "BusinessDashboard",
    component: () => import("@/views/business/dashboard/Dashboard"),
    meta: { authAdmin: true },
  },
  {
    path: "/referral",
    name: "Referral",
    component: () => import("@/views/referral/Referral"),
    meta: { authAdmin: true },
  },

  {
    path: "/escalation",
    name: "Escalation",
    component: () => import("@/views/escalations/Escalations"),
    meta: { authAdmin: true },
  },
  {
    path: "/audit-escalation",
    name: "AuditEscalation",
    component: () => import("@/views/audit-escalation/AuditEscalation"),
    meta: { authAdmin: true },
  },
  {
    path: "/templateResponse/:udid",
    name: "Response Template",
    component: () =>
      import(
        "@/components/administration/questionnaire-template/TemplateResponse"
      ),
    meta: { authAdmin: true },
  },
  {
    path: "/mail-dashboard",
    name: "MailDashboard",
    component: () => import("@/views/mail-dashboard/MailDashboard"),
    meta: { authAdmin: true },
  },

  {
    path: "/admin/custom-dashboard",
    name: "CustomDashboard",
    component: () => import("@/views/custom-dashboard/CustomDashboard"),
    meta: { authAdmin: true },
  },
 
  {
    path: '/bug-report',
    name: 'BugReport',
    component: () => import('@/views/bug-report/BugReport'),
    meta: { authAdmin: true }
  },
  {
    path: '/admin/tool-tip',
    name: 'ToolTip',
    component: () => import('@/views/tool-tip/ToolTip'),
    meta: { authAdmin: true }
  },

]

const router = createRouter({
  mode: 'history',
  history: createWebHashHistory(),
  routes
})
function isLoggedIn() {
  return localStorage.getItem("access");
}

// this route used for requested page after login
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.authAdmin)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!isLoggedIn()) {
      next({ name: "Login", query: { redirect: to.fullPath } });
    } else {
      next(); // go to wherever I'm going
    }
  } else {
    if (isLoggedIn()) {
      if (to.name != "Login") {
        next({
          name: "ClinicalDashboard",
          query: { redirect: to.fullPath },
        });
      } else {
        next({
          name: "ClinicalDashboard",
        });
      }
    } else {
      next();
    }
    // next() // does not require auth, make sure to always call next()!
  }
});
export default router;
