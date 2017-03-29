import {connect} from 'react-redux';
import MonitorAdminActionHelper from './MonitorAdminActionHelper.js';
import MonitorAdmin from './MonitorAdmin.jsx';

export const mapStateToProps = ({monitorAdmin : {data, patient}}) => {
	let allowCreateNew = false;
	if (patient && patient.id && patient.fullName && patient.phone) {
		allowCreateNew = true;
	}
	return {
		data,
		patient,
		allowCreateNew
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
	};
};

export default connect(mapStateToProps, mapActionsToProps, null, {withRef: true})(MonitorAdmin);
