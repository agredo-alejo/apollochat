import { createContext, useContext, useState } from "react"


const ContactsContext = createContext<any>(null)

export function useContacts() {
    return useContext(ContactsContext)
}

export function ContactsProvider({ children }: any) {
    const [contacts, setContacts] = useState<any[]>([])
    const [chatID, setChatID] = useState("")
    const [showSidebar, setShowSidebar] = useState(true)
    const [otherUserEmail, setOtherUserEmail] = useState<string[]>([])



    const value = {
        contacts,
        setContacts,
        chatID,
        setChatID,
        showSidebar,
        setShowSidebar,
        otherUserEmail,
        setOtherUserEmail
    }

    return (
        <ContactsContext.Provider value={value}>
            {children}
        </ContactsContext.Provider>
    )
}

