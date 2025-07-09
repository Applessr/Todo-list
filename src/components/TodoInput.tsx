import { useState } from "react";
import useTodoStore from "../stores/useTodoStore";
import Button from "./Button";
import { showSuccessAlert } from "../utils/alert";
import { inputTheme } from "../utils/theme";

const TodoInput = () => {
    const { addTodo, isDarkMode } = useTodoStore();
    const [text, setText] = useState('');
    const handleAdd = async () => {
        if (!text.trim()) return;
        addTodo(text);
        setText('');
        await showSuccessAlert('Task added successfully!');

    }

    const theme = inputTheme(isDarkMode);

    return (
        <div className="flex w-[99%] ml:w-[70%] justify-between gap-1 px-0 md:px-4 lg:px-8">
            <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Add a task"
                className={`border border-gray-500 px-3 py-2 rounded w-full ${theme}`}
            />
            <Button text="Add" className="bg-[#6C5B7B] hover:bg-[#635370] text-white" onClick={handleAdd} />
        </div>
    );
};

export default TodoInput;
