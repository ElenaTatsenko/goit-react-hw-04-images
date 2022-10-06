import React, { useEffect } from "react"
import css from './Modal.module.css';
import {createPortal} from 'react-dom'
import PropTypes from 'prop-types';

const modalRoot = document.querySelector("#modal-root")

export default function Modal({onClose, children}) {
    
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, );
    
    const handleKeyDown = (event) => {
        if (event.code === 'Escape') {
            onClose();
        console.log('esc')

        }
    };

    const handleBackdropClick = (event) => {
        if (event.currentTarget === event.target) {
            onClose();
        }
    }
     return createPortal(
            <div className={css.Backdrop} onClick={handleBackdropClick}>
            <div className={css.Modal}>
                {children}
        </div>
    </div>, modalRoot,
        ) 


 }  



Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
}

