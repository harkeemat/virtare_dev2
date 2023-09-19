import serviceMethod from '@/services/serviceMethod';
import {
  errorLogWithDeviceInfo,
  // successSwal
} from '@/commonMethods/commonMethod';
import { API_ENDPOINTS } from '../../config/apiConfig';

export const specialists = async ({commit}, page) => {
let link = page ? API_ENDPOINTS['specialists']+page+`&type=specialist` : API_ENDPOINTS['specialists']+`?type=specialist`
commit('loadingTableStatus', true)  
await serviceMethod.common("get", link, null, null).then((response) => {
    commit('specialists', response.data);
    commit('loadingTableStatus', false)
  }).catch((error) => {
    if (error.response) {
				errorLogWithDeviceInfo(error.response);
        commit('loadingTableStatus', false)
			} else {
				errorLogWithDeviceInfo(error);
        commit('loadingTableStatus', false)
			}
  })
}


export const specialistSummary = async ({commit}, id) => {
  commit('loadingTableStatus', true)
  await serviceMethod.common("get", `staff/${id}`, null, null).then((response) => {
    commit('specialistSummary', response.data.data);
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