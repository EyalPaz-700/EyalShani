import { useEffect, useState } from "react";
import Todo from "./Todo";
import "../Todos.css";
function Todos() {
  const [todos, setTodos] = useState([]);
  const [addedTodo, setAddedTodo] = useState("");
  const [sortType, setSortType] = useState("all");
  const [query, setQuery] = useState("");
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    const getTodos = async () => {
      const result = await (await fetch("http://localhost:3000/todos")).json();
      const filtered = result.filter(
        (todo) => todo.userId === currentUser["id"]
      );
      setTodos(filtered);
    };
    getTodos();
  }, []);

  const handleAddedTodos = async () => {
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
          userId: currentUser.id,
        }),
      });
      const newTodo = await response.json();
      setTodos((prev) => [...prev, newTodo]);
      setAddedTodo("");
    } catch (error) {}
  };

  const updateUser = async ({ id, userId, type, newValue, index }) => {
    switch (type) {
      case "changeChecked":
        setTodos((prev) => {
          const copy = [...prev];
          return copy.map((todo) =>
            id === todo.id ? { ...todo, completed: newValue } : { ...todo }
          );
        });
        await fetch("http://localhost:3000/todos/" + id, {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            completed: newValue,
          }),
        });
        break;

      case "delete":
        setTodos((prev) => {
          const copy = [...prev];
          copy.splice(index, 1);
          return copy;
        });

        try {
          await fetch("http://localhost:3000/todos/" + id, {
            method: "DELETE",
          });
        } catch (error) {
          console.log("error --->", error);
        }
        break;
      default:
        break;
    }
  };
  let newArray = [...todos];
  const alphabetical = newArray.sort((a, b) => {
    const nameA = a.title.toUpperCase();
    const nameB = b.title.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
  return (
    <div id="todo-container">
      <header>
        <div className="search-add">
          <input
            type="text"
            onChange={(e) => setQuery(e.target.value)}
            placeholder="search..."
          ></input>
          <div className="search">
            <input
              value={addedTodo}
              type="text"
              onChange={(e) => setAddedTodo(e.target.value)}
            ></input>
            <button className="buttons" onClick={handleAddedTodos}>
              Add
            </button>
          </div>
        </div>
        <h1 className="todo-header">To Do</h1>
      </header>
      <div id="sort">
        <h1 className="sort-header">Sort By:</h1>
        <div className="sort-btn">
          <button
            className="buttons"
            onClick={() => {
              setSortType("all");
            }}
          >
            All
          </button>
          <button
            className="buttons"
            onClick={() => {
              setSortType("completed");
            }}
          >
            completed
          </button>
          <button
            className="buttons"
            onClick={() => {
              setSortType("notCompleted");
            }}
          >
            not completed
          </button>
          <button
            className="buttons"
            onClick={() => {
              setSortType("alphabeticalOrder");
            }}
          >
            alphabetical order
          </button>
        </div>
      </div>
      <div className="ss">
        {(sortType === "alphabeticalOrder" ? alphabetical : todos).map(
          (task, index) => {
            if (sortType === "completed") {
              if (
                (task.completed && task.title.includes(query)) ||
                (query === "" && task.completed)
              ) {
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
              }
            } else if (sortType === "notCompleted") {
              if (
                (!task.completed && task.title.includes(query)) ||
                (query === "" && !task.completed)
              ) {
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
              }
            } else if (task.title.includes(query) || query === "") {
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
            }
          }
        )}
      </div>
    </div>
  );
}
export default Todos;
