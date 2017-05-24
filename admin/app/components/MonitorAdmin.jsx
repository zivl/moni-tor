import React, {Component} from 'react';

var interval;

class MonitorAdmin extends Component {
	state = {
		showModal: false,
		date: new Date()
	};

	componentDidMount() {
		this.props.fetchQueue();
		this.setState({date: new Date()});
		interval = setInterval(()=>this.fetchQueue(),10000);
	}
	componentWillUnmount() {
		clearInterval(interval);
	}

	fetchQueue() {
		this.props.fetchQueue();
		this.setState({date: new Date()});
	}

	addPatient(data) {
		this.props.addPatient(data);
		this.closeModal();
	}

	closeModal() {
		this.setState({showModal: false});
	}

	openModal() {
		this.props.clearPatientData();
		this.setState({showModal: true});
	}

	render() {
		return (
			<div>
				<div className='logo-container'>
					<div className='logo'></div>
					<div className='date'>{this.state.date.getDate() + '.' + (this.state.date.getMonth() + 1) + '.' + this.state.date.getFullYear()}<span className='sproket'> | </span>{this.state.date.toTimeString().substring(0,5)}</div></div>
				<div className='content'>
					<div className='main-actions'>
						<div className='tooltip-button'>
							<button className='add-patient-button' onClick={() => this.openModal()} />
							<div className='tooltip'>הוסיפי מטופלת</div>
						</div>
						<button disabled={this.props.isListEmpty} onClick={this.props.invitePatient} className='summon-button'>זמני את הבאה בתור</button>
					</div>
					<List {...this.props} />
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
		let {fullName, id, phone, errorText} = this.props;
		return (<div className='modal'>
			<div className='modal-header'>
				<h1 className='modal-header-text'>הוספת מטופלת</h1>
			</div>
			<div className='modal-content'>
				<div className='errors-area'>
				{errorText.map((text) => <div className='error' key={text}>{text}</div>)}
				</div>
				<div className='fields'>
					<div className='field'>
						<label>שם המטופלת</label>
						<input type='text' id='fullName' name='fullName' value={fullName} onChange={(e) => this.props.updatePatientData({fullName: e.target.value})}/>
					</div>
					<div className='field'>
						<label>ת.ז.</label>
						<input type='text' maxLength='9' id='name' name='id' value={id}  onChange={(e) => this.props.updatePatientData({id: e.target.value})} />
					</div>
					<div className='field'>
						<label>מספר טלפון</label>
						<input type='text' id='phone' name='phone' value={phone}  onChange={(e) => this.props.updatePatientData({phone: e.target.value})}/>
					</div>
				</div>
			</div>
			<div className='modal-buttons'>
				<div className='modal-main-actions'>
					<button className='modal-button cancel' onClick={this.props.closeModal} >ביטול</button>
					<button className='modal-button' onClick={()=>this.props.addPatient({fullName, id, phone})} disabled={!this.props.addEnabled}>הוספה</button>
				</div>
			</div>
		</div>);
	}
}
const ListItem = (props) => {
	const {itemData : {fullName, id, phone, registrationTime, notificationTime, token, diffMin}} = props;
	let timeClass = '';
	if ((diffMin >= 60) && (!notificationTime)) { //60min
		timeClass = 'red';
	} else if ((diffMin >= 30) && (!notificationTime)) {//30min
		timeClass = 'orange';
	}
	return(<li className='row'>
		<div className='big-col align'>{fullName}</div>
		<div className='big-col align'>{id}</div>
		<div className='big-col phone-number align'>{phone}</div>
		<div className='big-col align'>{new Date(registrationTime).toTimeString().substring(0,5)}</div>
		{token && <div className={timeClass + ' small-col align'}>{notificationTime ? 'הזמנה נשלחה' : 'ממתינה'}</div>}
		{!token && <div className={timeClass + ' small-col align'}>{notificationTime ? 'נא ליצור קשר' : 'ממתינה'}</div>}
		<div className='huge-col flex-col'>
			<div className='action remove'  onClick={()=>props.removeFromQueue(id)} >הסירי מהרשימה</div>
			{notificationTime ?  <div className='action arrived'  onClick={()=>props.removeFromQueue(id)} >אשרי הגעת המטופלת</div> : <div className='action top' onClick={()=>props.moveTopQueue(id)}> הקפיצי לראש הרשימה</div> }

		</div>
	</li>);
};

const ListItemHeader = () => {
	return(<li key='header-key' className='row header'>
		<div className='col-title big-col'>שם המטופלת</div>
		<div className='col-title big-col'>תעודת זהות</div>
		<div className='col-title big-col'>טלפון</div>
		<div className='col-title big-col'>שעת הבקשה</div>
		<div className='col-title small-col'>סטטוס</div>
		<div className='col-title huge-col'>פעולות</div>
	</li>);
};

const List = (props) => {
	const actions = {invitePatient: props.invitePatient, removeFromQueue: props.removeFromQueue,  moveTopQueue: props.moveTopQueue};
	return (<ul className='list'>
		{!props.isListEmpty && <ListItemHeader/>}
		{props.isListEmpty && <li className='row empty'>רשימת ההמתנה ריקה</li>}
		{props.data && props.data.map(entry => <ListItem itemData={entry} key={entry.id} {...actions} />)}
	</ul>);
};

export default MonitorAdmin;
