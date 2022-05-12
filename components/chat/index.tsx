import { useAuth } from "context/authContext"
import { useContacts } from "context/contactsContext"
import { doc, DocumentData, onSnapshot } from "firebase/firestore"
import { db } from "firebaseConfig"
import { useEffect, useState } from "react"
import getRecipientEmail from "utils/getRecipientEmail"
import ChatBody from "./chatBody"
import ChatFooter from "./chatFooter"
import ChatHeader from "./chatHeader"


function Chat() {
  const { chatID, setOtherUserEmail } = useContacts()
  const { currentUser } = useAuth()

  useEffect(() => {
    const chatRef = doc(db, "chats", chatID)
    const unSubscribe = onSnapshot(chatRef, snapshot => {
      if (!snapshot.exists()) return

      setOtherUserEmail(
        getRecipientEmail(snapshot.data().users, currentUser)
      )
    })
    return unSubscribe

  }, [chatID, currentUser, setOtherUserEmail])

  return (
    <div className="flex flex-col flex-1 overflow-auto">
      <ChatHeader />
      <ChatBody />
      <ChatFooter />
    </div>
  )
}

export default Chat