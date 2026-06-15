"use client"
import { Button } from "@/components/ui/button";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

  type fruit={
        id:number;
        name:string;
        color:string;
        price:number;
        stock:boolean;
    }

    const fetchFruits = async(page: number):Promise<fruit[]> =>{
       const res= await axios.get(`http://localhost:4000/fruits/?_limit=4&_page=${page}`)
        return res.data
    }

const page = () => {

    const [page,setPage]=useState<number>(1)
    const {data, isLoading, error} = useQuery(
        {
             queryKey: ["fruits", page],
            queryFn:()=>fetchFruits(page),
            placeholderData:keepPreviousData
        }
    )
    console.log(data)
  return (
    <div>
       {data?.map((item: fruit) => (
        <div className="flex justify-center items-center bg-black w-full" key={item.id}>
          <div className="bg-gray-600 p-4 w-xl  rounded-xl m-4" key={item.id}>
            <div key={item.id}>
              <h3 className="text-white">{item.name}</h3>
              <p className="text-white">{item.stock ? 'In Stock' : 'Out of Stock'}</p>

            </div>
          </div>
        </div>
      ))}
      
      <Button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
        Previous
      </Button>
      <Button onClick={() => setPage((prev) => prev + 1)} disabled={page === 5}>
        Next
      </Button>


    </div>
  )
}

export default page
