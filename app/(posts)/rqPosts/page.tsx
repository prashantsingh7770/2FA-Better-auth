
"use client";

import { Button } from "@/components/ui/button";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

const Page = () => {
  const [title, setTitle] = useState("");

  const queryClient = useQueryClient();

  // ==========================
  // GET ALL TODOS
  // ==========================
  const fetchTodos = async (): Promise<Todo[]> => {
    const response = await axios.get(
      "http://localhost:4000/todos"
    );
    return response.data;
  };

  // ==========================
  // CREATE TODO
  // ==========================
  const addTodo = async (newTodo: {
    title: string;
    completed?: boolean;
  }) => {
    const response = await axios.post(
      "http://localhost:4000/todos",
      newTodo
    );

    return response.data;
  };

  // ==========================
  // UPDATE TODO
  // ==========================
  const updateTodo = async ({
    id,
    updatedTodo,
  }: {
    id: number;
    updatedTodo: {
      title?: string;
      completed?: boolean;
    };
  }) => {
    const response = await axios.put(
      `http://localhost:4000/todos/${id}`,
      updatedTodo
    );

    return response.data;
  };

  // ==========================
  // DELETE TODO
  // ==========================
  const deleteTodo = async (id: number) => {
    await axios.delete(
      `http://localhost:4000/todos/${id}`
    );
  };

  // ==========================
  // QUERY
  // ==========================
  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  // ==========================
  // ADD MUTATION
  // ==========================
  const { mutate: addTodoMutation } = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      setTitle("");
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });

  // ==========================
  // UPDATE MUTATION
  // ==========================
  const { mutate: updateTodoMutation } = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });

  // ==========================
  // DELETE MUTATION
  // ==========================
  const { mutate: deleteTodoMutation } = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!title.trim()) return;

    addTodoMutation({
      title,
      completed: false,
    });
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error occurred</p>;

  return (
    <div className="px-3">
      {/* ADD TODO */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-4 mb-6"
      >
        <input
          type="text"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          placeholder="Enter todo title"
          className="p-3 px-5 border border-black rounded-xl flex-1"
        />

        <Button type="submit">
          Add Todo
        </Button>
      </form>

      {/* TODO LIST */}
      {data?.map((item) => (
        <div
          className="group mb-4"
          key={item.id}
        >
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-md hover:shadow-xl transition-all">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">
                {item.title}
              </h3>

              <div className="flex gap-2">
                {/* EDIT */}
                <Button
                  variant="outline"
                  onClick={() => {
                    const newTitle = prompt(
                      "Enter new title",
                      item.title
                    );

                    if (
                      !newTitle ||
                      !newTitle.trim()
                    )
                      return;

                    updateTodoMutation({
                      id: item.id,
                      updatedTodo: {
                        title: newTitle,
                      },
                    });
                  }}
                >
                  Edit
                </Button>

                {/* TOGGLE COMPLETE */}
                <Button
                  variant="secondary"
                  onClick={() =>
                    updateTodoMutation({
                      id: item.id,
                      updatedTodo: {
                        completed:
                          !item.completed,
                      },
                    })
                  }
                >
                  {item.completed
                    ? "Undo"
                    : "Complete"}
                </Button>

                {/* DELETE */}
                <Button
                  variant="destructive"
                  onClick={() => {
                    const confirmed =
                      confirm(
                        "Delete this todo?"
                      );

                    if (confirmed) {
                      deleteTodoMutation(
                        item.id
                      );
                    }
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>

            <div className="mt-4">
              <span
                className={`px-4 py-1 rounded-full text-sm font-semibold ${item.completed
                    ? "bg-green-100 text-green-700"
                    : "bg-orange-100 text-orange-700"
                  }`}
              >
                {item.completed
                  ? "✓ Completed"
                  : "⏳ Pending"}
              </span>
            </div>

            <div className="mt-4 border-t border-gray-100 pt-3">
              <Link
                href={`/rqPosts/${item.id}`}
              >
                <p className="text-gray-500 text-sm">
                  Click to view todo details →
                </p>
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* MANUAL REFETCH */}
      <div className="w-full flex justify-center pt-5">
        <Button
          onClick={() => refetch()}
          className="bg-red-600 px-10 py-2 text-white"
        >
          Refetch
        </Button>
      </div>
    </div>
  );
};

export default Page;

