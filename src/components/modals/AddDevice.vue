<template>
  <a-modal width="50%" title="Assign To" centered @cancel="onCloseModal()" :maskClosable="false"  :footer="false">
    <a-form :id="arrayToObjectData(formData,arrayToObjectData(formTitleNames,17,'id','name'),'name','udid')" ref="formRef" :model="inventoryForm" name="basic" layout="vertical" @finish="submitForm">
      <a-row :gutter="24">
        <a-col :md="24" :sm="24" :xs="24">
              <div class="form-group" v-if="inventoryScreen">
                  <a-form-item label="Patient" name="patientId" :rules="[{ required: true, message: 'Patient'+' '+$t('global.validation')  }]">
                      <PatientDropDown :listHeight="180" :editDataPatient="editDataPatient" v-model:value="inventoryForm.patientId" @handlePatientChange="handlePatientChange($event)" :close="closeValue" />
                      <ErrorMessage v-if="errorMsg" :name="errorMsg?errorMsg.message:''" />
                  </a-form-item>
              </div>
          </a-col>
        </a-row>
        <a-row :gutter="24" v-if="!inventoryScreen">
        <a-col :md="12" :sm="12" :xs="24">
          <div class="form-group">
            <a-form-item :label="$t('patient.devices.deviceType')" name="deviceType" :rules="[{ required: true, message: $t('patient.devices.deviceType')+' '+$t('global.validation') }]">
              <GlobalCodeDropDown v-model:value="inventoryForm.deviceType" :dataId="22" @handleGlobalChange="handleGlobalChange($event,'inventoryForm.deviceType'); handleInventory($event)"/>
              <ErrorMessage v-if="errorMsg && errorMsg.deviceType" :name="errorMsg.deviceType?errorMsg.deviceType[0]:''" />
            </a-form-item>
          </div>
        </a-col>
        <a-col :md="12" :sm="12" :xs="24">
          <div class="form-group">
            <a-form-item  :label="$t('patient.devices.inventory')" name="inventory" :rules="[{ required: true, message: $t('patient.devices.inventory')+' '+$t('global.validation') }]">
              <InventoryDropDownSearch :disabled="dropdownListing == null || dropdownListing?.length<=0" v-model:value="inventoryForm.inventory" :deviceTypeId="deviceTypeId" :options="dropdownListing" @handleInventoryChange="handleChange($event)"/>
                <ErrorMessage v-if="errorMsg" :name="errorMsg.inventory?errorMsg.inventory[0]:''" />
            </a-form-item>
          </div>
        </a-col>
        <a-col :md="12" :sm="12" :xs="24">
          <div class="form-group">
            <a-form-item :label="$t('patient.devices.modelNo')" name="modelNumber" :rules="[{ required: false, message: $t('patient.devices.modelNo')+' '+$t('global.validation') }]">
              <div >
                <a-input @change="changedValue" size="large"   v-model:value="inventoryForm.modelNumber"  disabled />
              </div>
              <ErrorMessage v-if="errorMsg" :name="errorMsg.modelNumber?errorMsg.modelNumber[0]:''" />
            </a-form-item>
          </div>
        </a-col>
        <a-col :md="12" :sm="12" :xs="24">
          <div class="form-group">
            <a-form-item :label="$t('patient.devices.MACAddress')" name="macAddress" :rules="[{ required: false, message: $t('patient.devices.MACAddress')+' '+$t('global.validation') }]">
              <div >
                <a-input @change="changedValue" size="large"   v-model:value="inventoryForm.macAddress"  disabled />
              </div>
              <ErrorMessage v-if="errorMsg" :name="errorMsg.macAddress?errorMsg.macAddress[0]:''" />
            </a-form-item>
          </div>
        </a-col>
        <FormBaseComponents :formId="arrayToObjectData(formData,arrayToObjectData(formTitleNames,17,'id','name'),'name','udid')"> </FormBaseComponents>

      </a-row>
        <a-col :sm="24" :span="24">
         
          <FormButtons @onCancel="onCloseModal" :submitButton="$t('global.save')" />
        </a-col>
    </a-form>
    <Loader />
  </a-modal>
</template>

<script>
import { defineComponent, reactive, computed, ref, onUnmounted, watchEffect, onMounted } from "vue";
import { useStore } from "vuex";
import {warningSwal ,arrayToObjectData,formTitleNames} from "@/commonMethods/commonMethod";
import { messages } from "@/config/messages";
import ErrorMessage from "@/components/common/messages/ErrorMessage.vue";
import { useRoute } from "vue-router";
import GlobalCodeDropDown from "@/components/modals/search/GlobalCodeSearch.vue"
import InventoryDropDownSearch from "@/components/modals/search/InventoryDropDownSearch"
import Loader from "@/components/loader/Loader";
import Services from "@/services/serviceMethod";
import PatientDropDown from "@/components/modals/search/PatientDropdownSearch.vue";
import FormBaseComponents from "@/components/modals/FormBaseComponents"
import FormButtons from "@/components/common/button/FormButtons";
export default defineComponent({
  components: {
    ErrorMessage,
    GlobalCodeDropDown,
    Loader,
    InventoryDropDownSearch,
    PatientDropDown,
    FormBaseComponents,
    FormButtons
  },
  props: {
    patientDetails: {
      type: Object
    },
    inventoryScreen:{
      type:Boolean
    }
  },
  setup(props, {emit}) {
    const store = useStore();
    const route = useRoute();
    const status = ref([]);
    const isValueChanged = ref(false);
    // const patientDetail = reactive(props.patientDetails);
    const inventoryForm = reactive({
      inventory: "",
      deviceType: "",
      modelNumber: "",
      macAddress: "",
      patientId:'',
      id:''
    });

    const form = reactive({ ...inventoryForm })

    const changedValue = () => {
      isValueChanged.value = true;
    }

    const formRef = ref();

    const submitForm = () => {
      const inventoryFormData = {
        data: {
          inventory: inventoryForm.inventory?inventoryForm.inventory:inventoryForm.id,
          deviceType: inventoryForm.deviceType,
          modelNumber: inventoryForm.modelNumber,
          macAddress: inventoryForm.macAddress,
          patientId:inventoryForm.patientId
        },
        id: inventoryForm.patientId?inventoryForm.patientId:route.params.udid,
      }
      
      store.dispatch("addDevice", inventoryFormData).then((resp) => {
        
        if(route.name == 'PatientSummary') {
          if(errorMsg.value == null || errorMsg.value.length == 0) {
            formRef.value.resetFields();
            Object.assign(inventoryForm, form)
            store.dispatch('latestDevice', route.params.udid)
            store.dispatch('patientTimeline', {id:route.params.udid,type:''});
            store.dispatch('devices', route.params.udid)
            isValueChanged.value = false;
            emit("closeModal", {
              modal: 'addInventory',
              value: false
            });
          }
        }
        
      else if(resp){
          store.dispatch("inventoriesList");
          emit("closeModal", {
              modal: 'addInventory',
              value: false
            });
        }
      });
    };

    const globalCode = computed(() => {
      return store.state.common;
    });

    const dropdownListing = computed(() => {
      return store.state.common.dropdownListing;
    });
    const deviceData = computed(() => {
      return store.state.patients.devices;
    });

    const deviceColumns = computed(() => {
      return store.state.patients.devicesColumns;
    });
    const patients = computed(() => {
      return store.state.patients;
    });

    const inventory = computed(() => {
      return store.state.inventory;
    })

    function deleteDevice(id) {
      warningSwal(messages.deleteWarning).then((response) => {
        if (response == true) {
          store.dispatch("deleteDevice", {
            id: patients.value.addDemographic.id,
            deviceId: id,
          });
          setTimeout(() => {
            store.dispatch("devices", patients.value.addDemographic.id);
          }, 2000);
        }
      });
    }

    function changeStatus(id, status) {
      store.dispatch("changeStatus", {
        id: patients.value.addDemographic.id,
        statusId: id,
        status: {
          status: status,
        },
      });
    }

    watchEffect(() => {
      store.commit('dropdownListing', null)
      if(inventory.value.inventoryDetails!=null){
        Object.assign(inventoryForm, inventory.value.inventoryDetails)
      }else{
        Object.assign(inventoryForm, form)
      }
    })

    const deviceTypeId = ref(null)
    function handleInventory(id) {
      store.commit('dropdownListing', null)
      store.commit('loadingStatus', true)
      if(id) {
        deviceTypeId.value = id
        Services.singleDropdownSearch(
          "",
          (d) => (store.commit('dropdownListing', d)),
          null,
          "inventory",
          id,
          '1',
          'macAddress',
          'ASC',
        );
        inventoryForm.inventory = null;
        inventoryForm.modelNumber = null,
        inventoryForm.macAddress = null
        store.commit('errorMsg', null)
        isValueChanged.value = true;
      }
      store.commit('loadingStatus', false)
    }

    function handleChange(id){
      inventoryForm.inventory = id;
      // console.log('element id', id)
      isValueChanged.value = true;
      dropdownListing.value.forEach(element => {
        // console.log('element element', element)
        if(element.value == id) {
          inventoryForm.modelNumber = element.modelNumber,
          inventoryForm.macAddress = element.macAddress
        }
      });
    }
    const handleCancel = () => {
      formRef.value.resetFields();
      Object.assign(inventoryForm, form)
    };
    const errorMsg = computed(() => {
      return store.state.patients.errorMsg
    })

    function onCloseModal() {
			if(isValueChanged.value) {
				warningSwal(messages.modalWarning).then((response) => {
					if (response == true) {
            store.state.patients.errorMsg = ''
						emit("closeModal", {
							modal: 'addInventory',
							value: false
						});
						Object.assign(inventoryForm, form);
						isValueChanged.value = false;
            store.commit('errorMsg', null)
					}
					else {
						emit("closeModal", {
							modal: 'addInventory',
							value: true
						});
					}
				})
			}else{
        store.state.patients.errorMsg = ''
        isValueChanged.value = false;
        formRef.value.resetFields();
        emit("closeModal", {
              modal: 'addInventory',
              value: false
            });
      }
      store.commit('errorMsg', null)
    }

    onMounted(()=>{
      store.state.inventory.inventoryDetails = null
    })

    onUnmounted(() => {
      store.commit('errorMsg', null)
    })


    
    const handleInventoryChange = (val) => {
      inventoryForm.inventory = val;
    };

    const handleGlobalChange = (data) =>{
      inventoryForm.deviceType = data
    }

    const handlePatientChange = (val) => {
      store.state.patients.errorMsg = ''
      inventoryForm.patientId = val;
    };

    return {
      inventory,
      handlePatientChange,
      handleGlobalChange,
      formRef,
      handleCancel,
      handleChange,
      handleInventory,
      changeStatus,
      status,
      warningSwal,
      deleteDevice,
      patients,
      inventoryForm,
      submitForm,
      globalCode,
      deviceData,
      deviceColumns,
      errorMsg,
      isValueChanged,
      changedValue,
      onCloseModal,
      dropdownListing,
      deviceTypeId,
      handleInventoryChange,
      formData:store.getters.formTitle,
      arrayToObjectData,
      formTitleNames
    };
  },
});
</script>