import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAuth } from '../context/authContext'
interface WithAuthProps {
    children:  JSX.Element
}

const WithAuth = ({ children }: WithAuthProps) => {
    const { currentUser } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (currentUser) return

        router.push('/login')

    }, [router, currentUser])

    if (!currentUser) {
        return <></>
    }

    return children
}

export default WithAuth