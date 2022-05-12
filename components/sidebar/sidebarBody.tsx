import { collection, onSnapshot, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useAuth } from "context/authContext"
import { useContacts } from "context/contactsContext"
import { db } from "firebaseConfig"
import SidebarChat from "./sidebarChat"


function SidebarBody() {
    const { currentUser } = useAuth()
    const { setContacts } = useContacts()
    const [chats, setChats] = useState<any[]>([])

    useEffect(() => {
        if (!currentUser) return

        const chatsRef = collection(db, "chats")
        const chatsQuery = query(chatsRef, where("users", "array-contains", currentUser.email))
        const unSubscribe = onSnapshot(chatsQuery, snapshot => {

            const chatsSnapshot: any[] = []
            snapshot.forEach(chatSnapshot => {
                chatsSnapshot.push({ ...chatSnapshot.data(), id: chatSnapshot.id })
            })
            const sortedChats = chatsSnapshot.sort((a, b) => (a?.timestamp?.seconds < b?.timestamp?.seconds) ? 1 : -1)

            setChats(sortedChats)
            setContacts(sortedChats)

        }, e => console.error(e))

        return unSubscribe

    }, [currentUser, setContacts])


    return (
        <div className="flex-1 overflow-y-scroll bg-white scrollbarHide">
            {chats.map((chat, key) => (
                <SidebarChat key={key} id={chat.id} users={chat.users} />
            ))}
        </div>
    )
}

export default SidebarBody