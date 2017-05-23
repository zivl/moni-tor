
const validate = (fieldName, data, errors, validationRegExp) => {
	if (data[fieldName]) {
		if (!validationRegExp.test(data[fieldName])){
			errors[fieldName] = true;
		} else {
			delete errors[fieldName];
		}
	}
};

export default (state = {}, action) => {
	switch (action.type) {
		case 'QUEUE_DATA_LOADED':
			return {
				...state,
				data: [...action.data]
			};
		case 'CLEAR_PATIENT_DATA':
			return {
				...state,
				patient: {
					fullName: '',
					id: '',
					phone: '',
					errors: {}
				}
			};
		case 'PATIENT_DATA_CHANGED':
			let {errors} = {...state.patient};
			validate('phone', action.data, errors, /^[\d]*$/);
			validate('id', action.data, errors, /^[\d]{9}$/);
			return {
				...state,
				patient: {
					...state.patient,
					...action.data,
					errors
				}
			};
		default:
			return state;
	}
};
