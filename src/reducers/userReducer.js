import { FETCH_USERS, FETCH_USER } from '../constants/ActionTypes'

const INITIAL_STATE = { all: [], user: null, message: '', success:'', error: null};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_USER:
      return { ...state, user: action.payload.data };
    case FETCH_USERS:
      return { ...state, all: action.payload.data.objects };
    default:
      return state;
  }
}
