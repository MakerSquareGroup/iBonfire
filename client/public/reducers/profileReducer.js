import { UPDATE_USER_BIO } from '../actions/profile';
import { CHANGE_POPUP_CLASS } from '../actions/profile';
import { CHANGE_POPUP_DATA } from '../actions/profile';

const initialState = {
	bio: '',
	popupClass: '',
	popupData: ''
}

export default(state = initialState, action) => {
	switch(action.type){
		case UPDATE_USER_BIO:
			return { ...state, bio: action.bio}
		case CHANGE_POPUP_CLASS:
			return {...state, popupClass: action.bonfireClass}
		case CHANGE_POPUP_DATA:
			return {...state, popupData: action.bonfireData}
	}
	return state;
}