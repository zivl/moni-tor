
let counter = 0;

export default (state = {}, action) => {

	return {...state, count: counter++};
};
