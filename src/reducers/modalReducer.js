import { SHOW_MODAL, HIDE_MODAL } from '../constants/ActionTypes'

const INITIAL_STATE = { modalType: null};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SHOW_MODAL:
      return { ...state, modalType: action.modalType };
    case HIDE_MODAL:
      return INITIAL_STATE;
    default:
      return state;
  }
}
