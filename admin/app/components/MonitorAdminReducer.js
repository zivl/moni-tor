export default (state = {}, action) => {
	switch (action.type) {
		case 'QUEUE_DATA_LOADED':
			return {
				...state,
				data: [...action.data],
				patient: {
					fullName: '',
					id: '',
					phone: ''
				}
			};
		case 'PATIENT_DATA_CHANGED':
			return {
				...state,
				patient: {
					...state.patient,
					...action.data
				}
			}
		default:
			return state;
	}
};
