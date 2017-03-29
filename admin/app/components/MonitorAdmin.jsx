import React, {Component} from 'react';

var interval;

function calcTimeDiff(date1, date2) {
	/*const date1Ms = date1.getTime();
	const date2Ms = date2.getTime();

	let differenceMs = date2Ms - date1Ms;
	differenceMs = differenceMs/1000;
	differenceMs = differenceMs/60;
	const minutes = Math.floor(differenceMs % 60);*/
	return 1;
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
		this.setState({showModal : false});
	}

	render() {
		return (
			<div>
				<div className='content'>
					<div className='logo'></div>
					<div className='date'>{this.state.date.toDateString()}</div>
					<div className='main-actions'><button disabled={this.props.isListEmpty} onClick={this.props.invitePatient}>זמן את הבאה בתור</button>
					</div>
					<div className='action'><button onClick={() => this.setState({showModal: true})} >הוסף מטופלת</button></div>
					<List {...this.props} date={this.state.date}></List>
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
			<div className='field'><label>שם המטופלת:</label><input type='text' id='fullName' name='fullName' value={fullName} onChange={(e) => this.props.updatePatientData({fullName: e.target.value})}/></div>
			<div className='field'><label>ת.ז.:</label><input type='text' id='name' name='id' value={id}  onChange={(e) => this.props.updatePatientData({id: e.target.value})} /></div>
			<div className='field'><label>מספר טלפון:</label><input type='text' id='phone' name='phone' value={phone}  onChange={(e) => this.props.updatePatientData({phone: e.target.value})}/></div>
			<div className='main-actions'>
				<button onClick={()=>this.props.addPatient({fullName, id, phone})} disabled={!this.props.addEnabled}>אישור</button>
				<button onClick={this.props.closeModal} >ביטול</button>
			</div>
		</div>);
	}
}
const ListItem = (props) => {
	const {itemData : {fullName, id, phone, registrationTime, notificationTime}} = props;
	let regDate = new Date(registrationTime);
	var diff =  calcTimeDiff(regDate, props.date);
	let timeClass = '';
	if (diff >= 60) { //60min
		timeClass = 'red';
	} else if (diff >= 30) {//30min
		timeClass = 'orange';
	}
	return(<li className='row'>
		<div className='big-col'>{fullName}</div>
		<div className='big-col'>{id}</div>
		<div className='big-col phone-number'>{phone}</div>
		<div className={timeClass + ' small-col'}>{new Date(registrationTime).toTimeString().substring(0,5)}</div>
		<div className='small-col'>{notificationTime ? 'הזמנה נשלחה' : 'ממתינה'}</div>
		<div className='big-col flex-col'>
			{notificationTime ?  <div className='action arrived'  onClick={()=>props.removeFromQueue(id)} >&#10003;</div> : <div ></div> }
			<div className='action remove'  onClick={()=>props.removeFromQueue(id)} >&#9249;</div>
			<div className='action top' onClick={()=>props.moveTopQueue(id)}>&#5839;</div>
		</div>
	</li>);
}

const ListItemHeader = (props) => {
	return(<li key='header-key' className='row header'>
		<div className='col-title big-col'>שם המטופלת</div>
		<div className='col-title big-col'>תעודת זהות</div>
		<div className='col-title big-col'>טלפון</div>
		<div className='col-title small-col'>שעת הבקשה</div>
		<div className='col-title small-col'>סטטוס</div>
		<div className='col-title big-col'>פעולות</div>
	</li>);
}

const List = (props) => {
	const actions = {invitePatient: props.invitePatient, removeFromQueue: props.removeFromQueue,  moveTopQueue: props.moveTopQueue};
	return (<ul className='list'>
		{!props.isListEmpty && <ListItemHeader/>}
		{props.isListEmpty && <li className='row'>רשימת ההמתנה ריקה</li>}
		{props.data && props.data.map(entry => <ListItem itemData={entry} key={entry.id} date={props.date} {...actions} />)}
	</ul>);
}

export default MonitorAdmin;
