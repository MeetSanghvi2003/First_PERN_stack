import React, { FC, useEffect, useState } from "react";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./state/hooks";
import { fetchTodos, postTodo } from "./state/TodoSlice";
import Todo from "./Todo";

const App: FC = () => {
  const [desc, setDesc] = useState<string>("");
  const [editdesc, setEditDesc] = useState<string>("");
  const [id, setID] = useState<string>("");
  const { isLoading, todos } = useAppSelector((state) => state.todos);
  const dispatch = useAppDispatch();
  useEffect(() => {
    // eslint-disable-next-line
    dispatch(fetchTodos());
    // eslint-disable-next-line
  }, []);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(postTodo({ description: desc }));
    setDesc("");
    setTimeout(() => {
      dispatch(fetchTodos());
    }, 100);
  };

  const onUpdate = (todo_id: string) => {
    const dropdown = document.querySelector(".dd-form");
    dropdown?.classList.add("dropdown");
    // eslint-disable-next-line
    todos.map((todo) => {
      if (todo.todo_id === todo_id) {
        setEditDesc(todo.description);
      }
    });
    setID(todo_id);
  };

  const onEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`http://localhost:5000/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ description: editdesc }),
    });
    const dropdown = document.querySelector(".dd-form");
    setTimeout(() => {
      dropdown?.classList.remove("dropdown");
      dispatch(fetchTodos());
    }, 100);
  };
  const Close = () => {
    const dropdown = document.querySelector(".dd-form");
    dropdown?.classList.remove("dropdown");
  };
  const onDelete = async (todo_id: string) => {
    await fetch(`http://localhost:5000/todos/${todo_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    setTimeout(() => {
      dispatch(fetchTodos());
    }, 100);
  };

  return (
    <>
      <div className="container center">
        <div className="main">
          <div className="inp-container">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Add a Todo"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
              <button>Go</button>
            </form>
          </div>
          <div className="show">
            {isLoading
              ? "Loading..."
              : todos.map((todo, index) => {
                  return (
                    <>
                      <Todo
                        todo={todo}
                        key={todo.todo_id}
                        onDelete={onDelete}
                        onUpdate={onUpdate}
                      />
                    </>
                  );
                })}
          </div>
        </div>
      </div>
      <div className="dd-form">
        <form onSubmit={onEdit}>
          <input
            type="text"
            placeholder="Edit Todo"
            autoFocus
            value={editdesc}
            onChange={(e) => setEditDesc(e.target.value)}
          />
          <button>EDIT</button>
          <div className="close center" onClick={Close}>
            x
          </div>
        </form>
      </div>
    </>
  );
};

export default App;
