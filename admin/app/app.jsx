import React from 'react';
import ReactDOM from 'react-dom';
import DummyComponent from './components/DummyComponent.jsx';
import Application from './Application.jsx';
import './resources/scss/style.scss';

ReactDOM.render(<Application><DummyComponent/></Application>, document.getElementById('app'));