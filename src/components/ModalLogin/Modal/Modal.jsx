import React, { useState } from 'react';
import ModalLogin from '../ModalLogin';

function Modal({ children }) {
    const [open, setOpen] = useState(true)
    const handleOpenModal = () => {
        setOpen(false)
    };
    return <div onClick={handleOpenModal}>{children}
        <ModalLogin open={open}/>
    </div>;
}

export default Modal;
