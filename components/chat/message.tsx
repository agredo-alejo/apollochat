import { useAuth } from "context/authContext"
import getTime from "utils/getTime"

interface MessageProps {
  message: {
    timestamp: any
    text: string
    from: any
  }
}
function Message({ message }: MessageProps) {
  const { currentUser } = useAuth()

  const reciever = currentUser.email === message.from

  const time = message?.timestamp?.toDate()

  return (
    <div className={`${reciever ? "ml-auto bg-[#dcf8c6]" : ""} relative flex flex-wrap p-2 mt-2 bg-white rounded w-max max-w-[90%]`}>
      <p className="max-w-xs mr-2 overflow-auto break-words"> {message.text || ""} </p>
      <span className="mt-auto ml-auto text-xs text-gray-500 whitespace-nowrap" > {getTime(time)} </span>
    </div>
  )
}

export default Message