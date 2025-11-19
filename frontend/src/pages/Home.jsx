import { useAuth } from "../context/AuthContext.jsx";
import { Link } from "react-router-dom";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="p-10 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to Todo App</h1>

      {!user ? (
        <p className="text-lg">
          Please{" "}
          <Link to="/login" className="text-blue-600 underline">
            login
          </Link>{" "}
          to view your todos.
        </p>
      ) : (
        <Link
          to="/todo"
          className="bg-blue-600 text-white py-2 px-4 rounded mt-4 inline-block"
        >
          Go to My Todos
        </Link>
      )}
    </div>
  );
}
