"use client"

import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const page = () => {

// posts ["posts"]
//posts/1 ["posts",1]
//posts/1/comments ["posts",1,"comments"]

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

const fetchTodos = async() :Promise<Todo[]>=>{
  const response= await axios.get('http://localhost:4000/todos')
  return response.data
}

 const { data, isLoading, isError } = useQuery({
      queryKey: ["todos"],
      queryFn: fetchTodos
    })


  return (

   
    <div>
      react query posts
      {isLoading && <p>Loading...</p> }
      {isError && <p>Error occurred</p> }
      {data?.map((item :Todo)=>(
        <div key={item.id}>
          <h3>{item.title}</h3>
          <p>{item.completed ? 'Completed' : 'Pending'}</p>
        </div>
      ))}
    </div>
  )
}

export default page
