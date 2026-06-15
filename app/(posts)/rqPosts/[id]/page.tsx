"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";

export default function Page() {
      const params = useParams();

    const fetchTodoById = async () => {
        const response = await axios.get(`http://localhost:4000/todos/${params.id}`)
        return response.data
    }

  const {data,isLoading, isError, } = useQuery({
    queryKey: ["posts", params.id],
    queryFn:fetchTodoById
  })
console.log(data)

const {id,title,completed} = data || {id:0,title:"",completed:false}



  return (
    <>
    <h1>Post ID: {id}</h1>
    <p>Title: {title}</p>
    <p>Completed: {completed.toString()}</p>
    </>
  )
}