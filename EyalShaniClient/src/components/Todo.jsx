function Todo({ id, title, userID, completed }) {
  return (
    <div className="todo">
      <p>{id}</p>
      <h2>{title}</h2>
      <div>{userID}</div>
      <div>{completed}</div>
    </div>
  );
}
export default Todo;
