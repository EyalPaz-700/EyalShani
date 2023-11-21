import { useEffect, useState } from "react";
import Todo from "./Todo";
function Todos() {
  const [todos, setTodos] = useState([]);
  const getTodos = async () => {
    const result = await (await fetch("http://localhost:3000/todos")).json();
    console.log("✌️result --->", result);
    const filtered = await result.filter((todo) => todo.userID === currentUser);
    setTodos((prev) => [...prev, filtered]);
  };

  localStorage.setItem("currentUser", 1);
  const currentUser = localStorage.getItem("currentUser");
  // const filteredTodosList = todos.filter((todo) => todo.userID === currentUser);

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <>
      {todos.map((task) => {
        return (
          <Todo
            key={task.id}
            id={task.id}
            title={task.title}
            userId={task.userId}
            completed={task.completed}
          />
        );
      })}
    </>
  );
}
export default Todos;
