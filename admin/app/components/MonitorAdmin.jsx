import React, {Component} from 'react';

var interval;

function calcTimeDiff(date1) {
	const date1Ms = date1.getTime();
	const date2Ms = (new Date()).getTime();

	let differenceMs = date2Ms - date1Ms;
	differenceMs = differenceMs/1000;
	differenceMs = differenceMs/60;
	const minutes = Math.floor(differenceMs);
	return minutes;
}
class MonitorAdmin extends Component {
	state = {
		showModal: false,
		date: new Date()
	}

	componentDidMount() {
		this.props.fetchQueue();
		this.setState({date: new Date()});
		interval = setInterval(this.props.fetchQueue,10000);
	}
	componentWillUnmount() {
		clearInterval(interval);
	}

	addPatient(data) {
		this.props.addPatient(data);
		this.closeModal();
	}

	closeModal() {
		this.setState({showModal: false});
		interval = setInterval(this.props.fetchQueue,10000);
	}

	openModal() {
		this.setState({showModal: true});
		clearInterval(interval);
	}

	render() {
		return (
			<div>
				<div className='content'>
					<div className='logo'>MONITOR</div>
					<div className='main-actions'>
						<button className='add-patient-button' onClick={() => this.openModal()} >+</button>
						<button disabled={this.props.isListEmpty} onClick={this.props.invitePatient} className='summon-button'>&#128276;&nbsp;&nbsp; זמן את הבאה בתור</button>
						<div className='date'>{this.state.date.toDateString()}<span className='sproket'> | </span>{this.state.date.toTimeString().substring(0,5)}</div>
					</div>
					<List {...this.props} ></List>
				</div>
				{this.state.showModal && <div className='modal-bg'>	</div>}
				{this.state.showModal && <AddPatient {...this.props.patient} addEnabled={this.props.allowCreateNew}
													 closeModal={() => this.setState({showModal : false})}
													 updatePatientData={this.props.updateNewPatientData}
													 addPatient={(data) => this.addPatient(data)}/>}
			</div>
		);
	}
}

class AddPatient extends Component  {
	render(){
		let {fullName, id, phone} = this.props;
		return (<div className='modal'>
			<div className='field'><label>שם המטופלת</label><input type='text' id='fullName' name='fullName' value={fullName} onChange={(e) => this.props.updatePatientData({fullName: e.target.value})}/></div>
			<div className='field'><label>ת.ז.</label><input type='text' id='name' name='id' value={id}  onChange={(e) => this.props.updatePatientData({id: e.target.value})} /></div>
			<div className='field'><label>מספר טלפון</label><input type='text' id='phone' name='phone' value={phone}  onChange={(e) => this.props.updatePatientData({phone: e.target.value})}/></div>
			<div className='main-actions'>
				<button className='modal-button cancel' onClick={this.props.closeModal} >ביטול</button>
				<button className='modal-button' onClick={()=>this.props.addPatient({fullName, id, phone})} disabled={!this.props.addEnabled}>אישור</button>
			</div>
		</div>);
	}
}
const ListItem = (props) => {
	const {itemData : {fullName, id, phone, registrationTime, notificationTime}} = props;
	let regDate = new Date(registrationTime);
	var diff =  calcTimeDiff(regDate);
	let timeClass = '';
	if ((diff >= 60) && (!notificationTime)) { //60min
		timeClass = 'red';
	} else if ((diff >= 30) && (!notificationTime)) {//30min
		timeClass = 'orange';
	}
	return(<li className='row'>
		<div className='big-col align'>{fullName}</div>
		<div className='big-col align'>{id}</div>
		<div className='big-col phone-number align'>{phone}</div>
		<div className='big-col align'>{new Date(registrationTime).toTimeString().substring(0,5)}</div>
		<div className={timeClass + ' small-col align'}>{notificationTime ? 'הזמנה נשלחה' : 'ממתינה'}</div>
		<div className='huge-col flex-col'>
			<div className='action remove'  onClick={()=>props.removeFromQueue(id)} >X הסרה מהרשימה</div>
			{notificationTime ?  <div className='action arrived'  onClick={()=>props.removeFromQueue(id)} > &#10003; המטופלת הגיעה</div> : <div className='action top' onClick={()=>props.moveTopQueue(id)}>! הקפצה לראש הרשימה</div> }

		</div>
	</li>);
}

const ListItemHeader = (props) => {
	return(<li key='header-key' className='row header'>
		<div className='col-title big-col'>שם המטופלת</div>
		<div className='col-title big-col'>תעודת זהות</div>
		<div className='col-title big-col'>טלפון</div>
		<div className='col-title big-col'>שעת הבקשה</div>
		<div className='col-title small-col'>סטטוס</div>
		<div className='col-title huge-col'>פעולות</div>
	</li>);
}

const List = (props) => {
	const actions = {invitePatient: props.invitePatient, removeFromQueue: props.removeFromQueue,  moveTopQueue: props.moveTopQueue};
	return (<ul className='list'>
		{!props.isListEmpty && <ListItemHeader/>}
		{props.isListEmpty && <li className='row empty'>רשימת ההמתנה ריקה</li>}
		{props.data && props.data.map(entry => <ListItem itemData={entry} key={entry.id} {...actions} />)}
	</ul>);
}

export default MonitorAdmin;
