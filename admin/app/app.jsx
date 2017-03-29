import React from 'react';
import ReactDOM from 'react-dom';
import MonitorAdmin from './components/MonitorAdmin.js';
import Application from './Application.jsx';
import './resources/scss/style.scss';

ReactDOM.render(<Application><MonitorAdmin/></Application>, document.getElementById('app'));
