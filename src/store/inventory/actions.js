import ServiceMethodService from '@/services/serviceMethod';
import { API_ENDPOINTS } from "@/config/apiConfig"
import { successSwal,errorLogWithDeviceInfo} from '@/commonMethods/commonMethod'

export const addInventory = async ({ commit }, data) => {
	commit('loadingStatus', true)
	await ServiceMethodService.common("post", API_ENDPOINTS['inventory'], null, data).then((response) => {
		commit('addInventorySuccess', response.data.data);
    successSwal(response.data.message)
		commit('loadingStatus', false)
	})
	.catch((error) => {
		if (error.response) {
				errorLogWithDeviceInfo(error.response);
			} else {
				errorLogWithDeviceInfo(error);
			}
		if (error.response.status == 401) {
			//AuthService.logout();
		}
		commit('failure', error.response.data);
		commit('loadingStatus', false)
	})
}

export const inventoriesList = async ({ commit }, page) => {
	let link = page ? API_ENDPOINTS['inventory']+"?active=1"+page : API_ENDPOINTS['inventory']+"?active=1"
	commit('loadingStatus', true)
	await ServiceMethodService.common("get", link, null, null).then((response) => {
		commit('inventory', response.data);
		commit('loadingStatus', false)
	})
	.catch((error) => {
		if (error.response) {
				errorLogWithDeviceInfo(error.response);
			} else {
				errorLogWithDeviceInfo(error);
			}
		if (error.response.status == 401) {
			//AuthService.logout();
		}
		commit('failure', error.response.data);
		commit('loadingStatus', false)
	})
}

export const inventoryDetails = async ({ commit }, id) => {
	commit('loadingStatus', true)
	await ServiceMethodService.common("get", API_ENDPOINTS['inventory'], id, null).then((response) => {
		commit('inventoryDetailsSuccess', response.data.data);
		commit('loadingStatus', false)
	})
	.catch((error) => {
		if (error.response) {
				errorLogWithDeviceInfo(error.response);
			} else {
				errorLogWithDeviceInfo(error);
			}
		if (error.response.status == 401) {
			//AuthService.logout();
		}
		commit('failure', error.response.data);
		commit('loadingStatus', false)
	})
}

export const updateInventory = async ({ commit }, {id, data}) => {
	commit('loadingStatus', true)
	await ServiceMethodService.common("put", API_ENDPOINTS['inventory'], id, data).then((response) => {
		commit('updateInventorySuccess', response.data.data);
		commit('loadingStatus', false)
    successSwal(response.data.message)
	})
	.catch((error) => {
		if (error.response) {
				errorLogWithDeviceInfo(error.response);
			} else {
				errorLogWithDeviceInfo(error);
			}
		if (error.response.status == 401) {
			//AuthService.logout();
		}
		commit('failure', error.response.data);
		commit('loadingStatus', false)
	})
}

export const deleteInventory = async ({ commit }, id) => {
	commit('loadingStatus', true)
	await ServiceMethodService.common("delete", API_ENDPOINTS['inventory'], id, null).then((response) => {
		commit('deleteInventorySuccess', response.data.data);
		commit('loadingStatus', false)
    successSwal(response.data.message)
	})
	.catch((error) => {
		if (error.response) {
				errorLogWithDeviceInfo(error.response);
			} else {
				errorLogWithDeviceInfo(error);
			}
		if (error.response.status == 401) {
			//AuthService.logout();
		}
		commit('failure', error.response.data);
		commit('loadingStatus', false)
	})
}

export const deviceModalsList = async ({ commit }, id) => {
	commit('loadingStatus', true)
	await ServiceMethodService.common("get", API_ENDPOINTS['model']+'?deviceType='+id, null, null).then((response) => {
		commit('deviceModalsListSuccess', response.data.data);
		commit('loadingStatus', false)
	})
	.catch((error) => {
		if (error.response) {
				errorLogWithDeviceInfo(error.response);
			} else {
				errorLogWithDeviceInfo(error);
			}
		if (error.response.status == 401) {
			//AuthService.logout();
		}
		commit('failure', error.response.data);
		commit('loadingStatus', false)
	})
}