import React, { ReactNode, useRef } from 'react'
import { useClickOutside } from './clickOutside'

interface ModalProps {
    children: ReactNode | ReactNode[]
    show: boolean
    handleClose: () => void
}
function Modal({ children, show, handleClose }: ModalProps) {

    const modalRef = useRef(null)
    useClickOutside(modalRef, handleClose)

    if (!show) return <></>

    return (
        <div className='modal'>
            <span ref={modalRef}>
                {children}
            </span>
        </div>
    )
}

export default Modal