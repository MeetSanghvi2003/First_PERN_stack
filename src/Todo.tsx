import React, { FC } from "react";

interface todo {
  todo: {
    todo_id: string;
    description: string;
  };
  onDelete: (todo_id: string) => void;
  onUpdate: (todo_id: string) => void;
}

const Todo: FC<todo> = ({ todo, onDelete, onUpdate }) => {
  return (
    <>
      <div className="todo al-center jst-between">
        <div className="desc al-center">{todo.description}</div>
        <div className="icons jst-between al-center">
          <i
            className="bi bi-pencil"
            onClick={() => onUpdate(todo.todo_id)}
          ></i>
          <i className="bi bi-trash" onClick={() => onDelete(todo.todo_id)}></i>
        </div>
      </div>
    </>
  );
};

export default Todo;
