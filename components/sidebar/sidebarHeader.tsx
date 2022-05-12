import AddContact from "./addContact"
import { FaUserCircle } from "react-icons/fa";
import { BiPlus } from 'react-icons/bi';
import { FiLogOut } from "react-icons/fi";
import Modal from "utils/modal";
import { useState } from "react";
import { useAuth } from "context/authContext";
import Image from "next/image";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "firebaseConfig";

function SidebarHeader() {
    const [showModal, setShowModal] = useState(false)
    const { currentUser, logout } = useAuth()
    const closeModal = () => setShowModal(false)


    async function subscribe() {
        const registration = await navigator.serviceWorker.ready

        const push = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: "BMl2wze8OvCL5IQLE982ccCsLqdzueQPO7mLqvKjAL_w5Pk1ZC7-MwpE2mTDOX83Ql3L3sWN4giD7UwPaOwx69M"
        })

        const pushSubscription = JSON.stringify(push)
        
        const userRef = doc(db, "users", currentUser.uid)
        const userSnapshot = await getDoc(userRef)
        if(!userSnapshot.exists()) return

        const pushSubscriptions: string[] = userSnapshot.data().pushSubscriptions || []
        pushSubscriptions.push(pushSubscription)

        await updateDoc(userRef, {
            pushSubscriptions
        })
    }


    return (<>

        <Modal handleClose={closeModal} show={showModal}>
            <AddContact close={closeModal} />
        </Modal>

        <div className="flex justify-between text-[1.5rem] text-gray-500 p-3">
            <span onClick={subscribe}
                className="relative flex overflow-hidden rounded-full cursor-pointer w-7 aspect-square">
                {currentUser.photoURL ?
                    <Image
                        src={currentUser.photoURL}
                        alt="profile photo"
                        layout="fill"
                        objectFit="contain" /> :
                    <FaUserCircle />
                }
            </span>
            <div className="flex mr-2 ">
                <BiPlus onClick={() => setShowModal(true)} className="cursor-pointer" />

                <FiLogOut className="ml-2 cursor-pointer" onClick={logout} />
            </div>
        </div>
    </>)
}

export default SidebarHeader