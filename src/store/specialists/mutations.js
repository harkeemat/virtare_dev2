
export const specialists = (state, data) => {
	state.specialists = data.data;
	state.specialistsColumns = [
		{
			title: 'Name',
			dataIndex: 'fullName',
			sorter: true,
			slots: {
				customRender: 'name'
			}
		},
		{
			title: 'Specialization',
			dataIndex: 'specialization',
			sorter: true
		},
		{
			title: 'Organisation',
			dataIndex: 'organisation',
			sorter: true,
		},
		{
			title: 'Location',
			dataIndex: 'location',
			sorter: true
		},
		{
			title: 'Created At',
			dataIndex: 'createdAt',
			sorter: true,
			slots: {
				customRender: 'createdDate'
			}
		},
		{
			title: 'Action',
			dataIndex: 'actions',
			slots: {
				customRender: 'action'
			}
		}
	];
	state.specialistsMeta = data.meta.pagination;
};

export const specialistSummary = (state, data) => {
	state.specialistSummary = data
}