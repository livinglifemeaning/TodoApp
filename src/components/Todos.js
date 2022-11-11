import { useState, useEffect } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import useMediaQuery from "../useMediaQuery";
import NewTodo from "./NewTodo";
import Todo from "./Todo";
import classes from "./Todos.module.css";

const Todos = () => {
  const isDesktop = useMediaQuery("(min-width: 45em)");
  const [allTodos, setAllTodos] = useState([]);
  const [activeTodos, setActiveTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [displayedTodoData, setDisplayedTodoData] = useState();

  // Todo functionality
  useEffect(() => {
    fetchTodosData();
  }, []);

  const fetchTodosData = async () => {
    let response = await fetch(
      "https://frontend-mentor-projects-19f70-default-rtdb.firebaseio.com/todosData.json"
    );
    let data = await response.json();
    let loadedTodos = [];

    for (const key in data) {
      loadedTodos.push({
        id: key,
        todo: data[key].todo,
        status: data[key].status,
      });
    }
    const activeTodos = loadedTodos.filter((todo) => todo.status === "active");
    const completedTodos = loadedTodos.filter(
      (todo) => todo.status === "complete"
    );
    setAllTodos(loadedTodos);
    setActiveTodos(activeTodos);
    setCompletedTodos(completedTodos);
    setDisplayedTodoData(loadedTodos);
  };

  const clearCompletedTodos = () => {
    if (completedTodos) {
      completedTodos.forEach((todo) => {
        fetch(
          `https://frontend-mentor-projects-19f70-default-rtdb.firebaseio.com/todosData/${todo.id}.json`,
          {
            method: "DELETE",
          }
        );
      });
      setTimeout(() => {
        fetchTodosData();
      }, 200);
    }
  };
  // End of Todo functionality

  const setDisplay = (
    <div className={classes.setDisplay}>
      <span
        className={`${displayedTodoData === allTodos && classes.active}`}
        onClick={() => setDisplayedTodoData(allTodos)}
      >
        All
      </span>
      <span
        className={`${displayedTodoData === activeTodos && classes.active}`}
        onClick={() => setDisplayedTodoData(activeTodos)}
      >
        Active
      </span>
      <span
        className={`${displayedTodoData === completedTodos && classes.active}`}
        onClick={() => setDisplayedTodoData(completedTodos)}
      >
        Completed
      </span>
    </div>
  );

  const handleDragEnd = (event) => {
 
    const { active, over } = event;
    if (active.id !== over.id) {
      setDisplayedTodoData((items) => {
        const activeIndex = items.findIndex((item) => item.id === active.id);
        const overIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, activeIndex, overIndex);
      });
    }
  };
  return (
    <div className={classes.todos}>
      <NewTodo fetchTodosData={fetchTodosData} />
      <div className={classes.todoBox}>
        {displayedTodoData ? (
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={displayedTodoData}
              strategy={verticalListSortingStrategy}
            >
              {displayedTodoData.map((todo) => (
                <Todo
                  key={todo.id}
                  id={todo.id}
                  todo={todo.todo}
                  status={todo.status}
                  fetchTodosData={fetchTodosData}
                />
              ))}
            </SortableContext>
          </DndContext>
        ) : (
          <p>Loading</p>
        )}
        <div className={classes.endBar}>
          <p>{activeTodos.length} items left</p>
          {isDesktop && setDisplay}
          <p className={classes.clear} onClick={clearCompletedTodos}>
            Clear Completed
          </p>
        </div>
      </div>
      {!isDesktop && <div className={classes.setDisplayBox}>{setDisplay}</div>}
      <p className={classes.drag}>Drag and drop to reorder list</p>
    </div>
  );
};

export default Todos;
