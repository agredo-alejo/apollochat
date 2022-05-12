import { FaUserCircle } from "react-icons/fa";
import { BiLeftArrowAlt } from "react-icons/bi";
import { useEffect, useState } from "react";
import { useContacts } from "context/contactsContext";
import { collection, doc, DocumentData, onSnapshot, query, where } from "firebase/firestore";
import { db } from "firebaseConfig";
import getRecipientEmail from "utils/getRecipientEmail";
import { useAuth } from "context/authContext";
import getTime from "utils/getTime";
import getDate from "utils/getDate";
import Image from "next/image";

function ChatHeader() {
   const { chatID, setShowSidebar, otherUserEmail } = useContacts()
   const { currentUser } = useAuth()
   const [otherUser, setOtherUser] = useState<any>()
   const [lastSeen, setLastSeen] = useState("")


   useEffect(() => {
      const usersRef = collection(db, "users")
      const userQuery = query(usersRef, where("email", "==", otherUserEmail))
      const unSubscribe = onSnapshot(userQuery, snapshot => {
         let userData: any
         snapshot.forEach(user => {
            userData = { ...user.data(), id: user.id }
            setOtherUser(userData)


            const lastSeenDate = userData?.lastSeen?.toDate()
            setLastSeen(`${getTime(lastSeenDate)}${getDate(lastSeenDate)}`)
         })
      })

      return unSubscribe

   }, [otherUserEmail])

   return (
      <div className="flex items-center p-1 text-gray-500 border-l ">

         <div onClick={() => setShowSidebar(true)} className="flex items-center mr-2 cursor-pointer" >
            <BiLeftArrowAlt className="flex text-2xl sm:hidden" />
            <span className="relative overflow-hidden rounded-full w-7 aspect-square sm:ml-2">
               {otherUser?.photoURL ?
                  <Image
                     src={otherUser.photoURL}
                     alt="Contact Profile Photo"
                     layout="fill"
                     objectFit="contain" />
                  :
                  <FaUserCircle className="w-full h-full" />
               }
            </span>
         </div>

         <div >
            <h3 className="text-black "> {otherUser?.name || otherUserEmail} </h3>
            <p className="text-sm ">Last seen at {lastSeen} </p>
         </div>

      </div>
   )
}

export default ChatHeader