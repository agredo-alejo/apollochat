import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useAuth } from "../context/authContext"


function Login() {
   const { loginWithGoogle, currentUser } = useAuth()
   const router = useRouter()
   
   useEffect(() => {

      if (currentUser){  
         router.push("/")
      }

   }, [router, currentUser])

   return (
      <div className="w-full h-screen bg-[whitesmoke] flex items-center justify-center flex-col">
         <Head>
            <title>Login</title>
         </Head>

         <h2 className="mb-4 text-xl">Welcome to Apollo Chat!</h2>

         <div className="flex p-4 bg-white rounded shadow-md cursor-pointer hover:scale-[1.02]">

            <button onClick={loginWithGoogle}
               className="flex">

               <span className="relative flex w-6 mr-4 aspect-square">
                  <Image
                     src="/googleIcon.png"
                     alt="Google icon"
                     layout="fill"
                     objectFit="contain"
                     priority={true}
                  />
               </span>

               <p> Continue with Google </p>

            </button>

         </div>
      </div>
   )
}

export default Login