"use client"
import { Button } from "@/components/ui/button";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

export default function page() {
    const queryClient = new QueryClient()
  return (
  <>
    <QueryClientProvider client={queryClient}>
<div className="flex h-full my-auto justify-center items-center">


</div>
  </QueryClientProvider>
  </>
  );
}
