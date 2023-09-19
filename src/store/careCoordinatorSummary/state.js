export default{
    staffSummary:null,
    staffSummaryAppointment:null,
    staffSummaryAppointmentMeta:null,
    staffSummaryAppointmentCols:null,
    staffSummaryPatient:null,
    staffSummaryPatientCols: [
        {
          title: "Flags",
          dataIndex: "flags",
          slots: {
            customRender: "flags",
          },
        },
        {
          title: "Name",
          dataIndex: "fullName",
          width: '15%',
          sorter:true,
          slots: {
            customRender: "fullName",
          },
        },
        {
          title: "Age",
          dataIndex: "age",
          width: '10%',
          align: 'right',
          sorter: true,
        },
        {
          title: "Gender",
          dataIndex: "genderName",
          sorter: true,
        },
        {
          title: "Last Reading Date",
          dataIndex: "lastReadingDate",
          
        },
        // {
        //     title: "Actions",
        //     dataIndex: "actions",
        //     slots: {
        //         customRender: "action",
        //     },
        //   },
      ],
    staffSummaryMeta:null,
    visibleModal:false
}