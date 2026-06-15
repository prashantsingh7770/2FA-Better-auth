"use client"

import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import Link from "next/link";

const page = () => {

  // posts ["posts"]
  //posts/1 ["posts",1]
  //posts/1/comments ["posts",1,"comments"]

  type Todo = {
    id: number;
    title: string;
    completed: boolean;
  };

  const fetchTodos = async (): Promise<Todo[]> => {
    const response = await axios.get('http://localhost:4000/todos')
    return response.data
  }

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
    enabled: false, // Enable the query to run immediately
  })


  return (


    <div>
      <div className="w-full flex items-center justify-center pt-5" ><button onClick={() => refetch()} className="bg-red-600 px-10 py-2 text-white rounded-xl">Refetch</button></div>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error occurred</p>}
      {data?.map((item: Todo) => (
        <Link href={`/rqPosts/${item.id}`} key={item.id}>
        <div className="flex justify-center items-center bg-black w-full" key={item.id}>
          <div className="bg-gray-600 p-4 w-xl  rounded-xl m-4" key={item.id}>
            <div key={item.id}>
              <h3 className="text-white">{item.title}</h3>
              <p className="text-white">{item.completed ? 'Completed' : 'Pending'}</p>
            </div>
          </div>
        </div>
        </Link>
      ))}
    </div>
  )
}

export default page
