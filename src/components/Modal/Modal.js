import React, { Component } from 'react';
import './modal.css';

class Modal extends Component {

  listenKeyboard(event) {
  if (event.key === 'Escape' || event.keyCode === 27) {
      this.props.onClose();
    }
  }

  componentDidMount() {
    if (this.props.onClose) {
      window.addEventListener('keydown', this.listenKeyboard.bind(this), true);
    }
  }

  componentWillUnmount() {
    if (this.props.onClose) {
      window.removeEventListener('keydown', this.listenKeyboard.bind(this), true);
    }
  }

  onOverlayClick() {
    this.props.onClose();
  }

  onDialogClick(event) {
    event.stopPropagation();
  }

  get title () {
    const { title } = this.props;

    return title ? (
      <div className='modal__title'>
        <h1>{title}</h1>
      </div>
    ) : null;
  }

  get close () {
    const { onClose } = this.props;

    return onClose ? (
      <div className='modal__close' onClick={onClose} />
    ) : null;
  }

  render() {
    const overlayStyle = this.props.overlayStyle ? this.props.overlayStyle : {};
    const contentStyle = this.props.contentStyle ? this.props.contentStyle : {};
    const dialogStyle = this.props.dialogStyle ? this.props.dialogStyle : {};
    return (
      <div>
        <div className="modal-overlay-div" style={overlayStyle}></div>
        <div className="modal-content-div" style={contentStyle} onClick={this.onOverlayClick.bind(this)}>
          <div className="modal-dialog-div" style={dialogStyle} onClick={this.onDialogClick}>
            {this.props.children}
        </div>
        </div>
      </div>



    );
  }
}

export default Modal;
