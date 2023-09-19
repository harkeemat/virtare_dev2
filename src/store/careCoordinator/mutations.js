import {dateAndTimeFormate, deCodeString, key} from '@/commonMethods/commonMethod';
export const counterPlus = (state, data) => {
	if (data) {
		state.counter = data;
	} else {
		state.counter++;
	}
};

export const counterMinus = (state) => {
	state.counter--;
};

export const resetCounter = (state) => {
	state.counter = 0;
};

export const addStaff = async (state, data) => {
	state.addStaff = data;
};

export const updateStaff = async (state, data) => {
	state.updateStaff = data;
};

export const errorMsg = (state, data) => {
	state.errorMsg = data;
};

export const specializationStaff = (state, data) => {
	state.specializationStaff = data;
};

export const networkStaff = (state, data) => {
	state.networkStaff = data;
};

export const staff = async (state, data) => {

	state.staffs = data.data.map(item => {
		item.firstName = deCodeString(key, item.firstName)
		item.lastName = deCodeString(key, item.lastName)
		item.middleName = deCodeString(key, item.middleName)
		item.dob = deCodeString(key, item.dob)
		item.name = deCodeString(key, item.lastName)+', '+deCodeString(key, item.firstName)+' '+deCodeString(key, item.middleName)
		return item
	});
	console.log("checkk",state.staffs)
	state.columns = [
		{
			title: 'Name',
			dataIndex: 'name',
			sorter: true,
			slots: {
				customRender: 'name'
			}
		},
		{
			title: 'Role',
			dataIndex: 'role',
			slots: {
				customRender: 'role'
			},
			sorter: true
		},
		
		{
			title: 'Specialization',
			dataIndex: 'specialization',
			sorter: true
		},
		{
			title: 'Network',
			dataIndex: 'network',
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
			title: 'Status',
			dataIndex: 'status',
			slots: {
				customRender: 'status'
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
	state.staffMeta = data.meta.pagination ? data.meta.pagination : null;
};

export const addContacts = (state, data) => {
	state.addContacts = data;
};

export const staffContactList = (state, data) => {
	state.staffContactList = data.map(item => {
		item.firstName = deCodeString(key, item.firstName)
		item.lastName = deCodeString(key, item.lastName)
		item.middleName = deCodeString(key, item.middleName)
		item.phoneNumber = item.phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")
		return item
	});
	state.staffContactColms = [
		{
			title: 'First Name',
			dataIndex: 'firstName'
		},
		{
			title: 'Last Name',
			dataIndex: 'lastName'
		},
		{
			title: 'Email',
			dataIndex: 'email'
		},
		{
			title: 'Phone No',
			dataIndex: 'phoneNumber'
		},
		{
			title: 'Actions',
			dataIndex: 'actions',
			slots: {
				customRender: 'action'
			}
		}
	];
};

export const addAvailability = (state, data) => {
	state.addAvailability = data;
};

export const availabilityList = (state, data) => {
	(state.availabilityList = data.map((item) => {
		item.startTime = dateAndTimeFormate(item.startTime,'hh:mm A');
		item.endTime = dateAndTimeFormate(item.endTime,'hh:mm A');
		return item;
	})),
		(state.availabilityListColms = [
			{
				title: 'Start Time',
				dataIndex: 'startTime'
			},
			{
				title: 'End Time',
				dataIndex: 'endTime'
			},
			{
				title: 'Actions',
				dataIndex: 'actions',
				slots: {
					customRender: 'action'
				}
			}
		]);
};

export const addStaffRole = (state, data) => {
	state.addStaffRole = data;
};

export const roleList = (state, data) => {
	(state.roleList = data),
		(state.roleListColms = [
			{
				title: 'Role',
				dataIndex: 'role',
				slots: {
					customRender: 'role'
				}
			},
			{
				title: 'Actions',
				dataIndex: 'actions',
				slots: {
					customRender: 'action'
				}
			}
		]);
};

export const addProvider = (state, data) => {
	state.addProvider = data;
};

export const providerList = (state, data) => {
	state.providerList = data;
	state.providerListColms = [
		{
			title: 'Provider Name',
			dataIndex: 'name'
		},

		{
			title: 'Actions',
			dataIndex: 'actions',
			slots: {
				customRender: 'action'
			}
		}
	];
};

export const roles = (state, data) => {
	state.roles = data;
};

export const providers = (state, data) => {
	state.providers = data;
};

export const addStaffDocument = (state, data) => {
	state.addStaffDocument = data;
};

export const staffDocuments = (state, data) => {
	state.staffDocuments = data.map((item) => {
		return item;
	});
	state.documentColumns = [
		{
			title: 'Name',
			dataIndex: 'name'
		},
		{
			title: 'Document',
			dataIndex: 'document',
			slots: {
				customRender: 'document'
			}
		},
		{
			title: '	Type',
			dataIndex: 'type'
		},
		{
			title: '	Tags',
			dataIndex: 'tags',
			slots: {
				customRender: 'tags'
			}
		},
		{
			title: 'Actions',
			dataIndex: 'actions',
			slots: {
				customRender: 'action'
			}
		}
	];
};

export const closeModal = (state, data) => {
	state.closeModal = data;
};

export const availabilityDetails = (state, data) => {
	data.startTime = dateAndTimeFormate(data.startTime,'HH:mm')
	data.endTime = dateAndTimeFormate(data.endTime,'HH:mm')
	state.availabilityDetails = data;
};

export const contactDetails = (state, data) => {
	state.contactDetails = data;
	state.contactDetails.firstName = deCodeString(key, state.contactDetails.firstName)
		state.contactDetails.lastName = deCodeString(key, state.contactDetails.lastName)
		state.contactDetails.middleName = deCodeString(key, state.contactDetails.middleName)
	state.contactDetails['phoneNumber'] = data.phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")
};


export const clearStaffFormValidation = (state, data) => {
	state.clearStaffFormValidation = data;
};


export const documentStaffDetails = (state, data) => {
 const tags = []
  data.tag.map(tag => {
    tags.push(tag.tagId)
  })
  data.tags = tags
  data.document = data.path
  data.type = data.typeId
  state.documentStaffDetails = data
};

export const addStaffLocations = (state, data) => {
	state.addStaffLocations = data
}

export const staffLocations = (state, data) => {
	state.staffLocations = data

	/* const locations = []
	if(data && data.length > 0) {
		data.map((location, index) => {
			let locationsObj = location.locations
			if(location[index].entityType != location[index-1].entityType) {
				location.value = locationsObj.id
				location.id = Number(locationsObj.id)
				location.key = String(locationsObj.id)
				location.parentKey = null
				location.name = locationsObj.locationName
				location.title = locationsObj.locationName
				location.providerId = locationsObj.provider ? locationsObj.provider.id : null
				location.providerName = locationsObj.provider ? locationsObj.provider.name : ""
				location.programs = locationsObj.programs ? locationsObj.programs : []
				location.children = [{}]
				locations.push(location)
			}
		});
		console.log('entityType', locations)
		// if(location.state.length > 0) {
		// 	locations.push(location.state)
		// }
		state.staffLocations.push(locations)
	} */

	/* state.staffLocations = []
	state.staffLocations = data.map((item => {
		let locationsObj = item.locations
		item.id = locationsObj.id
		item.locationId = locationsObj.locationId
		item.entityType = locationsObj.entityType
		item.locationName = locationsObj.locationName
		item.parentId = locationsObj.parentId
		item.parentName = locationsObj.parentName
		item.programs = locationsObj.programs
		return item
	})) */
}

export const staffHeaderLocations = (state, data) => {
	console.log(data)
	// let locations = []
	const countries = [{
		id: 1,
		locationId: 19,
		locationName: 'United States',
		entityType: 'Country',
		parentId: "",
		parentName: "",
		states: [{
			id: 11,
			locationId: 14,
			locationName: 'Vermont',
			entityType: 'State',
			parentId: 1,
			parentName: "United States",
			cities: [{
				id: 111,
				locationId: 'Bristol',
				locationName: 'Bristol',
				entityType: 'City',
				parentId: 11,
				parentName: "Vermont",
			},
			{
				id: 112,
				locationId: 'Bridport',
				locationName: 'Bridport',
				entityType: 'City',
				parentId: 11,
				parentName: "Vermont",
			}]
		}]
	}]
	countries.map(country => {
		country.states.map(state => {
			state.cities.map((city, index) => {
				console.log('staffHeaderLocations city', city)
				if(index > 0 && index <= state.cities.length) {
					console.log('staffHeaderLocations index', index)
				}
			})
		})
	})
}

export const addStaffPrograms = (state, data) => {
	state.addStaffPrograms = data
}

export const staffPrograms = (state, data) => {
	state.staffPrograms = data.map((item => {
		item.id = item.programs.id
		item.name = item.programs.name
		return item
	}))
}


