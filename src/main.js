import { createApp,h } from 'vue'
import Antd from 'ant-design-vue'
import App from './App'
import 'ant-design-vue/dist/antd.css'
import router from './router/index'
import i18n from './locales/i18n'
import store from './store'
import '@/assets/scss/common.scss'
import VueApexCharts from "vue3-apexcharts";
import { notification, Button } from "ant-design-vue";
import Maska from 'maska'
import VueSpeedometer from 'vue-speedometer';
import CKEditor from '@ckeditor/ckeditor5-vue';
const app = createApp(App)
// Firebase for push notifications
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
const firebaseConfig = {
    apiKey: "AIzaSyARXttm2zCcHO6spiUj1v61HAZqWc9E9oU",
    authDomain: "rpmdemoapp-16785.firebaseapp.com",
    projectId: "rpmdemoapp-16785",
    storageBucket: "rpmdemoapp-16785.appspot.com",
    messagingSenderId: "849086876464",
    appId: "1:849086876464:web:c83c77d045851fef4556f5",
    measurementId: "G-XJW2B0HXTL"
};
const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging();
getToken(messaging, { vapidKey: 'BLuPXuT693CDqZoVL-uUKfn-VFDHGail1U9Dk6i8krkcyjvmkvLSrGn2un21gjiEAUnJ6bdCAMNSrIoHeSaqW60' }).then((currentToken) => {
    if (currentToken) {
        // Send the token to your server and update the UI if necessary
        localStorage.setItem('fireBaseToken',currentToken)
    } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
    }
}).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
});
let notificationCouter =null
let multiUserCounter = null
let notificationAudio = new Audio(require("@/assets/media/Notification.mp3"))
onMessage(messaging, (payload) => {
//   console.log('notification Check',payload)
  store.dispatch('notificationList')
  const key = `open${Date.now()}`;
  let isChatOpened = localStorage.getItem('isChatOpened')
 if(!isChatOpened && payload.data.type != "Escalation") {
    notificationCouter++
    let counter = notificationCouter
   if(counter==1){
    notificationAudio.play()
    localStorage.setItem('notificationsId',payload.data.typeId)
    notification.open({
        message: <div><h2>{`${payload.notification.title}`}</h2></div>,
        description: <div> {`${payload.notification.body}`} </div>,
        btn: [
            h(Button, {
                onClick: () => {   notification.close(key) },
            },
                "Cancel "
            ),
            h(Button, {
                type: "primary",
                onClick: () => { if(payload.data.type=="Appointment"){
                    router.push('/notifications'),
                    notification.close(key)
                }else{
                    router.push({
                        name: 'Communications',
                        query: {
                            view: 'list'
                        },
                        params: {
                            from: 'push',
                            typeId: payload.data.typeId,
                        }
                    }),
                    notification.close(key)
                }
                notificationCouter = 0
                }     
            },
                "View"
            ),
        ],
        key,
        onClose: () => {   notification.close(key) },
        duration: null,
        placement: 'bottomRight'
        
    })
   }else{
    notification.destroy(key)
    //checking if multiple user send the msg
    if((localStorage.getItem('notificationsId') != payload.data.typeId && payload.data.type != "Escalation" )  || (multiUserCounter && payload.data.type != "Escalation")){
        notificationAudio.play()
        multiUserCounter++ // flag counter for multiple user checking
        notification.open({
            message: <div><h2>{`${payload.notification.title}`}</h2></div>,
            description: <div> {'You have received new message from patients'} </div>,
            btn: [
                h(Button, {
                    onClick: () => {   notification.close(key) },
                },
                    "Cancel "
                ),
                h(Button, {
                    type: "primary",
                    onClick: () => { if(payload.data.type=="Appointment"){
                        router.push('/notifications'),
                        notification.close(key)
                    }else{
                        router.push('/communications?view=list'),
                        notification.close(key)
                    }
                    notificationCouter = 0
                    multiUserCounter = 0
                    }     
                },
                    "View"
                ),
            ],
            key,
            onClose: () => {   notification.close(key) },
            duration: null,
            placement: 'bottomRight'
        })
        //checking if single user send the mutiple time msg
    }else if(!multiUserCounter){
        notificationAudio.play()
        notification.open({
            message: <div><h2>{`${payload.notification.title}`}</h2></div>,
            description: <div> {`${payload.notification.body}`} </div>,
            btn: [
                h(Button, {
                    onClick: () => {   notification.close(key) },
                },
                    "Cancel "
                ),
                h(Button, {
                    type: "primary",
                    onClick: () => { if(payload.data.type=="Appointment"){
                        router.push('/notifications'),
                        notification.close(key)
                    }else{
                        router.push({
                            name: 'Communications',
                            query: {
                                view: 'list'
                            },
                            params: {
                                from: 'push',
                                typeId: payload.data.typeId,
                            }
                        }),
                        notification.close(key)
                    }
                    notificationCouter = 0
                    }          
                },
                    "View"
                ),  
            ],
            key,
            onClose: () => {   notification.close(key) },
            duration: null,
            placement: 'bottomRight'
        })
    }
     
   }
 }
 if(payload.data.type === "Escalation"){
    notificationAudio.play()
    notification.open({
        message: <div><h2>{`${payload.notification.title}`}</h2></div>,
        description: <div> {`${payload.notification.body}`} </div>,
        btn: [
            h(Button, {
                onClick: () => {   notification.close(key) },
            },
                "Cancel "
            ),
            h(Button, {
                type: "primary",
                onClick: () => { 
                localStorage.setItem('visibleEscalationModal',true)
                store.commit('visibleEscalationModal',true)
                notification.close(key)
                }
            },
                "View"
            ),
        ],
        key,
        onClose: () => {   notification.close(key) },
        duration: null,
        placement: 'bottomRight'
    })
}
});

//end firebase

// video call config
if (store.state.authentication.loggedInUser) {
    store.getters.videoCall;
}
// Notification block alert for browser 
if(typeof Notification != 'undefined'){
if (Notification?.permission === 'denied') {
    notification.open({
        message: <div><h3>{'Notification blocked'}</h3></div>,
        description: 'Please enable notification for website.',
        duration: 30,
        placement: 'bottomRight'
    }) 
}
}//end notification

app.component('VueSpeedometer', VueSpeedometer)
.use(Antd)
.use(Maska)
.use(firebaseApp)
.use(VueApexCharts)
.use(store)
.use(router)
.use(i18n)
.use( CKEditor )
.mount('#app')


