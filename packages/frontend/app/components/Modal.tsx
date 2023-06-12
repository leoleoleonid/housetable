"use client"
import React from "react";

interface ModalProps {
    modalOpen: boolean,
    setModelClose: () => void,
    children: React.ReactNode
}
const Modal: React.FC<ModalProps> = ({modalOpen, setModelClose, children}) => {
    return (
        <div  className={`modal ${modalOpen ? 'modal-open': ''}`}>
            <div className="modal-box relative">
                <label onClick={setModelClose} className="btn btn-sm btn-circle absolute right-2 top-2">
                    ✕
                </label>
                {children}
            </div>
        </div>
    )
}

export default Modal;