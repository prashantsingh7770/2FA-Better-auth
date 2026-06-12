// "use client"

// import { useEffect, useState } from "react"

// // import { useQuery } from '@tanstack/react-query'
// // const fetchTodoList = async () => {
// //   const response = await fetch('https://jsonplaceholder.typicode.com/todos')
// //   if (!response.ok) {
// //     throw new Error('Network response was not ok')
// //   }
// //   return response.json()
// // }

// // function page() {
// //   const { isPending, isError, data, error } = useQuery({
// //     queryKey: ['todos'],
// //     queryFn: fetchTodoList,
// //   })

// //   if (isPending) {
// //     return <span>Loading...</span>
// //   }

// //   if (isError) {
// //     return <span>Error: {error.message}</span>
// //   }

// //   // We can assume by this point that `isSuccess === true`
// //   return (
// //     <ul>
// //       {data.map((todo: {userId: number, id: number, title: string, body: string}) => (
// //         <li key={todo.id}>{todo.title}</li>
// //       ))}
// //     </ul>
// //   )
// // }
// export default function page() {
//   const [todos, setTodos]=useState([])
//   const fetchTodoList=async()=>{
//     const response = await axios.get('https://localhost:4000/todos')
//     if (!response.ok) {
//       throw new Error('Network response was not ok')
//     }
//     return response
//   }
//   useEffect( ()=>{
//     fetchTodoList().then(data=>setTodos(data)).catch(error=>console.error(error))
//   },[])

//   return (
//     <div>
//       <h1>Posts</h1>
//       <p>This is the posts page.</p>
//       <ul>
//         {todos.map((item :{id,title,completed})=>(
//           <li key={item.id}>{item.title} - {item.completed ? 'Completed' : 'Pending'}</li>
//         ))}
//       </ul>
//     </div>
//   )
// }


"use client"

import axios from "axios"
import { useEffect, useState } from "react"

type Todo = {
  id: number
  title: string
  completed: boolean
}

export default function Page() {
  const [todos, setTodos] = useState<Todo[]>([])

  const fetchTodoList = async (): Promise<Todo[]> => {
    const response = await axios.get("http://localhost:4000/todos")
    return response.data
  }

  useEffect(() => {
    fetchTodoList()
      .then((data) => setTodos(data))
      .catch((error) => console.error(error))
  }, [])

  return (
    <div>
      <h1>Posts</h1>

      <ul>
        {todos.map((item) => (
          <li key={item.id}>
            {item.title} - {item.completed ? "Completed" : "Pending"}
          </li>
        ))}
      </ul>
    </div>
  )
}