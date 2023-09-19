import{meridiemFormatFromTimestamp,dateOnlyFormat,globalDateFormat,deCodeString, key} from "@/commonMethods/commonMethod"

export const staffSummary= async (state, data) => {
    state.staffSummary = data
    state.staffSummary.firstName = state.staffSummary?.firstName?deCodeString(key, state.staffSummary?.firstName):''
		state.staffSummary.lastName = state.staffSummary?.lastName?deCodeString(key, state.staffSummary?.lastName):''
		state.staffSummary.middleName = state.staffSummary?.middleName?deCodeString(key, state.staffSummary?.middleName):''
		state.staffSummary.dob = state.staffSummary?.dob?deCodeString(key, state.staffSummary?.dob):''
		state.staffSummary.fullName = state.staffSummary?.lastName+', '+state.staffSummary?.firstName+' '+state.staffSummary?.middleName
    state.staffSummary['phoneNumber'] = data?.phoneNumber?.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
}

export const staffSummaryAppointment= async (state, data) => {
    state.staffSummaryAppointment = data.data.map(item=>{
      item.date = dateOnlyFormat(item.date)+' '+meridiemFormatFromTimestamp(item.time)
      return item
    });
    state.staffSummaryAppointmentMeta = data?.meta?.pagination
    state.staffSummaryAppointmentCols =[
        {
          title: "Patient Name",
          dataIndex: "patient",
          slots: {
            customRender: "patient",
          },
        },
        {
          title: "Date & Time ",
          dataIndex: "date",
        },
        {
          title: "	Appointment Type",
          dataIndex: "appointmentType",
          slots: {
            customRender: "appt",
          },
        },
        // {
        //     title: "Actions",
        //     dataIndex: "actions",
        //     slots: {
        //         customRender: "action",
        //     },
        //   },
      ];
}


export const staffSummaryPatient= async (state, data) => {
  state.staffSummaryMeta = data.meta.pagination;
    state.staffSummaryPatient = data.data.map(element => {
     
        // element.flags = element.flagColor?element.flagColor:'',
        element.lastName=element.lastName? deCodeString(key,element.lastName) :'',
        element.firstName=element.name? deCodeString(key,element.name)+' '+ deCodeString(key,element.lastName) :'' 
        element.lastReadingDate=element.lastReadingDate?dateOnlyFormat(element.lastReadingDate,globalDateFormat):''
        element.weight=element.weight?element.weight:''
        element.bp = element.patientVitals.length>0?element.patientVitals.data.map(vitalData=>{ if(vitalData.vitalField=='Systolic'){return JSON.parse(vitalData.value)}if(vitalData.vitalField=='Diastolic'){return '/'+JSON.parse(vitalData.value)}}):''
        element.spo2 = element.patientVitals.length>0?element.patientVitals.data.map(vitalData=>{ if(vitalData.vitalField=='SPO2'){return JSON.parse(vitalData.value)}}):'',
        element.glucose = element.patientVitals.length>0?element.patientVitals.data.map(vitalData=>{ if(vitalData.vitalField=='Random Blood Sugar'){return JSON.parse(vitalData.value)}}):'',
        element.dob = Math.floor((new Date() - new Date(deCodeString(key,element.dob)).getTime()) / 3.15576e+10)>0?Math.floor((new Date() - new Date(deCodeString(key,element.dob)).getTime()) / 3.15576e+10):1
        return element
 }) 

}

export const showStaffDetailsModal= async (state) => {
  state.visibleModal = true;
}

export const closeStaffDetailsModal= async (state) => {
  state.visibleModal = false;
}