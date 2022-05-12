import { addDoc, collection, getDocs, query, serverTimestamp, where } from "firebase/firestore"
import { FormEvent, useState } from "react"
import { useAuth } from "context/authContext"
import { useContacts } from "context/contactsContext"
import { db } from "firebaseConfig"
import { BiPlus } from 'react-icons/bi';

function AddContact({close}:any) {
    const { contacts } = useContacts()
    const { currentUser } = useAuth()
    const [newContact, setNewContact] = useState("")
    const chatsRef = collection(db, "chats")

    const closeHandler = () => {
        setNewContact("")
        close()
    }

    const contactAlreadyExist = (recipientEmail: string) => (

        !!contacts?.find(
            (chat: any) =>
                chat.users.find((user: string) =>
                    user == recipientEmail)?.length > 0
        )
    )

    async function addNewContact(e: FormEvent) {
        e.preventDefault()

        if (!newContact || newContact == "") return
        if (newContact == currentUser.email || contactAlreadyExist(newContact)) {
            closeHandler()
            return
        }
        const usersRef = collection(db, "users")
        const usersQuery = query(usersRef, where("email", "==", newContact))
        const usersSnapshot = await getDocs(usersQuery)
        if (usersSnapshot.empty) {
            closeHandler()
            return
        }



        await addDoc(chatsRef, {
            timestamp: serverTimestamp(),
            users: [currentUser.email, newContact]
        })
        closeHandler()
    }
    return (
        <div className="bg-white max-w-[50vw] p-4 rounded">
            <p className="max-w-[30ch]"> Enter an email adress for the user you wish to chat with </p>

            <form onSubmit={addNewContact} className="flex items-center">
                <input type="text" value={newContact} onChange={e => setNewContact(e.target.value)} className="outline-none text-[16px] border-b border-cyan-400 flex-1 m-1" />

                <button type="submit" className="p-1 bg-[#00aaff] rounded-full">
                    <BiPlus className="text-[1.2rem] text-white " />
                </button>
            </form>
        </div>
    )
}

export default AddContact