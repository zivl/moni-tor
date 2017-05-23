import {connect} from 'react-redux';
import MonitorAdminActionHelper from './MonitorAdminActionHelper.js';
import MonitorAdmin from './MonitorAdmin.jsx';


function calcTimeDiff(date1) {
	const date1Ms = date1.getTime();
	const date2Ms = (new Date()).getTime();

	let differenceMs = date2Ms - date1Ms;
	differenceMs = differenceMs/1000;
	differenceMs = differenceMs/60;
	return Math.floor(differenceMs);
}

const validationMessages = {
	phone : 'מספר טלפון לא חוקי. יש להשתמש בספרות בלבד'	,
	id : 'מספר ת.ז. חייב להיות בן 9 ספרות'
};

export const mapStateToProps = ({monitorAdmin : {data, patient}}) => {
	let allowCreateNew = false;
	let isListEmpty = false;
	if (patient && patient.id && patient.fullName && patient.phone && patient.errors && Object.getOwnPropertyNames(patient.errors).length  === 0) {
		allowCreateNew = true;
	}
	if (data && data.length === 0) {
		isListEmpty = true;
	}

	if (data) {
		for (let i = 0; i < data.length; i++) {
			let regDate = new Date(data[i].registrationTime);
			data[i].diffMin = calcTimeDiff(regDate);
		}
	}
	let errorText = [];
	if (patient && patient.errors) {
		for (let error in patient.errors) {
			if (patient.hasOwnProperty(error)) {
				errorText[errorText.length] = validationMessages[error];
			}
		}
		patient.errorText = errorText;
	}


	return {
		data,
		patient,
		allowCreateNew,
		isListEmpty
	};
};

export const mapActionsToProps = (dispatch) => {
	return {
		fetchQueue: () => MonitorAdminActionHelper.fetchQueueAction(dispatch),
		invitePatient: () => MonitorAdminActionHelper.invitePatientAction(dispatch),
		removeFromQueue: (id) => MonitorAdminActionHelper.removeFromQueueAction(dispatch, id),
		moveTopQueue: (id) => MonitorAdminActionHelper.moveTopQueueAction(dispatch, id),
		updateNewPatientData: (data) => MonitorAdminActionHelper.updateNewPatientData(dispatch, data),
		addPatient: (data) => MonitorAdminActionHelper.addPatientAction(dispatch, data),
		clearPatientData: (data) => MonitorAdminActionHelper.clearPatientData(dispatch),
	};
};

export default connect(mapStateToProps, mapActionsToProps, null, {withRef: true})(MonitorAdmin);
