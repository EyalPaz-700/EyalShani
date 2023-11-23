import "../Todos.css";
const Todo = ({ id, index, title, userId, completed, updateUser }) => {
  const currentUser = localStorage.getItem("currentUser");
  const handleChecked = () => {
    updateUser({
      userId: userId,
      type: "changeChecked",
      newValue: !completed,
      id: id,
      index: index,
    });
  };
  return (
    <>
      <div className="todo">
        <p className="todos-index">{index}</p>
        <input
          type="checkbox"
          checked={completed ? true : false}
          onChange={handleChecked}
        ></input>
        <h2 className="todo-title">{title}</h2>
        <button
          className="buttons"
          onClick={() => {
            updateUser({
              userId: userId,
              type: "delete",
              newValue: null,
              id: id,
              index: index - 1,
            });
          }}
        >
          Delete
        </button>
      </div>
    </>
  );
};
export default Todo;
