import { useState, useRef } from "react";
import classes from "./NewTodo.module.css";
import todostyles from "./TodoStyles.module.css"; 

const NewTodo = ({fetchTodosData}) => {
  const inputRef = useRef();
  const [enteredText, setEnteredText] = useState(""); 
  const addNewTodo = (event) => {
    let userInput = inputRef.current.value 
    if (event.key === "Enter" && userInput !== "") {
      const newTodo = {
        todo: userInput, 
        status: "active" 
      }

      setEnteredText("") 
      fetch(
        "https://frontend-mentor-projects-19f70-default-rtdb.firebaseio.com/todosData.json",
        {
          method: "POST",
          body: JSON.stringify(newTodo),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setTimeout(()=> {
        fetchTodosData(); 
      }, 200)
    }
  };

  return (
    <div className={`${classes.todo} ${todostyles.todo}`}>
      <div className={`${todostyles.check}`} />
      <input
        type="text"
        placeholder="Create a new todo..."
        onKeyDown={addNewTodo}
        ref={inputRef}
        value={enteredText} 
        onChange={(e) => setEnteredText(e.target.value)}
      />
    </div>
  );
};

export default NewTodo;
