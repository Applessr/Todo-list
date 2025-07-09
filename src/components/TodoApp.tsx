import { MoonStar, Sun } from "lucide-react";
import useTodoStore from "../stores/useTodoStore";
import TodoForm from "./TodoForm"

const TodoApp = () => {
  const { isDarkMode, toggleDarkMode } = useTodoStore();


  return (
    <div className={`flex justify-center items-center w-screen h-screen
      ${isDarkMode
        ? 'bg-gradient-to-r from-[#121E33] to-[#495B7A]'
        : 'bg-gradient-to-r from-[#DBE6F6] to-[#C5796D]'
      }`}>
      <TodoForm />

      <button
        className="absolute top-6 right-6 text-white text-2xl "
        onClick={toggleDarkMode}
      >
        {isDarkMode ? <MoonStar className="w-8 h-8" /> : <Sun className="w-8 h-8" />}
      </button>
    </div>

  )
}

export default TodoApp
