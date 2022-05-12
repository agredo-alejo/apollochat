import { useContacts } from "context/contactsContext"
import SidebarBody from "./sidebarBody"
import SidebarHeader from "./sidebarHeader"


function Sidebar() {
   const { showSidebar } = useContacts()

   return (
      <div className={`${showSidebar ? "flex" : "hidden"} sm:flex flex-col w-full  max-w-full sm:w-[25vw] sm:max-w-[30rem]`}>

         <SidebarHeader />
         <SidebarBody />

      </div>
   )
}

export default Sidebar