import { useEffect, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Delete from "../images/icon-cross.svg";
import classes from "./Todo.module.css";
import todostyles from "./TodoStyles.module.css";

const Todo = ({ id, todo, status, fetchTodosData }) => {
  const [completeTodo, setCompleteTodo] = useState(false);
  useEffect(() => {
    if (status === "complete") {
      setCompleteTodo(true);
    } else if (status === "active") {
      setCompleteTodo(false);
    }
  }, [status]);

  const toggleCompleteTodo = () => {
    console.log("Clicked");
    let updatedTodo;
    if (!completeTodo) {
      updatedTodo = {
        id,
        todo,
        status: "complete",
      };
      setCompleteTodo(true);
    } else if (completeTodo) {
      updatedTodo = {
        id,
        todo,
        status: "active",
      };
      setCompleteTodo(false);
    }
    fetch(
      `https://frontend-mentor-projects-19f70-default-rtdb.firebaseio.com/todosData/${id}.json`,
      {
        method: "PUT",
        body: JSON.stringify(updatedTodo),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setTimeout(() => {
      fetchTodosData();
    }, 200);
  };

  const deleteTodo = () => {
    console.log("Deleting");
    fetch(
      `https://frontend-mentor-projects-19f70-default-rtdb.firebaseio.com/todosData/${id}.json`,
      {
        method: "DELETE",
      }
    );
    setTimeout(() => {
      fetchTodosData();
    }, 200);
  };

  // Draggable Properties
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      className={`${classes.todo} ${todostyles.todo} ${
        completeTodo ? todostyles.completed : ""
      }`}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <div
        className={todostyles.check}
        onPointerDown={(e) => {
          e.stopPropagation(); 
        }}
        onClick={toggleCompleteTodo}
      />
      <p>{todo}</p>
      <span className={classes.delete} onClick={deleteTodo} onPointerDown={(e) => {
        e.stopPropagation(); 
      }}>
        <img src={Delete} alt="Delete Todo" />
      </span>
    </div>
  );
};

export default Todo;
