import { collection, getDocs, limit, onSnapshot, onSnapshotsInSync, orderBy, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useAuth } from "context/authContext"
import { useContacts } from "context/contactsContext"
import { db } from "firebaseConfig"
import { FaUserCircle } from "react-icons/fa";
import getRecipientEmail from "utils/getRecipientEmail"
import Image from "next/image"

interface SidebarChatProps {
  id: string,
  users: string[]
}

function SidebarChat({ id, users }: SidebarChatProps) {
  const { currentUser } = useAuth()
  const { setChatID, setShowSidebar } = useContacts()
  const [lastMessage, setLastMessage] = useState<any>({})
  const [otherUser, setOtherUser] = useState<any>({})
  const otherUserEmail = getRecipientEmail(users, currentUser)
  

  useEffect(() => {
    const messagesRef = collection(db, "chats", id, "messages")
    const messagesQuery = query(messagesRef, orderBy("timestamp", "desc"), limit(1))
    const unSubscribe = onSnapshot(messagesQuery, snapshot => {
      snapshot.forEach(message => {
        setLastMessage({ ...message.data(), id: message.id })
      })
    })

    return unSubscribe
  }, [id])



  useEffect(() => {

    const usersRef = collection(db, "users")
    const userQuery = query(usersRef, where("email", "==", otherUserEmail))
    const unSubscribe = onSnapshot(userQuery, snapshot => {
      snapshot.forEach(user => {
        setOtherUser({ ...user.data(), id: user.id })
      })
    })

    return unSubscribe

  }, [id, users, currentUser, otherUserEmail])


  return (
    <div onClick={() => {
      setChatID(id)
      setShowSidebar(false)
    }}
      className="flex items-center px-2 py-3 overflow-x-hidden cursor-pointer border-b border-[#f6f6f6]">
      <span className="relative w-6 overflow-hidden text-gray-500 rounded-full aspect-square">
        {otherUser.photoURL ?
          <Image
            src={otherUser.photoURL}
            alt="Contact Profile Photo"
            layout="fill"
            objectFit="contain"
          />
          :
          <FaUserCircle />
        }
      </span>
      <div className="flex-1 ml-2 overflow-hidden text-sm">
        <h2 className="w-[90%] overflow-hidden text-ellipsis whitespace-nowrap"> {otherUser.name || otherUserEmail} </h2>
        <p className="w-[90%] overflow-hidden text-xs text-gray-500 text-ellipsis whitespace-nowrap "> {lastMessage.text || ""} </p>

      </div>
    </div>
  )
}

export default SidebarChat