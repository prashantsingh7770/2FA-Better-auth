"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router=useRouter()

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await authClient.signIn .email({email,password},{
        async onSuccess(context){
            if(context.data.twoFactorRedirect){
                router.push("/two-factor")
            }else{
                router.push("/dashboard")
            }
        }
    })
    console.log({
      email,
      password,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-xl bg-white p-8 shadow-md"
      >
        <h1 className="mb-6 text-center text-3xl font-bold">Sign In</h1>

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
  );
}