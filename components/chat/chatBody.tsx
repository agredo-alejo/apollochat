import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useRef, useState } from 'react'
import { useAuth } from 'context/authContext'
import { useContacts } from 'context/contactsContext'
import { db } from 'firebaseConfig'
import Message from './message'


function ChatBody() {
    const { chatID } = useContacts()
    const { currentUser } = useAuth()
    const [messages, setMessages] = useState<any[]>([])
    const scrollRef = useRef<HTMLSpanElement>(null)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const scroll = ()=>{
        scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    } 

    useEffect(() => {
        const messagesRef = collection(db, "chats", chatID, "messages")
        const messagesQuery = query(messagesRef, orderBy("timestamp"))

        const unSubscribe = onSnapshot(messagesQuery, snapshot => {
            const messagesDocs: any[] = []
            snapshot.forEach(message => {
                messagesDocs.push({ ...message.data(), id: message.id })
            })
            setMessages(messagesDocs)
            scroll()
        })

        return unSubscribe

    }, [chatID])

    useEffect(() => {
        const lastMessage = messages[messages.length - 1]
        if (lastMessage?.from !== currentUser.email) return

        scroll()

    }, [messages, currentUser, scroll])

    return (
        <div className='flex-1 overflow-scroll bg-[#d3d3d388] scrollbarHide px-3 pt-3 pb-1'>
            {messages.map((message, key) => (
                <Message key={key} message={message} />
            ))}
            <span ref={scrollRef}> </span>
        </div>
    )
}

export default ChatBody