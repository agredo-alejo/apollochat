import { addDoc, collection, doc, serverTimestamp, setDoc } from "firebase/firestore"
import { useRef, useState } from "react"
import { useAuth } from "context/authContext"
import { useContacts } from "context/contactsContext"
import { db } from "firebaseConfig"
import { IoSend } from "react-icons/io5"

function ChatFooter() {
  const [message, setMessage] = useState("")
  const { currentUser } = useAuth()
  const { chatID, otherUserEmail } = useContacts()
  const input = useRef<HTMLDivElement>(null)
  const messagesRef = collection(db, "chats", chatID, "messages")
  const chatRef = doc(db, "chats", chatID)
  const userRef = doc(db, "users", currentUser.uid)



  async function sendMessage() {

    if (message === "") return
    if (!input.current) return

    input.current.focus()
    input.current.innerText = ""


    const displayName: string[] = currentUser.displayName.split(" ")
    const senderName = `${displayName[0]} ${displayName[1]}`

    const messageData = {
      from: currentUser.email,
      senderName: senderName,
      to: otherUserEmail || "",
      text: message,
      timestamp: serverTimestamp()
    }
    setMessage("")


    await addDoc(messagesRef, messageData)
    await setDoc(chatRef,
      {
        timestamp: serverTimestamp()
      },
      {
        merge: true
      }
    )

    await setDoc(userRef,
      {
        email: currentUser.email,
        lastSeen: serverTimestamp(),
        photoURL: currentUser.photoURL,
        name: currentUser.displayName
      },
      {
        merge: true
      }
    )


  }
  return (
    <div className="flex bg-[whitesmoke] p-1 items-center shadow-[0_-.05rem_.1rem_lightgray]">
      <div className="flex flex-1 mx-2 bg-white rounded">

        <div ref={input}
          contentEditable={true}
          suppressContentEditableWarning={true}
          onKeyDown={e => {
            if (e.key !== "Enter") return
            e.preventDefault()
            sendMessage()
            
          }}
          onInput={e => {
            setMessage(e.currentTarget.textContent || "")
          }}
          className="outline-none  text-[16px] h-fit max-h-20 max-w-xs overflow-y-scroll scrollbarHide flex-1 p-1 leading-4 break-words "
        > </div>
      </div>
      <button onClick={sendMessage}
        className="flex items-center justify-center p-2 mt-auto mr-1 bg-green-700 rounded-full aspect-square w-fit h-fit"
      >
        <IoSend className="flex text-sm text-white" />
      </button>
    </div>
  )
}

export default ChatFooter