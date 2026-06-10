import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (<>
<div className="flex h-full my-auto justify-center items-center">
  <div className="flex flex-col bg-gray-100 text-black gap-6 p-20 rounded-2xl">
    <Button variant="destructive" className="inline-block "><Link href="/signin"> Sign In</Link></Button>
    <Button><Link href="/signup"> Sign Up</Link></Button>
    <Button><Link href="/dashboard"> Dashboard</Link></Button>
   
    
  </div>  
</div>
  </>
  );
}
