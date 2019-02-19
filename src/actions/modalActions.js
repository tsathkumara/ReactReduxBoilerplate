import { SHOW_MODAL, HIDE_MODAL } from '../constants/ActionTypes';

//= ===============================
// Modal actions
//= ===============================

export function loadModal(modalType) {
  return {
    type: SHOW_MODAL,
    modalType
  };
}

export function hideModal() {
  return {
    type: HIDE_MODAL
  };
}
