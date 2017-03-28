import {RestfulAPI} from 'restful-js';

let localDevConfig = {};
try {
	localDevConfig = require('../../devConfig.json');
} catch (e) {}
let devConfig = Object.assign({}, require('../../devConfig.defaults.json'), localDevConfig);

class RestAPIUtil extends RestfulAPI {

    handleRequest(url, type, options = {}, data){
		let prefixAPI = DEBUG ? devConfig.devProxyTarget : devConfig.target;
		return super.handleRequest(prefixAPI + url, type, options, data);
	}

}

export default new RestAPIUtil();