"use client"

import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation";
import { useState } from "react"


const page = () => {
    const [name,setName]=useState<string>("")
    const [email,setEmail]=useState<string>("")
    const [password,setPassword]=useState<string>("")
    const router=useRouter()

    const handleSubmit =async(e: React.FormEvent<HTMLFormElement>)=> {
    e.preventDefault();
    await authClient.signUp.email({name,email,password})
    router.push("/signin")

    console.log({
      email,
      password,
    });
  };



  return (
    <div className="w-xl  flex items-center justify-center mx-auto p-15 rounded-2xl">
        <form onSubmit={handleSubmit}> 
        <input
          type="text"
          placeholder="Name"
          className="mb-4 w-full rounded-md border p-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="mb-4 w-full rounded-md border p-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="mb-4 w-full rounded-md border p-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full rounded-md bg-blue-600 py-3 text-white hover:bg-blue-700"
        >
          Sign In
        </button>

        </form>
      
    </div>
  )
}

export default page
