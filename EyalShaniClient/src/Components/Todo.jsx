import "../Todos.css";
const Todo = ({ id, index, title, userId, completed, updateUser }) => {
  const currentUser = localStorage.getItem("currentUser");
  const handleChecked = (newCheckValue) => {
    updateUser({
      userId: userId,
      type: "changeChecked",
      newValue: newCheckValue,
    });
  };
  return (
    <>
      <div className="todo">
        <div className="todo-content">
          <p>{index}</p>
          <input
            type="checkbox"
            checked={completed ? checked : null}
            onChange={(e) => handleChecked(e.target.value)}
          ></input>
          <h2>{title}</h2>
        </div>
        <button
          onClick={() => {
            updateUser({
              userId: userId,
              type: "delete",
              newValue: null,
              id: id,
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
