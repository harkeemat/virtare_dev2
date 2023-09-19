import ServiceMethodService from '@/services/serviceMethod';
import serviceMethod from '@/services/serviceMethod';

import {
  API_ENDPOINTS,
} from '@/config/apiConfig';
import {
  messages
} from '@/config/messages';
import {
  errorSwal,
  errorLogWithDeviceInfo,
  successSwal
} from '@/commonMethods/commonMethod';
import router from '@/router';
import store from '@/store/index'
let date = new Date();
export const login = async ({
  commit
}, user) => {
  
  await ServiceMethodService.login(user)
    .then((response) => {
      commit('logoutLoader', true)
      localStorage.setItem('user', response.data.user);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('auth', JSON.stringify(response.data));
      localStorage.setItem('checkLogin', true);
      localStorage.setItem(
        'expiresIn',
        date.setSeconds(date.getSeconds() + (response.data.expiresIn / 100 - 10))
      );
      store.dispatch("filterDateDataGet")
      // setInterval for refresh token api
      setInterval(async () => {
        await ServiceMethodService.common('post', API_ENDPOINTS['refreshToken'], null, true)
          .then((response) => {
            commit('refreshTokenSuccess', response.data);
            localStorage.setItem('token', response.data.token);
            commit('expiresIn', date.setSeconds(date.getSeconds() + (response.data.expiresIn / 100 - 10)));
            localStorage.setItem(
              'expiresIn',
              date.setSeconds(date.getSeconds() + (response.data.expiresIn / 100 - 10))
            );
            
          })
          .catch((error) => {
            errorLogWithDeviceInfo(error.response);
          });
      }, (response.data.expiresIn / 100 - 10) * 1000);
      // end setInterval
      commit('loginSuccess', response.data);
      roleAccess({
        commit
      });
    })
    .catch((error) => {
      commit('logoutLoader', false)
      if (error.response) {
        if (error.response.status == 422) {
          commit('logoutLoader', false)
          commit('loginFailure', 'Invalid Login Credentials');
          commit('failure', 'Invalid Login Credentials');
        }
        else if (error.response.status == 401) {
          commit('loginFailure', 'Invalid Login Credentials');
          commit('failure', 'Invalid Login Credentials');
        }
        else {
          commit('loginFailure', error);
        }
        errorLogWithDeviceInfo(error.response);
      }
      else {
        errorLogWithDeviceInfo(error);
      }
    });
};


const roleAccess = async ({commit}) => {
  await ServiceMethodService.common('get', 'staff/access', null, null)
    .then((response) => {
      commit('accessPermission', response.data.data.length);
      localStorage.setItem('accessPermission', response.data.data.length);
      localStorage.setItem('access', true);
      localStorage.setItem('roleAuth', response.data.data[0] ? response.data.data[0].roleId : '');
      permission({
        commit
      });
      
      
    })
    .catch((error) => {
      commit('logoutLoader', false)
      if (error.response) {
        errorLogWithDeviceInfo(error.response);
      } else {
        errorLogWithDeviceInfo(error);
      }
      errorSwal(error.response.data.message);
    });
};

export const permission = async ({ commit }) => {
  const authUser = JSON.parse(localStorage.getItem("auth"));
  const authStaff = authUser?.user.staff
  const authStaffId = authStaff?.id
  const authStaffGroupId = authStaff?.groupId
  
  let apiUrl = ''
  if(authStaffGroupId != "" && authStaffGroupId != null) {
    apiUrl = `actionPermission?staff=${authStaffId}&group=${authStaffGroupId}`
  }
  else {
    apiUrl = `staff/access/action`
  }
  await ServiceMethodService.common('get', apiUrl, null, null).then((response) => {
    if (response.data.actionId.length == 0 && response.data.widgetId.length == 0) {
      errorSwal(messages.permissionsError).then((response) => {
        commit('failure', 'true');
        if (response == true) {
          logoutUser({ commit });
        }
        else {
          logoutUser({ commit });
        }
      });
    }
    else {
      localStorage.setItem('screensPermission', JSON.stringify(response.data.actionId));
      localStorage.setItem('widgetsPermission', JSON.stringify(response.data.widgetId));
      localStorage.setItem('permission', JSON.stringify(response.data));
      commit('permissions', response.data);
      router.push(router.currentRoute.value.query.redirect || '/dashboard');
      commit('logoutLoader', false)
    }
  }).catch((error) => {
    commit('logoutLoader', false)
    if (error.response) {
      errorLogWithDeviceInfo(error.response);
    } else {
      errorLogWithDeviceInfo(error);
    }
  });
};

export const logoutUser = async ({ commit }) => {
  commit('logoutLoader', true)
  await ServiceMethodService.common('post', 'logout', null, []).then(() => {
      // console.log(commit)
      //if(response){
      successSwal('Logout Successfully ');
      localStorage.removeItem('user');
      localStorage.removeItem('barmenu');
      localStorage.removeItem('staff');
      localStorage.removeItem('token');
      localStorage.removeItem('auth');
      localStorage.removeItem('roleAuth');
      localStorage.removeItem('access');
      localStorage.removeItem('accessPermission');
      localStorage.removeItem('permission');
      localStorage.removeItem('screensPermission');
      localStorage.removeItem('widgetsPermission');
      localStorage.removeItem('fireBaseToken');
      localStorage.removeItem('expiresIn');
      localStorage.removeItem('checkLogin');
      localStorage.removeItem('taskRoute')
      localStorage.removeItem('communicationRoute')
      router.push('/');
      setTimeout(() => {
        router.go();
        
      }, 1000);
      setTimeout(() => {
        
        commit('logoutLoader', false)
      }, 2000);
      //}
    })
    .catch((error) => {
      if (error.response) {
        errorLogWithDeviceInfo(error.response);
      } else {
        errorLogWithDeviceInfo(error);
      }
      errorSwal(error.response.data.message);
      commit('logoutLoader', false)
    });
};

export const refreshToken = async ({
  commit
}) => {
  await ServiceMethodService.common('post', API_ENDPOINTS['refreshToken'], null, true)
    .then((response) => {
      commit('refreshTokenSuccess', response.data);
      localStorage.setItem('token', response.data.token);
      commit('expiresIn', date.setSeconds(date.getSeconds() + (response.data.expiresIn / 100 - 10)));
      localStorage.setItem(
        'expiresIn',
        date.setSeconds(date.getSeconds() + (response.data.expiresIn / 100 - 10))
      );
      // setInterval for refresh token api
      setInterval(async () => {
        await ServiceMethodService.common('post', API_ENDPOINTS['refreshToken'], null, true)
          .then((response) => {
            commit('refreshTokenSuccess', response.data);
            localStorage.setItem('token', response.data.token);
            commit('expiresIn', date.setSeconds(date.getSeconds() + (response.data.expiresIn / 100 - 10)));
            localStorage.setItem(
              'expiresIn',
              date.setSeconds(date.getSeconds() + (response.data.expiresIn / 100 - 10))
            );
          })
          .catch((error) => {
            if (error.response) {
              errorLogWithDeviceInfo(error.response);
            } else {
              errorLogWithDeviceInfo(error);
            }
          });
      }, (response.data.expiresIn / 100 - 10) * 1000);
      // end setInterval
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
    });
};




export const escalationAuth = async ({ commit }, data) => {
  let status = false
  await serviceMethod.common("post", `escalation/${data.id}/verify`, null, data).then((response) => {
    localStorage.setItem('token', response.data.token);
    status = true
    ServiceMethodService.common('get', 'staff/access/action', null, null)
    .then((response) => {
      // if (response.data.actionId.length == 0 && response.data.widgetId.length == 0) {
      //   errorSwal(messages.permissionsError).then((response) => {
      //     commit('failure', 'true');
      //     if (response == true) {
      //       logoutUser({
      //         commit
      //       });
      //     } else {
      //       logoutUser({
      //         commit
      //       });
      //     }
      //   });
      // } else {
        localStorage.setItem('screensPermission', JSON.stringify(response.data.actionId));
        localStorage.setItem('widgetsPermission', JSON.stringify(response.data.widgetId));
        localStorage.setItem('permission', JSON.stringify(response.data));
        commit('permissions', response.data);
        // router.push(router.currentRoute.value.query.redirect || '/dashboard');
      // }
    })
  }).catch((error) => {
   if (error.response) {
				errorLogWithDeviceInfo(error.response);
			} else {
				errorLogWithDeviceInfo(error);
			}
    if (error.response.status === 422) {
      commit('errorMsg', error.response.data)
    } else if (error.response.status === 500) {
      // errorSwal(error.response.data.message)
    } else if (error.response.status === 401) {
      // commit('errorMsg', error.response.data.message)
      // errorSwal(error.response.data.message)
    } else if (error.response.status === 409) {
      // commit('errorMsg', error.response.data.message)
      // errorSwal(error.response.data.message)
    }
  })
  return status
}