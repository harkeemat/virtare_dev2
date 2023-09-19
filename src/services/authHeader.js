
import { computed, ref } from "vue"
import store from "../store/index"

const selectedProvider = computed(() => {
  return store.state.provider.selectedProvider
})

const selectedProgram = computed(() => {
  return store.state.provider.selectedProgram
})

const selectedGroup = computed(() => {
  return store.state.provider.selectedGroup
})
const providerId = ref("")
const programId = ref("")
const locationId = ref("")
const entityType = ref("")
const groupId = ref("")

const selectedLocation = computed(() => {
  return store.state.provider.selectedLocation
})

export default function authHeader() {
  if(selectedProvider.value != null && selectedProvider.value != "") {
    providerId.value = selectedProvider.value.id
  }
  else {
    providerId.value = ""
  }

  if(selectedLocation.value != null && selectedLocation.value != "") {
    locationId.value = selectedLocation.value.id
    entityType.value = selectedLocation.value.entityType
  }
  else {
    locationId.value = ""
    entityType.value = ""
  }

  if(selectedProgram.value != null && selectedProgram.value != "") {
    programId.value = selectedProgram.value.programId
  }
  else {
    programId.value = ""
  }

  if(selectedGroup.value != null && selectedGroup.value != "") {
    groupId.value = selectedGroup.value.id
  }
  else {
    groupId.value = ""
  }
  
  let token = localStorage.getItem('token');

  if(token) {
    return {
      Authorization: 'Bearer ' + token,
      // providerId: url.includes('admin') && !url.includes('staff-groups') ? '' : providerId.value,
      providerId: providerId.value,
      // providerLocationId: url.includes('admin') ? '' : locationId.value,
      providerLocationId: locationId.value,
      programId: programId.value,
      groupId: groupId.value,
      // programId: url.includes('admin') ? '' : programId.value,
      entityType: entityType.value,
      // entityType: url.includes('admin') ? '' : entityType.value,
    };
  }
  else {
    return {};
  }
  
}