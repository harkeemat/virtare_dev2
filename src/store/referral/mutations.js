export const referralColumns = async (state) => {
  state.referralColumns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter:true
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter:true
    },
    {
      title: "Patient Name",
      dataIndex: "patientName",
      sorter:true,
      slots: {
        customRender: "patientName",
      },
    },
    // {
    //   title: "Designation",
    //   dataIndex: "designation",
    //   sorter:true
    // },
  
    // {
    //   title: "Actions",
    //   dataIndex: "actions",
    //   slots: {
    //     customRender: "actions",
    //   },
    // },
  ];
}
export const referral = async (state, referral) => {
 
  state.referral = referral.data.map(item => {
		item.phoneNumber = item.phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")
		return item
	});
  state.referralMeta=referral.meta ? referral.meta.pagination : ''
}

