import {connect} from 'react-redux';
import MonitorAdminActionHelper from './MonitorAdminActionHelper.js';
import MonitorAdmin from './MonitorAdmin.jsx';


function calcTimeDiff(date1) {
	const date1Ms = date1.getTime();
	const date2Ms = (new Date()).getTime();

	let differenceMs = date2Ms - date1Ms;
	differenceMs = differenceMs/1000;
	differenceMs = differenceMs/60;
	const minutes = Math.floor(differenceMs);
	return minutes;
}

export const mapStateToProps = ({monitorAdmin : {data, patient}}) => {
	let allowCreateNew = false;
	let isListEmpty = false;
	if (patient && patient.id && patient.fullName && patient.phone) {
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
