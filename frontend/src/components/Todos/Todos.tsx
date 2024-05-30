import { useState } from "react";
import PrismaLogo from "../../assets/imgs/prisma.png";
import TypeScriptLogo from "../../assets/imgs/typescript.png";
import PostgreLogo from "../../assets/imgs/postgresql.png";

const Todos = () => {
  type Todo = {
    id: number;
    title: string;
    completed: boolean;
    description: string;
  };

  const [todos, setTodos] = useState<Todo[]>([]); //list of todos array
  const [todoObject, setTodoObject] = useState<Todo>({
    id: 0,
    title: "",
    completed: false,
    description: "",
  }); //input form object

  const addTodo = (title: string, description: string) => {
    setTodos([...todos, { id: Math.random() * 1.67, title, description, completed: false }]);
    console.log(todos);
  };

  return (
    <div className="container">
      <div className="header mt-5 d-flex align-items-center">
        <h3 className="me-5">Todos with</h3>
        <img src={TypeScriptLogo} alt="" className="logo" />
        <img src={PostgreLogo} alt="" className="logo" />
        <img src={PrismaLogo} alt="" className="logo" />
      </div>
      <div className="todo-form d-flex flex-column align-items-end gap-2">
        <div className="d-flex  align-items-center gap-2">
          <label htmlFor="title">Name: </label>
          <input
            type="text"
            id="title"
            value={todoObject.title}
            onChange={(e) => setTodoObject({ ...todoObject, title: e.target.value })}
          />
        </div>
        <div className="d-flex  align-items-center gap-2">
          <label htmlFor="desc">Description: </label>
          <input
            type="text"
            id="desc"
            value={todoObject.description}
            onChange={(e) => setTodoObject({ ...todoObject, description: e.target.value })}
          />
        </div>
        <button
          className="btn btn-primary"
          onClick={() => addTodo(todoObject.title, todoObject.description)}
        >
          Add Todo
        </button>
        
      </div>

      <div className="todo-list d-flex flex-column gap-2 w-75 mt-3">
        {todos.length > 0 ? (
          todos.map((todo) => (
            <div className="d-flex flex-column align-items-start mb-2" key={todo.id}>
              <p className="m-0">id: {todo.id}</p>
              <p className="m-0">Title: {todo.title}</p>
              <p className="m-0">Description: {todo.description}</p>
            </div>
          ))
        ) : (
          <p>list is empty</p>
        )}

      </div>
    </div>
  );
};

export default Todos;
