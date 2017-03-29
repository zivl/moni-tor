import React, {Component} from 'react';

var interval;
class MonitorAdmin extends Component {
	state = {
		showModal: false
	}

	componentDidMount() {
		this.props.fetchQueue();
		interval = setInterval(this.props.fetchQueue,60000);
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
					<div className='main-actions'><button onClick={this.props.invitePatient}>זמן את הבאה בתור</button>
						<button onClick={() => this.setState({showModal: true})} >הוסף מטופלת לרשימה</button>
					</div>
					<List {...this.props}></List>
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
			<button onClick={()=>this.props.addPatient({fullName, id, phone})} disabled={!this.props.addEnabled}>אישור</button>
			<button onClick={this.props.closeModal} >ביטול</button>
		</div>);
	}
}
const ListItem = (props) => {
	const {itemData : {fullName, id, phone, registrationTime, notificationTime}} = props;
	return(<li className='row'>
		<div className='big-col'>{fullName}</div>
		<div className='big-col'>{id}</div>
		<div className='big-col phone-number'>{phone}</div>
		<div className='small-col'>{registrationTime}</div>
		<div className='small-col'>{notificationTime ? 'הזמנה נשלחה' : 'ממתינה'}</div>
		<div className='big-col flex-col'>
			{notificationTime ?  <div className='arrived'  onClick={()=>props.removeFromQueue(id)} >המטופלת הגיעה</div> : <div ></div> }
			<div className='remove'  onClick={()=>props.removeFromQueue(id)} >remove</div>
			<div className='top' onClick={()=>props.moveTopQueue(id)}>top</div>
		</div>
	</li>);
}

const ListItemHeader = (props) => {
	return(<li key='header-key' className='row'>
		<div className='big-col'>שם המטופלת</div>
		<div className='big-col'>תעודת זהות</div>
		<div className='big-col'>טלפון</div>
		<div className='small-col'>שעת הבקשה</div>
		<div className='small-col'>סטטוס</div>
		<div className='big-col'>פעולות</div>
	</li>);
}

const List = (props) => {
	const actions = {invitePatient: props.invitePatient, removeFromQueue: props.removeFromQueue,  moveTopQueue: props.moveTopQueue};
	return (<ul className='list'>
		<ListItemHeader/>
		{props.data && props.data.map(entry => <ListItem itemData={entry} key={entry.id}  {...actions} />)}
	</ul>);
}

export default MonitorAdmin;
