import { useEffect, useState } from "react";
import PrismaLogo from "../../assets/imgs/prisma.png";
import TypeScriptLogo from "../../assets/imgs/typescript.png";
import PostgreLogo from "../../assets/imgs/postgresql.png";
import axios from "axios";

const Todos = () => {
  type Todo = {
    id: number;
    title: string;
    description: string;
    completed: boolean;
  };

  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const addTodo = async (title: string, description: string) => {
    try {
      const response = await axios.post("http://localhost:4000/add-todo", {
        title,
        description,
      });
      console.log("response after adding todo:", response.data);
      setTodos([...todos, response.data]);
    } catch (error) {
      console.log("error while adding todo:", error);
    }
  };

  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:4000/get-todos");
      console.log("response after fetching todos:", response.data);
      setTodos(response.data);
    } catch (error) {
      console.log("error while fetching todos:", error);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      const response = await axios.delete("http://localhost:4000/delete-todo", { data: { id } });
      console.log("response after deleting todo:", response.data);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.log("error while deleting todo:", error);
    }
  };

  const handleUpdateTodo = async (id: number, completed: boolean) => {
    try {
      const response = await axios.patch("http://localhost:4000/update-todo", { id, completed });
      console.log("response after completing todo:", response.data);
      setTodos(todos.map((todo) => (todo.id === id ? response.data : todo)));
    } catch (error) {
      console.log("error while updating todo:", error);
    }
  };

  useEffect(() => {
    console.log("todos:", todos);
    fetchTodos();
  }, []);

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
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="d-flex  align-items-center gap-2">
          <label htmlFor="desc">Description: </label>
          <input
            type="text"
            id="desc"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button className="btn btn-primary" onClick={() => addTodo(title, description)}>
          Add Todo
        </button>
      </div>

      <div className="todo-list d-flex flex-column gap-2 w-50 mt-3">
        {todos.length > 0 ? (
          todos.map((todo) => (
            <div className="d-flex flex-sm-row flex-column-reverse mb-3 gap-sm-3 gap-2 align-items-center">
              <div className="d-flex flex-sm-column gap-1">
                <button
                  className="btn btn-secondary"
                  onClick={() => handleUpdateTodo(todo.id, !todo.completed)}
                >
                  Update
                </button>
                <button className="btn btn-danger" onClick={() => handleDeleteTodo(todo.id)}>
                  Delete
                </button>
              </div>
              <div className="d-flex flex-column align-items-start mb-sm-2 card card" key={todo.id}>
                <p className="m-0 card-header w-100"> <b>{todo.title}</b></p>
                <div className="card-body">
                  <p className="m-0">{todo.description}</p>
                  <p className="m-0 ">Completed: {todo.completed ? "Yes" : "No"}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No todos found.</p>
        )}
      </div>
    </div>
  );
};

export default Todos;
