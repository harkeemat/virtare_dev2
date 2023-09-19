import ServiceMethodService from '@/services/serviceMethod';
import { API_ENDPOINTS } from "@/config/apiConfig"
import { errorLogWithDeviceInfo} from '@/commonMethods/commonMethod'
export const referral = async ({ commit },page) => {
	commit('loadingTableStatus', true)
	let link =page ? API_ENDPOINTS['referralList'] +page : API_ENDPOINTS['referralList']
	await ServiceMethodService.common("get", link, null, null).then((response) => {
		commit('referral', response.data);	
			commit('loadingTableStatus', false)
	})
	.catch((error) => {
		if (error.response) {
			errorLogWithDeviceInfo(error.response);
		} else {
			errorLogWithDeviceInfo(error);
		}
		commit('loadingTableStatus', false)
		commit('errorMsg', error.response.data)

	})
}

