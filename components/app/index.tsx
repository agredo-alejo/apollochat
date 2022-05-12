import { doc, serverTimestamp, setDoc } from "firebase/firestore"
import { useEffect } from "react"
import { useAuth } from "context/authContext"
import { useContacts } from "context/contactsContext"
import { db } from "firebaseConfig"
import Chat from "components/chat"
import Sidebar from "components/sidebar"

function AppBody() {
    const { currentUser } = useAuth()
    const { chatID } = useContacts()


    useEffect(() => {
        if (!currentUser) return


        async function setUser() {
            const userRef = doc(db, "users", currentUser.uid)

            await setDoc(userRef,
                {
                    email: currentUser.email,
                    lastSeen: serverTimestamp(),
                    photoURL: currentUser.photoURL,
                    name: currentUser.displayName
                },
                {
                    merge: true
                })

        }
        setUser()



    }, [currentUser])

    return (
        <div className="flex w-full h-screen  shadow-[0_0_.1rem_lightgray] sm:w-[90vw] sm:h-[90vh] ">
            <Sidebar />
            
            {chatID.length < 5 ?
                <NoOpenChat /> :
                <Chat />
            }

        </div>
    )
}
function NoOpenChat() {
    return (
        <div className="flex items-center justify-center flex-1 overflow-auto">
            {"Let's Chat!"}
        </div>
    )
}

export default AppBody