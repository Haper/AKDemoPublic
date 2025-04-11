import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import './Modal.scss';

function Modal({ children, className }: { children: React.ReactNode, className?: string }) {
  return ReactDOM.createPortal(
    <div className={classNames("ModalMainContainer", className)}>
      {children}
    </div>,
    document.body
  );
}

export default Modal;
