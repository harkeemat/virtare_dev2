<template>
    <div>
        <a-layout-header >
            <HeaderLocations v-if="headerProviderLocations != null && headerProviderLocations.length > 0" @changeDropdown="changeDropdown" />
            <div class="header-wrapper">
                <div class="logo">
                    <div class="logoInner">
                        <router-link to="/dashboard">
                            <img src="@/assets/images/logo/virtare-logo-1.svg" alt="image" />
                        </router-link>
                    </div>
                    <!-- <div class="icon" @click="barMenu">
                        <MenuOutlined />
                    </div> -->
                </div>
                <div class="header-control">
                    <div class="header-inner">
                        <div class="location">
                            <a-dropdown-button :type="providersDropdown ? 'primary' : 'ghost'" :trigger="['click']" v-if="staffProviders && staffProviders.length > 0">
                                <span v-if="providersDropdown">{{ providersDropdown }}</span>
                                <span v-else> Providers </span>
                                <template #overlay>
                                    <a-menu class="headerDropdown">
                                        <a-menu-item key="0" v-if="arrayToObjact(screensPermissions, 112)">
                                            <a href="javascript:void(0)" @click="addAppt">{{
                                          $t("header.addAppointment")
                                        }}</a>
                                        </a-menu-item>
                                        <a-menu-item key="1" v-if="arrayToObjact(screensPermissions, 62)">
                                            <a href="javascript:void(0)" @click="addPatient" v-if="route.name != 'PatientSummary'">{{
                                            $t("header.addPatient")
                                            }}</a>
                                    
                                                <a v-else href="javascript:void(0)"  :disabled="route.name == 'PatientSummary' ? true : false">{{
                                            $t("header.addPatient")
                                            }}</a>
                                        </a-menu-item>
                                        <a-menu-item key="4" v-if="arrayToObjact(screensPermissions, 113)">
                                            <a href="javascript:void(0)" @click="addTask">{{
                                          $t("header.addTask")
                                        }}</a>
                                        </a-menu-item>
                                        <a-menu-item key="4" v-if="arrayToObjact(screensPermissions, 107)">
                                            <a href="javascript:void(0)" @click="showStartCallModal(true)">{{ $t("header.startCall") }}</a>
                                        </a-menu-item>
                                        <a-menu-item key="5" v-if="arrayToObjact(screensPermissions, 403)">
                                            <a href="javascript:void(0)" @click="showEscalationModal(true)">{{ 'Add Escalation' }}</a>
                                        </a-menu-item>
                                    </a-menu>
                                </template>
                                <template #icon><DownOutlined /></template>
                            </a-dropdown-button>
                            <span v-if="(!disableHeaderField && providersDropdown) && staffProviders.length > 1" :class="'headerIcon'">
                                <CloseOutlined @click="resetHeaderProvider(); changeDropdown()" />
                            </span>

                            <a-dropdown-button v-if="defaultProgramName != null && defaultProgramName != ''" :disabled="true">
                                <span> {{defaultProgramName}} </span>
                                <template #icon><DownOutlined /></template>
                            </a-dropdown-button>

                            <a-dropdown-button :type="programsDropdown ? 'primary' : 'ghost'" :trigger="['click']" v-else-if="locationPrograms && locationPrograms.length > 0">
                                <span v-if="programsDropdown">{{ programsDropdown }}</span>
                                <span v-else> Programs </span>
                                <template #overlay>
                                <a-menu>
                                    <a-menu-item v-for="program in locationPrograms" :key="program.programId" @click="selectProgram(program); changeDropdown()">
                                    {{ program.program }}
                                    </a-menu-item>
                                </a-menu>
                                
                                </template>
                                <template #icon><DownOutlined /></template>
                            </a-dropdown-button>
                            
                            <a-dropdown-button :type="groupsDropdown ? 'primary' : 'ghost'" :trigger="['click']" v-if="headerGroups && headerGroups.length > 0">
                                <span v-if="groupsDropdown">{{ groupsDropdown }}</span>
                                <span v-else> Select Group </span>
                                <template #overlay>
                                <a-menu>
                                    <a-menu-item v-for="group in headerGroups" :key="group.id" @click="selectGroup(group); changeDropdown()">
                                    {{ group.name }}
                                    </a-menu-item>
                                </a-menu>
                                
                                </template>
                                <template #icon><DownOutlined /></template>
                            </a-dropdown-button>

                        </div>
                        <div class="bar-menu">
                            <div class="search-icon" @click="toggle = !toggle">
                                <SearchOutlined />
                            </div>
                            <div class="ellipse-icon" @click="ellipse = !ellipse">
                                <MoreOutlined />
                            </div>
                        </div>
                        <div class="search" v-if="arrayToObjact(screensPermissions, 65) || arrayToObjact(screensPermissions, 40)">
                            <HeaderSearch v-model:value="value" @handleChange="handleChange($event)" />
                        </div>
                        <div class="profile" :class="ellipse ? 'show' : ''">  
                            <div class="quick-actions d-flex align-items-center">
                                <a-dropdown :trigger="['click']">
                                    <a class="ant-dropdown-link" @click.prevent>
                                        <div class="name">
                                            {{ $t("header.quickAction") }}
                                            <DownOutlined />
                                        </div>
                                    </a>
                                    <template #overlay>
                                        <a-menu class="headerDropdown">
                                            <a-menu-item key="0" v-if="arrayToObjact(screensPermissions, 112)">
                                                <a href="javascript:void(0)" @click="addAppt">{{
                                            $t("header.addAppointment")
                                            }}</a>
                                            </a-menu-item>
                                            <a-menu-item key="1" v-if="arrayToObjact(screensPermissions, 62)" >
                                                <a href="javascript:void(0)" @click="addPatient" v-if="route.name != 'PatientSummary'">{{
                                            $t("header.addPatient")
                                            }}</a>
                                    
                                                <a v-else href="javascript:void(0)"  :disabled="route.name == 'PatientSummary' ? true : false">{{
                                            $t("header.addPatient")
                                            }}</a>
                                            </a-menu-item>
                                            <a-menu-item key="4" v-if="arrayToObjact(screensPermissions, 113)">
                                                <a href="javascript:void(0)" @click="addTask">{{
                                            $t("header.addTask")
                                            }}</a>
                                            </a-menu-item>
                                            <a-menu-item key="4" v-if="arrayToObjact(screensPermissions, 107)">
                                                <a href="javascript:void(0)" @click="showStartCallModal(true)">{{ $t("header.startCall") }}</a>
                                            </a-menu-item>
                                            <a-menu-item key="5" v-if="arrayToObjact(screensPermissions, 403) && route.name != 'PatientSummary'">
                                                <a href="javascript:void(0)" @click="showEscalationModal(true)" >{{ 'Add Escalation' }}</a>
                                            </a-menu-item>
                                        </a-menu>
                                    </template>
                                </a-dropdown>
                            </div>
                            <div class="notifications">
                                <a-dropdown :trigger="['click']" overlayClassName="notifications">
                                    <a class="ant-dropdown-link" @click.prevent>
                                        <div class="icon">
                                            <a-badge :count="requestCall ? requestCall.length : ''" :number-style="{ backgroundColor: '#267dff' }">
                                                <CalendarOutlined />
                                            </a-badge>
                                        </div>
                                    </a>
                                    <template #overlay>
                                        <a-menu class="headerDropdown" style="max-height: 400px; overflow: auto">
                                            <a-menu-item class="title">{{ 'Call Request' }}</a-menu-item>
                                            <a-menu-item class="listing" v-for="(reqCall, index) in requestCall" :key="index">                            
                                                    <!-- <a class="d-flex align-items-center"> -->
                                                        <div class="flex-grow-1 summary" style="padding:10px" v-if="reqCall?.patient?.id">
                                                            <h3><router-link class="bluecolor" :to="{ name: 'PatientSummary', params: { udid: reqCall?.patient?.id  },query:{filter:filter} }">{{ reqCall.patient?.fullName  }}</router-link></h3>
                                                            <strong style="padding-left:10px">Time : </strong> {{ reqCall.contactTime.name }}
                                                        </div>
                                                    <!-- </a> -->
                                                    <div class="steps-action" style="padding-bottom:15px;margin-right:10px" v-if="reqCall?.patient?.id">
                                                        <a-button style="margin-right: 10px" @click="rejectReqCall(reqCall.patient?.id,reqCall?.id)">{{'Reject'}}</a-button>
                                                        <a-button type="primary" @click="requestCallNotification(reqCall.patient?.id,reqCall.patient.fullName,reqCall?.id)">{{'Accept'}}</a-button>
                                                    </div>
                                            </a-menu-item>
                                            <a-menu-item class="allNotication">
                                                <router-link to="/request-call-notifications">{{'Check All Request'}}</router-link>
                                            </a-menu-item>
                                        </a-menu>
                                    </template>
                                </a-dropdown>
                            </div>
                            <div class="notifications">
                                <a-dropdown :trigger="['click']" overlayClassName="notifications">
                                    <a class="ant-dropdown-link" @click.prevent>
                                        <div class="icon">
                                            <a-badge :count="count ? count : ''" :number-style="{ backgroundColor: '#267dff' }">
                                                <NotificationOutlined />
                                            </a-badge>
                                        </div>
                                    </a>
                                    <template #overlay>
                                        <a-menu class="headerDropdown" style="max-height: 400px; overflow: auto">
                                            <a-menu-item class="title">{{ $t("header.notification") }}</a-menu-item>
                                            <a-menu-item class="listing" v-for="(notification, index) in notifications" :key="index">
                                            <a v-if="notification.type == 'Escalation'" @click=" isReadNotification(notification?.id, notification.type,notification?.type_id);getEscalationId(notification?.type_id)">
                                                    <a class="d-flex align-items-center" >
                                                        <div class="flex-grow-1 ms-3 summary">
                                                            <h3>{{ notification.title }}</h3>
                                                            <p>{{ notification.body }}</p>
                                                            <br />
                                                            <strong class="" v-if="notification.time">{{
                                                            dateOnlyFormat(date) === dateOnlyFormat(notification.time)
                                                            ? 'Today'
                                                            : dateOnlyFormat(notification.time)
                                                        }}</strong>&nbsp;
                                                            <strong class="" v-if="notification.time">{{
                                                            meridiemFormatFromTimestamp(notification.time)
                                                        }} </strong>
                                                        </div>
                                                    </a>
                                                </a>
                                                <router-link v-if="notification.type != 'Escalation'" :to="notification.type == 'Appointment' ? '': '/communications'" @click=" isReadNotification(notification?.id, notification?.type,notification?.type_id)">
                                                    <a class="d-flex align-items-center" href="#">
                                                        <div class="flex-grow-1 ms-3 summary">
                                                            <h3>{{ notification?.title }}</h3>
                                                            <p>{{ notification?.body }}</p>
                                                            <br />
                                                            <strong class="" v-if="notification.time">{{
                                                            dateOnlyFormat(date) === dateOnlyFormat(notification.time)
                                                            ? 'Today'
                                                            : dateOnlyFormat(notification.time)
                                                        }}</strong>&nbsp;
                                                            <strong class="" v-if="notification.time">{{
                                                            meridiemFormatFromTimestamp(notification.time)
                                                        }} </strong>
                                                        </div>
                                                    </a>
                                                </router-link>
                                            </a-menu-item>
                                            <a-menu-item class="allNotication">
                                                <router-link to="/notifications">{{$t('header.checkAllNotifications')}}</router-link>
                                            </a-menu-item>
                                        </a-menu>
                                    </template>
                                </a-dropdown>
                            </div>
                            <div class="profile-menu">
                                <a-dropdown :trigger="['click']">
                                    <a class="ant-dropdown-link" @click.prevent>
                                        <div class="name">{{ deCodeString(key,authUser.user.lastName)+', ' }} {{ deCodeString(key,authUser.user.firstName) }}</div>
                                        <div class="image">
                                            <img src="../../../assets/images/userAvatar.png" alt="image" />
                                        </div>
                                    </a>
                                    <template #overlay>
                                        <a-menu class="headerDropdown">
                                            <a-menu-item key="0">
                                                <router-link :to="{
                                                    name: 'CoordinatorSummary',
                                                    params: { udid: authUser.user?.staffUdid },
                                                }">
                                                    {{ $t("header.myProfile") }}
                                                </router-link>
                                            </a-menu-item>
                                            <a-menu-item key="3">
                                                <router-link :to="{ name: 'BugReport' }">
                                                    Bug Report
                                                </router-link>
                                            </a-menu-item>

                                            <a-menu-item key="3">
                                                <router-link :to="{ name: 'ResetPassword' }">
                                                    Reset Password
                                                </router-link>
                                            </a-menu-item>

                                            <a-menu-item key="3" >
                                                <!-- <a href="javascript:void(0)">Logout</a> -->
                                                <!-- <router-link :to="{ name: 'Logout' }"> -->
                                                    <a @click="logout()" >
                                                        Logout 
                                                        <!-- <LogoutOutlined /> -->
                                                    </a>
                                                <!-- </router-link> -->
                                            </a-menu-item>
                                        </a-menu>
                                    </template>
                                </a-dropdown>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
            <AddAppointment v-if="appointmentModal" v-model:visible="appointmentModal" @is-visible="showModal($event)" :patientId="patientId" :patientName="patientName" />
            <TasksModal v-if="tasksModal" v-model:visible="tasksModal" @saveTaskModal="handleTaskOk($event)" />
            <PatientsModal v-if="PatientsModal" v-model:visible="PatientsModal" @closeModal="closeAppointModal($event)" />
            <AddStartCall v-if="AddStartCall" v-model:visible="AddStartCall" @ok="closeStartCallModal" @is-visible="showStartCallModal($event)" />
            <SendMessage v-if="SendMessage" v-model:visible="SendMessage" @ok="startOk" />
            <AppointmentDetails v-if="isAppointment" v-model:visible="isAppointment" @closeModal="closeModal(event)" />
            <EscaltionModal v-if="escalationVisible"  v-model:visible="escalationVisible" @saveModal="saveModal($event)" />
            <EscaltionViewModal v-model:visible="escaltionViewModal" v-if="escaltionViewModal" @saveViewModal="saveModal($event)" />
            <TaskDetails v-model:visible="taskVisibleView" :taskId="taskID" :onlyView="onlyView"/>
        </a-layout-header>
    </div>
</template>

<script>
import {
    defineComponent,
    ref,
    computed,
    watchEffect,
    defineAsyncComponent,
    onMounted,
} from "vue";
import SendMessage from "@/components/modals/SendMessage";
import {
    useStore
} from "vuex";
import HeaderSearch from "./HeaderSearch";
import AppointmentDetails from "../../modals/AppointmentDetails";
import {
    arrayToObjact,
    meridiemFormatFromTimestamp,
    dobFormat,
    dateOnlyFormat,
    deCodeString, key
} from "@/commonMethods/commonMethod";
// import { LogoutOutlined } from "@ant-design/icons-vue";
import {
    useRoute,
    useRouter
} from "vue-router";
import {
    NotificationOutlined,
    DownOutlined,
    CloseOutlined,
    // MenuOutlined,
    SearchOutlined,
    MoreOutlined,
    CalendarOutlined
} from "@ant-design/icons-vue";
// import HeaderLocations from "@/components/common/header-locations/HeaderLocations";
export default defineComponent({
    components: {
        // LogoutOutlined,
        HeaderLocations: defineAsyncComponent(() =>
            import("@/components/common/header-locations/HeaderLocations")
        ),
        AppointmentDetails,
        NotificationOutlined,
        DownOutlined,
        CloseOutlined,
        // MenuOutlined,
        SearchOutlined,
        MoreOutlined,
        CalendarOutlined,
        AddAppointment: defineAsyncComponent(() =>
            import("@/components/modals/AddAppointment")
        ),
        TasksModal: defineAsyncComponent(() =>
            import("@/components/modals/TasksModal")
        ),
        PatientsModal: defineAsyncComponent(() =>
            import("@/components/modals/PatientsModal")
        ),
        TaskDetails: defineAsyncComponent(() => import("@/components/tasks/modals/TaskDetails.vue")),
        EscaltionModal: defineAsyncComponent(() => import("@/components/escalations/EscalationModal")),
        AddStartCall: defineAsyncComponent(() =>
            import("@/components/modals/AddStartCall")
        ),
        EscaltionViewModal: defineAsyncComponent(() =>
            import("@/components/escalations/EscalationViewModal")
        ),
        SendMessage,
        HeaderSearch,
        // DropdownButton,
    },
    props: {},
    setup(props, {
        emit
    }) {
        const store = useStore();
        const router = useRouter();
        const toggle = ref(false);
        const ellipse = ref(false);
        const tasksModal = ref(false);
        const taskID = ref()
        const onlyView = ref(true)
        const taskVisibleView = ref(false)
        const escalationVisible = ref(false)
        const isAppointment = ref();
        const patientId = ref()
        const escaltionViewModal = ref(false)
        const patientName =ref()
        const date = Math.round(+new Date() / 1000);
        const authUser = JSON.parse(localStorage.getItem("auth"));
        const authStaff = authUser.user.staff
        // const defaultLocationHierarchy = ref("")
        const route = useRoute()
        const logoutUser = () => {
            store.state.authentication.errorMsg = "";
            store.dispatch("logoutUser").then(() => {
                router.push("/logout");
            })
        };
        const value = ref();
        const selectedLocationName = ref("")
        const defaultProgramName = ref("")
        const disableHeaderField = ref(false)
        let userRoles = authStaff.role.map(role => {
            return role.name
        })

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

        const programsList = computed(() => {
            if(userRoles.includes("SuperAdmin")) {
                return store.state.programs.manageProgramList
            }
            else if(userRoles.includes("Provider Admin")) {
                return null
            }
            else {
                return  store.state.staffGroups.groupProgramsList;
            }
        });

        const isManualHeader = computed(() => {
            return store.state.provider.isManualHeader;
        });

        const selectedProvider = computed(() => {
            return store.state.provider.selectedProvider;
        });

        const selectedLocation = computed(() => {
            return store.state.provider.selectedLocation;
        });

        const groupsList = computed(() => {
            return store.state.staffGroups.groupsList;
        });

        const headerGroups = computed(() => {
            return store.state.provider.headerGroups;
        });

        const visibleEscalationModal = computed(() => {
            return store.state.authentication.visibleEscalationModal  
        })

        watchEffect(() => {
            store.dispatch("notificationList");
            store.dispatch("orderTable", {
                data: "&orderField=&orderBy=",
            });
            if (JSON.parse(localStorage.getItem("barmenu")) == true) {
                document.body.classList.add("show");
            }
            if (visibleEscalationModal.value) {
                escaltionViewModal.value = true
            }
            //document.body.classList.remove("show");
        });

        const staffLocations = computed(() => {
            return store.state.careCoordinator.staffLocations
        })

        const formTitle = store.getters.formTitle
        const tooltip = store.getters.tooltip
        // const defaultLocationId = ref("")
        // const defaultLocationentityType = ref("")
        
        onMounted(() => {
            formTitle.value?.length > 0 ? '' : store.dispatch("formTitle")
            tooltip.value?.length > 0 ? '' : store.dispatch("tooltip")
            
            if(!userRoles.includes("Super Admin")) {
                store.dispatch('staffLocations', {
                    staffId: authStaff.id,
                    page: ""
                // })
                }).then(() => {
                    store.dispatch("staffProviders", authStaff.id).then(() => {
                        if(staffProviders.value.length > 0) {
                            staffProviders.value.map(provider => {
                                if(provider.isDefault) {
                                    store.commit('selectedProvider', {
                                        id: provider.id
                                    })
                                    store.commit('providersDropdown', provider.name)
                                    store.dispatch('headerProviderLocations', provider.id)

                                    if(staffLocations.value.length > 0) {
                                        staffLocations.value.map(location => {
                                            if(location.isDefault) {
                                                store.commit('selectedLocation', {
                                                    id: location.locationId,
                                                    entityType: location.entityType
                                                })
                                            }
                                        })
                                    }

                                    if(userRoles.includes('Location Admin')) {
                                    // if(selectedLocation.value != null && selectedLocation.value != "") {
                                        store.dispatch('headerGroups', {
                                            providerId: provider.id,
                                            locationId: selectedLocation.value.id,
                                        })
                                    }
                                    else {
                                        store.dispatch('headerGroups', {
                                            staffId: authStaff.id
                                        }).then(() => {
                                            if(headerGroups.value && headerGroups.value.length > 0) {
                                                store.commit('groupsDropdown', headerGroups.value[0].name)
                                                store.commit('selectedGroup', {
                                                    id: headerGroups.value[0].id
                                                })
                                            }
                                            store.commit('updateComponentKey')
                                        })
                                    }
                                }
                            })
                        }
                    })
                })



                /* store.dispatch("staffProviders", authStaff.id).then(() => {
                    staffProviders.value.map(provider => {
                        if(provider.isDefault) {
                            store.commit('selectedProvider', {
                                id: provider.id
                            })
                            store.commit('providersDropdown', provider.name)
                            store.dispatch('headerProviderLocations', provider.id)
                            
                            store.dispatch('staffLocations', {
                                staffId: authStaff.id,
                                page: ""
                            }).then(() => {
                                if(staffLocations.value.length > 0) {
                                    if(staffLocations.value.length > 0) {
                                        staffLocations.value.map(location => {
                                            if(location.isDefault) {
                                                defaultLocationId.value = location.locationId
                                                defaultLocationentityType.value = location.entityType
                                            }
                                        })
                                    }
                                }
                            })
                            store.commit('selectedLocation', {
                                id: defaultLocationId.value,
                                entityType: defaultLocationentityType.value
                            })
                            console.log('selectedLocation', selectedLocation.value)
                            if(selectedLocation.value != null && selectedLocation.value != "") {
                                store.dispatch('headerGroups', {
                                    providerId: provider.id,
                                    locationId: selectedLocation.value.id,
                                })
                            }
                            else {
                                store.dispatch('headerGroups', {
                                    staffId: authStaff.id
                                }).then(() => {
                                    if(headerGroups.value && headerGroups.value.length > 0) {
                                        store.commit('groupsDropdown', headerGroups.value[0].name)
                                        store.commit('selectedGroup', {
                                            id: headerGroups.value[0].id
                                        })
                                    }
                                    store.commit('updateComponentKey')
                                })
                            }
                        }
                    })
                }) */
            }
            else {
                store.dispatch("staffProviders", null)
                store.dispatch('groupsList').then(() => {
                    store.commit('headerGroups', groupsList.value)
                })
            }
            store.dispatch('manageProgramList')
            store.dispatch("newRequests");
            store.dispatch("requestCall");
            if (JSON.parse(localStorage.getItem("barmenu")) == true) {
                document.body.classList.add("show");
            }
        });

        const appointmentModal = ref(false);
        const addAppt = () => {
            appointmentModal.value = true;
            
        };

        function showModal(event) {
            if (event.date) {
                appointmentModal.value = event.check;
                emit("is-heardeVisible", event);
            } else {
                appointmentModal.value = event;
            }
        }

        const addTask = () => {
            tasksModal.value = true;
        };

        const showEscalationModal = () => {
            escalationVisible.value = true
            store.state.patients.patientDetails =null
        }

        const PatientsModal = ref(false);

        const addPatient = () => {
            if (route.name != 'PatientSummary') {
                store.state.patients.addDemographic = null
                store.state.patients.emergencyContact = null
                store.state.patients.patientReferralSource = null
                store.state.patients.responsiblePerson = null
                store.state.patients.patientConditions = null
            }
            PatientsModal.value = true;
        };

        const closeAppointModal = (status) => {
            PatientsModal.value = status.value;
            if (route.name == 'PatientSummary' && status.value==false) {
                store.dispatch('patientConditions', route.params.udid);
                store.dispatch("documents", route.params.udid);
            }
        };

        const CoordinatorsModal = ref(false);
        const addCare = () => {
            CoordinatorsModal.value = true;
        };

        const handleOk = () => {
            CoordinatorsModal.value = false;
        };

        const handleTaskOk = (e) => {
            tasksModal.value = e;
        };

        const AddStartCall = ref(false);
        const showStartCallModal = (e) => {
            AddStartCall.value = e;
        };

        const SendMessage = ref(false);
        const addsendMessage = () => {
            SendMessage.value = true;
        };

        const startOk = () => {
            SendMessage.value = false;
        };
        
        const closeStartCallModal = () => {
            AddStartCall.value = false;
        };

        const notifications = computed(() => {
            return store.state.common.getNotificationsList;
        });

        const handleChange = (val) => {
            if(val){
                let checkData = val?.split("=>");
                if (checkData[1] === "Patient") {
                    value.value = val;
                    router.push({
                        name: "PatientSummary",
                        params: {
                            udid: checkData[0],
                            globalSearch: true,
                        },
                    });
                } else {
                    value.value = val;
                    router.push({
                        name: "CoordinatorSummary",
                        params: {
                            udid: checkData[0],
                            globalSearch: true,
                        },
                    });
                }
            }else{
                value.value = ''
            }
        }
    
            const isReadNotification = (id, type, typeId) => {
                if (type == "Appointment") {
                    
                    store.dispatch("appointmentDetails", typeId);
                    
                    isAppointment.value = true;
                }
                else if(type == "task"){
                    store.dispatch('editTask', {id: typeId})
                taskID.value = typeId
                taskVisibleView.value = true
          } 
                store.dispatch("isReadUpdateNotification",id).then(()=>{
                    store.dispatch("notificationList");
                })
                
            };
            const bitrixFormCheck = computed(() => {
                return store.state.patients.bitrixFormCheck;
            });
    
            function closeModal(status) {
                isAppointment.value = status;
            }
            const saveModal = (value) => {
                escalationVisible.value = value
            }
    
            const requestCallNotification = (pId,value,id) =>{
              appointmentModal.value = true;
              patientId.value = pId
              patientName.value = value
              store.dispatch('isReadCallNotification',{patientId:pId,id:id}).then((resp)=>{
                if(resp==true){
                  store.dispatch("requestCall");
                }
              })
            }
    
            const rejectReqCall = (pId,id) =>{
              store.dispatch('isReadCallNotification',{patientId:pId,id:id}).then((resp)=>{
                if(resp==true){
                  store.dispatch("requestCall");
                }
              })
            }
    
        const headerProviderLocations = computed(() => {
            return store.state.provider.headerProviderLocations
        })

        const locationPrograms = computed(() => {
            return store.state.provider.locationPrograms
        })

        const programsDropdown = computed(() => {
            return store.state.provider.programsDropdown
        })

        const groupsDropdown = computed(() => {
            return store.state.provider.groupsDropdown
        })

        const providersDropdown = computed(() => {
            return store.state.provider.providersDropdown
        })

        const programProviders = computed(() => {
            return store.state.provider.programProviders
        })

        const staffProviders = computed(() => {
            return store.state.provider.staffProviders
        })

        const getProgramProviders = (program) => {
            store.state.provider.headerProviderLocations = []
            store.commit('isManualHeader', true)
            store.commit('selectedProvider', null)
            store.commit('selectedLocation', null)
            store.commit('programProviders', null)
            store.commit('selectedProgram', program)
            store.commit('programsDropdown', program.name)
            store.commit('providerLocationsList', null)
            store.commit('providersDropdown', null)
            let udid = program.targetUdid ? program.targetUdid : program.udid
            store.dispatch('programProviders', udid).then(() => {
                store.commit('minusComponentKey')
            })
        }

        const getProviderLocations = (provider) => {
            store.commit('selectedLocation', null)
            console.log('staffProviders', provider)
            store.state.provider.headerProviderLocations = []
            store.commit('isManualHeader', true)
            store.commit('providersDropdown', provider.name)
            store.commit('selectedProvider', {
                id: provider.id
            })
            store.dispatch('headerProviderLocations', provider.id).then(() => {
                if(headerProviderLocations.value && headerProviderLocations.value.length > 0) {
                    store.commit('updateComponentKey')
                    document.body.classList.add("subHeader");
                }
            })
        }

        function getEscalationId(id){
            store.dispatch("getEscalationId",id).then((resp)=>{
                if(resp==true){
                escaltionViewModal.value = true
                }
            })
        }

        function logout(){
            store.dispatch("logoutUser");
        }

        const selectProgram = (program) => {
            store.commit('selectedProgram', program)
            store.commit('programsDropdown', program.program)
            store.commit('updateComponentKey')
        }

        const selectGroup = (group) => {
            store.commit('selectedGroup', group)
            store.commit('groupsDropdown', group.name)
            store.commit('updateComponentKey')
        }

        const resetHeaderProvider = () => {
            store.commit('headerProviderLocations', null)
            if(!userRoles.includes('Super Admin')) {
                staffProviders.value.map(provider => {
                    if(provider.isDefault) {
                        store.commit('selectedProvider', {
                            id: provider.id
                        })
                        store.commit('providersDropdown', provider.name)
                        store.dispatch('headerProviderLocations', provider.id)
                    }
                })
            }
            else {
                disableHeaderField.value = false
                store.commit('selectedProvider', null)
                store.commit('providersDropdown', "")
                document.body.classList.remove("subHeader");
            }
            store.commit('selectedLocation', null)
            store.commit('locationPrograms', null)
            store.commit('updateComponentKey')
        }

        const changeDropdown = () => {
            if(selectedProvider.value != null && selectedProvider.value != "") {
                if(selectedLocation.value != null && selectedLocation.value != "") {
                    console.log('changeDropdown By Location', selectedLocation.value)
                    store.dispatch('headerGroups', {
                        providerId: selectedProvider.value.id,
                        locationId: selectedLocation.value.id
                    }).then(() => {
                        if(headerGroups.value && headerGroups.value.length > 0) {
                            store.commit('groupsDropdown', headerGroups.value[0].name)
                            store.commit('selectedGroup', {
                                id: headerGroups.value[0].id
                            })
                        }
                    })
                }
                else {
                    console.log('changeDropdown By Provider', selectedProvider.value)
                    store.dispatch('headerGroups', {
                        providerId: selectedProvider.value.id
                    }).then(() => {
                        if(headerGroups.value && headerGroups.value.length > 0) {
                            store.commit('groupsDropdown', headerGroups.value[0].name)
                            store.commit('selectedGroup', {
                                id: headerGroups.value[0].id
                            })
                        }
                    })
                }
            }
            else {
                console.log('changeDropdown By Staff', authStaff.id)
                store.dispatch('headerGroups', {
                    staffId: authStaff.id
                }).then(() => {
                    if(headerGroups.value && headerGroups.value.length > 0) {
                        store.commit('groupsDropdown', headerGroups.value[0].name)
                        store.commit('selectedGroup', {
                            id: headerGroups.value[0].id
                        })
                    }
                })
            }
        }

        return {
            headerGroups,
            changeDropdown,
            visibleEscalationModal,
            logout,
            escaltionViewModal,
            getEscalationId,
            locationPrograms,
            programsDropdown,
            groupsDropdown,
            selectGroup,
            providersDropdown,
            programsList,
            getProgramProviders,
            programProviders,
            getProviderLocations,
            headerProviderLocations,
            requestCall: computed(() => {
                return store.state.appointment.requestCall
            }),
            rejectReqCall,
            patientId,
            patientName,
            requestCallNotification,
            saveModal,
            escalationVisible,
            showEscalationModal,
            closeModal,
            isAppointment,
            screensPermissions: store.getters.screensPermissions,
            bitrixFormCheck,
            dateOnlyFormat,
            isReadNotification,
            count: store.getters.notificationCount,
            date,
            handleChange,
            dobFormat,
            meridiemFormatFromTimestamp,
            notifications,
            handleTaskOk,
            authUser,
            logoutUser,
            value,
            barMenu,
            toggle,
            ellipse,
            SendMessage,
            addsendMessage,
            appointmentModal,
            addAppt,
            tasksModal,
            addTask,
            arrayToObjact,
            PatientsModal,
            addPatient,
            closeAppointModal,
            CoordinatorsModal,
            addCare,
            AddStartCall,
            showStartCallModal,
            closeStartCallModal,
            startOk,
            handleOk,
            showModal,
            route,
            buttonName: 'Programs',
            selectedLocationName,
            selectProgram,
            defaultProgramName,
            disableHeaderField,
            resetHeaderProvider,
            taskVisibleView,
            taskID,
            onlyView,
            deCodeString,
            staffProviders,
            key,
            isManualHeader,
        };
    },
});
</script>

<style scoped>
.ant-btn-group.ant-dropdown-button {
    /* position: relative; */
    margin-left: 12px;
}
span.headerIcon {
    padding: 4px 9px 9px 7px;
    background-color: #1890ff;
    color: #ffffff;
    position: relative;
    top: -2px;
    border-left: 1px solid #ffffff;
}
/* span.ghostIcon {
    padding: 3px 9px 8px 7px;
    background-color: #f5f5f5;
    color: #b2b2b2;
    position: relative;
    top: -2px;
    border: 1px solid #d9d9d9;
    left: -1px;;
} */
button.ant-btn.ant-btn-primary.ant-dropdown-trigger {
    border-left: 1px solid #ffffff;
}
</style>
