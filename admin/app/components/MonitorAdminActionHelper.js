import RestApiUtil from '../utils/RestApiUtil.js';

function fetchQueue() {
	return RestApiUtil.fetch('/queue');
}
function invitePatient() {
	return RestApiUtil.put('/queue/notify');
}
function removeFromQueue(id) {
	return RestApiUtil.destroy('/queue/'+id);
}
function moveTopQueue(id) {
	return RestApiUtil.put('/queue/top/'+id);
}
function addPatient(data) {
	return RestApiUtil.post('/queue', data);
}

const MonitorAdminActionHelper = {
	fetchQueueAction(dispatch){
		fetchQueue().then(response => {
			dispatch ({type: 'QUEUE_DATA_LOADED', data: response});
		});
	},
	invitePatientAction(dispatch){
		invitePatient().then(response => {
			dispatch ({type: 'QUEUE_DATA_LOADED', data: response});
		})
	},
	removeFromQueueAction(dispatch, id){
		removeFromQueue(id).then(fetchQueue).then(response => {
			dispatch ({type: 'QUEUE_DATA_LOADED', data: response});
		});
	},
	moveTopQueueAction(dispatch, id){
		moveTopQueue(id).then(response => {
			dispatch ({type: 'QUEUE_DATA_LOADED', data: response});
		});
	},
	updateNewPatientData(dispatch, data) {
		dispatch ({type: 'PATIENT_DATA_CHANGED', data});
	},
	clearPatientData(dispatch) {
		dispatch ({type: 'CLEAR_PATIENT_DATA'});
	},
	addPatientAction(dispatch, data){
		addPatient(data).then(fetchQueue).then(response => {
			dispatch ({type: 'QUEUE_DATA_LOADED', data: response});
		});
	},
}

export default MonitorAdminActionHelper;

