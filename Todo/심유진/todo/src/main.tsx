import "./index.css";
import App from "./App.tsx";
import { TodoProvider } from "./context/TodoContext.tsx";
import ReactDOM from "react-dom/client";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <TodoProvider>
    <App />
  </TodoProvider>
);
