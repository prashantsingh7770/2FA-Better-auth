"use client"

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client"
import { router } from "better-auth/api";
import { useRouter } from "next/navigation";

const SignOutButton = () => {

const router=useRouter();
const signOut = async()=>{
    authClient.signOut();
    router.push("/")
}

  return (
    <div>
      <Button className="bg-red-600 text-white w-full" size="lg"  onClick={signOut}>
Sign Out
      </Button>
    </div>
  )
}

export default SignOutButton
