import { useEffect, useState } from "react";
import Todo from "./Todo";
import "../Todos.css";
function Todos() {
  const [todos, setTodos] = useState([]);
  const [addedTodo, setAddedTodo] = useState();

  // localStorage.setItem("currentUser", 1);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    const getTodos = async () => {
      const result = await (await fetch("http://localhost:3000/todos")).json();
      const filtered = await result.filter(
        (todo) => todo.userId == currentUser["id"]
      );
      setTodos(filtered);
      console.log("✌️todos --->", todos);
      console.log("dhdhfhdsjhfkfhaihud");

      getTodos();
    };
  }, []);

  const handleAddedTodos = async () => {
    setTodos((prev) => [
      ...prev,
      {
        title: addedTodo,
        completed: false,
        userId: currentUser["id"],
        // id: prev.length + 1,
      },
    ]);
    try {
      let response = await fetch("http://localhost:3000/todos", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: addedTodo,
          completed: false,
          userId: currentUser["id"],
          // id: todos.length,
        }),
      });
    } catch (error) {
      console.log("error --->", error);
    }
    // return await response.json();
  };

  const updateUser = async ({ userId, type, newValue, id }) => {
    const userToUpdate = todos.find((element) => {
      console.log("✌️todos --->", todos);
      console.log("✌️todo --->", element);
      JSON.parse(element["userId"]) === userId;
    });
    switch (type) {
      case "changeChecked":
        setTodos((prev) => [
          ...prev,
          (prev[userToUpdate].completed = newValue),
        ]);
        break;

      case "delete":
        // prev[userToUpdate]
        setTodos((prev) => prev.splice(userToUpdate, 1));
        console.log("todos --->", todos);
        try {
          const response = await fetch("http://localhost:3000/todos/" + id, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: null,
          });
        } catch (error) {
          console.log("error --->", error);
        }
        break;
      default:
        break;
    }
  };

  return (
    <div id="todo-container">
      <header>
        <h1>To Do:</h1>
        <input
          type="text"
          onChange={(e) => setAddedTodo(e.target.value)}
        ></input>
        <button onClick={handleAddedTodos}>Add</button>
      </header>
      <div id="sort">
        <h2>Sort By:</h2>
        <button>completed</button>
        <button>not completed</button>
        <button>alphabetical order</button>
      </div>

      {todos.map((task, index) => {
        console.log("✌️task --->", task);
        return (
          <Todo
            key={index}
            index={index + 1}
            id={task.id}
            title={task.title}
            userId={task.userId}
            completed={task.completed}
            updateUser={updateUser}
          />
        );
      })}
    </div>
  );
}
export default Todos;
