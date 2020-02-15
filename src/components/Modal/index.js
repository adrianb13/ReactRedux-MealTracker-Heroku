import React from "react";

import "./modal.css";

class Modal extends React.Component {
  render () {
    const showHide = this.props.modal ? "modal modalDisBl" : "modal modalDisNone";
    return (
      <div className={showHide}>
        <div className="modal-main">
          <div className="modalTxt">{this.props.modalText}</div>
          <div className="modalBtnBox">
            <div className="modalBtn yes" onClick={this.props.delete} >Yes</div>
            <div className="modalBtn no" onClick={this.props.confirm} >No</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Modal;