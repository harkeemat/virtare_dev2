// API end points
export const API_ENDPOINTS = {
    // Authentication
    login: "login",
    logout: "logout",
    refreshToken: "refreshToken",
    //dashboard
    interval:"globalstartEnd/date",
    cptCodeGraph:"cptCode/billingSummary",
    // Patients
    patient:"patient",
    patientsList:"patient",
    patientDetails:"patient",
    counterCard:"patient/count",
    financial:"financialStats",
    cptCode:"patient/count",
    totalPatientsChart:"patient/chart",
    timeLine:"patient/new",
    timeLineType:"timeLineType",
    patientProfile:"patientProfile",
    referral:"referral",
    // Appointments
    appointment:"appointment",
    todayAppointment:"appointment/today",
    appointmentChart:"appointment/summary",
    futureAppointments:"appointment/future",
    newRequests:"appointment/new",
    addAppointment:"appointment",
    seacrhAppointment:"appointment/search",
    appointmentConference:'appointment/conference',
    // Care Coordinator
    staffList:"staff",
    staff:"staff",
    specialization:"staff/specialization",
    network:"staff/network",
    // Communications
    communication:"communication",
    communicationsList:"communication",
    communicationTypes:"communication/type",
    addCommunication:"communication",
    communicationsCount:"communication/count",
    communicationsView:"communication/messages",
    callStatus:"call/status",
    CallPlanned:"call/staff",
    timeApproval:"timeApproval",
    //conversation
    conversation:'conversation',
    getConversation:'get-conversation',
    conversationSend:'send-message',
    // Tasks
    task:"task",
    taskStatus:"task/status",
    allTaskStatus:"task/status/summery",
    taskPriority:"task/priority",
    searchTasks:"task/search",
    taskTeamMember:'task/staff',
    taskCategory: 'task/category',
	completeTaskRate: 'task/completion/rates',
    // Global Codes
    globalCodesList: 'globalCodeCategory',
    globalCode: 'globalCode', 
    // inventory
    inventory: 'inventory',
    model: 'model',
    // Roles & Permissions
    role: 'role',
    rolesList: 'roleList',
    addPermissions:'rolePermission',
    rolePermissions: 'permissionList',
    roleDetails: 'roleDetails',
    rolePermissionEdit:'rolePermissionEdit', 
    dashboardWidget:'widget',
    widgetAccess:'widgetAccess',
    dashboardWidgetList:"dashboardWidget",
    // Notes
    notes: 'patient/notes',
    // timeLogs
    timeLog: 'patient/timeLog',
    deleteTimeLog: 'deleteTimeLog',
    activeCptCodes :'cptCodeActivities',
    //Thresholds
    getVital:'field',
    generalParameter:'generalParameterGroup',
    deleteParameter:'generalParameter',
    //Programs
    programsList:"program",
    program:"program",
    // CPT Codes
    cptCodes: 'cptCode',
    service: 'service',
    // Vital Fields
    field: 'field',
    //Providers
    provider:'provider',
    // Flags
    flag:'flag',
    // Critical Notes
    criticalNote:'criticalNote',
    //notification
    notification:'notification',
    // Change Password
    changePassword:'changePassword',
    forgotPassword:'forgot/password',
    validateCode:'forgotPassword/verify',
    setupPassword:'generate/newPassword',
    // Staff Groups
    group:'group',
    staffGroup:'staffGroup',
    groupPermissions:'groupPermission',
    //Questionnaire Template
    questionnaireTemplate:'questionnaireTemplate',
    //Section 
    questionnaireTemplateSection:'questionnaireSection',
    //Questionnaire
    questionnaire:'question',
    //clinical dashboard
    clinicalTask:'taskCount',
    patientsFlag:'patientFlagCount',
    appointmentCount:'appointmentCount',
    escalationCount:'escalationCount',
    referalCount:"referalCount",
    referralList:'referral',
    setting:"users/setting",
    // Conditions
    condition: "condition",
    // Specialists
    specialists: "staff",
    // Communication Inbound
    communicationInbound: "communicationInbound",
    //bug
    bugReport:"bug"
}