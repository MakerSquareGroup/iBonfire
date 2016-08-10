import { UPDATE_USER_BIO } from '../actions/profile';

const initialState = {
	bio: ''
}

export default(state = initialState, action) => {
	switch(action.type){
		case 'SAVE_USER_BIO':
			return { ...state, bio: action.bio}
	}
	return state;
}