import React from 'react';
import { useHistory } from 'react-router-dom';

import CloseIcon from '@material-ui/icons/Close';
import './styles/Modal.css';


const Modal = (props: any) => {
    const history = useHistory();

    const exitHandler = () => {
        history.push('/');
    }

    return (
        <>
        {!props.hidden && (
            <>
            <div className={`modal__div ${props.divClass}`} style={props.style}>
            <button className="modal__exit" onClick={exitHandler}>
                <CloseIcon />
            </button>
            <header className={`modal__header ${props.headerClass}`}>
                <h2>{props.header}</h2>
            </header>
            <div className={`modal__content ${props.contentClass}`}>
                {props.children}
            </div>
            <footer className={`modal__footer ${props.footerClass}`}>
                {props.footer}
            </footer>
            </div>
            </>
        )}
        </>
    )

};

export default Modal;