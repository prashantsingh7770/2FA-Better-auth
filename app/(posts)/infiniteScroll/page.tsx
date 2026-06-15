"use client"

import { Button } from "@/components/ui/button"
import { useInfiniteQuery } from "@tanstack/react-query"
import axios from "axios"
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

type Fruit = {
  id: number
  name: string
  color: string
  price: number
  stock: boolean
}

const fetchData = async (page: number): Promise<Fruit[]> => {
  const res = await axios.get(
    `http://localhost:4000/fruits?_limit=4&_page=${page}`
  )
  return res.data
}

const Page = () => {



    const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["fruits"],
    queryFn: ({ pageParam }) => fetchData(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 4) return undefined
      return allPages.length + 1
    },
  })

const { ref, inView } = useInView({
  rootMargin: "200px",
})

useEffect(() => {
  if (inView && hasNextPage && !isFetchingNextPage) {
    fetchNextPage()
  }
}, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])


  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error occurred</p>

  return (
    <div >

      {data?.pages.map((page, index) => (
        <div key={index}>
          {page.map((item) => (
            <div
              className="flex justify-center items-center w-full"
              key={item.id}
            >
              <div className="bg-gray-600 p-4 w-xl rounded-xl m-4">
                <h3 className="text-white">{item.name}</h3>
                <p className="text-white">{item.color}</p>
                <p className="text-white">₹{item.price}</p>
                <p className="text-white">
                  {item.stock ? "In Stock" : "Out of Stock"}
                </p>
              </div>
            </div>
          ))}
        </div>
      ))}
      <div ref={ref}>{isFetchingNextPage && <h1>Is fetching next page: {isFetchingNextPage.toString()}</h1>}</div>


    </div>
  )
}

export default Page