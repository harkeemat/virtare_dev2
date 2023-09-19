import serviceMethod from '@/services/serviceMethod'
import { 
  successSwal,
  errorLogWithDeviceInfo
 } from '@/commonMethods/commonMethod'


export const staffSummary = async ({commit}, id) => {
  commit('loadingTableStatus', true)
  await serviceMethod.common("get", `staff/${id}`, null, null).then((response) => {
    commit('staffSummary', response.data.data);
    commit('loadingTableStatus', false)
  }).catch((error) => { 
    if (error.response) {
				errorLogWithDeviceInfo(error.response);
			} else {
				errorLogWithDeviceInfo(error);
			}
    if (error.response.status === 422) {
      commit('errorMsg', error.response.data)
      commit('loadingTableStatus', false)
    } else if (error.response.status === 500) {
      // errorSwal(error.response.data.message)
      commit('loadingTableStatus', false)
    } else if (error.response.status === 401) {
      // commit('errorMsg', error.response.data.message)
      // errorSwal(error.response.data.message)
      commit('loadingTableStatus', false)
    }
  })
}



export const staffSummaryAppointment = async ({commit}, id) => {
  commit('loadingStatus', true)
  await serviceMethod.common("get", `staff/${id}/appointment`, null, null).then((response) => {
    commit('staffSummaryAppointment', response.data);
    commit('loadingStatus', false)
  }).catch((error) => { 
    if (error.response) {
				errorLogWithDeviceInfo(error.response);
			} else {
				errorLogWithDeviceInfo(error);
			}
    if (error.response.status === 422) {
      commit('errorMsg', error.response.data)
      commit('loadingStatus', false)
    } else if (error.response.status === 500) {
      // errorSwal(error.response.data.message)
      commit('loadingStatus', false)
    } else if (error.response.status === 401) {
      // commit('errorMsg', error.response.data.message)
      // errorSwal(error.response.data.message)
      commit('loadingStatus', false)
    }
  })
}


export const staffSummaryPatient = async ({commit}, id) => {
  commit('loadingStatus', true)
  await serviceMethod.common("get", `staff/${id.id}/patient`+id.data, null, null).then((response) => {
    commit('staffSummaryPatient', response.data);
    commit('loadingStatus', false)
  }).catch((error) => { 
    if (error.response) {
				errorLogWithDeviceInfo(error.response);
			} else {
				errorLogWithDeviceInfo(error);
			}
    if (error.response.status === 422) {
      commit('errorMsg', error.response.data)
      commit('loadingStatus', false)
    } else if (error.response.status === 500) {
      // errorSwal(error.response.data.message)
      commit('loadingStatus', false)
    } else if (error.response.status === 401) {
      // commit('errorMsg', error.response.data.message)
      // errorSwal(error.response.data.message)
      commit('loadingStatus', false)
    }
  })
}

export const updateStaffProfileImage = async ({
  commit
}, data) => {
  commit('isPicuteLoading', true)
  await serviceMethod.common("post", `file`, null, data.formData).then((response) => {
    // console.log('imagePath', response.data.data.path)
    const imagepath = {
      profilePhoto: response.data.data.path
    }
    serviceMethod.common("put", 'staffProfile', data.id, imagepath).then((result) => {
      successSwal(result.data.message)
    }).catch((error) => {
      if (error.response) {
        errorLogWithDeviceInfo(error.response);
      } else {
        errorLogWithDeviceInfo(error);
      }
      if (error.response.status === 422) {
        // errorSwal(error.response.data.file[0])
      } else if (error.response.status === 500) {
        // errorSwal(error.response.data.message)
      } else if (error.response.status === 401) {
        // errorSwal(error.response.data.message)
      }
      commit('isPicuteLoading', false)
    })
  }).catch((error) => {
    if (error.response.status == 422) {
      // errorSwal(error.response.data.file[0])
    } else if (error.response.status === 500) {
      // errorSwal(error.response.data.message)
    } else if (error.response.status === 401) {
      // errorSwal(error.response.data.message)
    }
    if (error.response) {
      errorLogWithDeviceInfo(error.response);
    } else {
      errorLogWithDeviceInfo(error);
    }
    commit('isPicuteLoading', false)
  })
}