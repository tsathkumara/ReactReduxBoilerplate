import { FETCH_GENERAL_INFO } from '../constants/ActionTypes'

const INITIAL_STATE = { general_info: null};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_GENERAL_INFO:
      return { ...state, general_info: action.payload.data };
    default:
      return state;
  }
}
