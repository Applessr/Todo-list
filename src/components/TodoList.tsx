import { CircleCheckBig, PencilLine, Trash } from "lucide-react";
import useTodoStore from "../stores/useTodoStore";
import Button from "./Button";
import { useState } from "react";
import { showDeleteConfirm } from "../utils/alert";


const TodoList = () => {
    const { todos, editTodo, deleteTodo, toggleTodo, isLoading, error, getTodo, isDarkMode } = useTodoStore();
    const [editId, setEditId] = useState<number | null>(null);
    const [editText, setEditText] = useState('');

    const handleEdit = (id: number, currentTitle: string) => {
        setEditId(id);
        setEditText(currentTitle);
    };

    const handleSave = (id: number) => {
        if (!editText.trim()) return;
        editTodo(id, editText);
        setEditId(null);
        setEditText('');
    };

    const handleDelete = (id: number) => {
        showDeleteConfirm(() => deleteTodo(id));
    };


    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-40">
                <p className="text-gray-500 animate-pulse">Loading todos...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col justify-center items-center h-40 gap-2">
                <p className="text-red-500">{error}</p>
                <Button
                    text="Retry"
                    className="bg-[#355C7D] text-white"
                    onClick={() => getTodo()}
                />
            </div>
        );
    }

    const textColor = isDarkMode ? 'text-white' : 'text-black';



    return (
        <div className="flex flex-col w-full gap-2 px-0 md:px-4 lg:px-8">
            {todos && todos.length > 0 ? (
                todos.map((todo) => (
                    <div
                        key={todo.id}
                        className=" group flex flex-col sm:flex-row justify-between items-center bg-gray-100 px-3 py-2 rounded gap-2 cursor-pointer transition-transform duration-200 hover:scale-[1.02] hover:shadow-lg"
                    >
                        {editId === todo.id ? (
                            <div className="flex gap-1 lg:gap-2 w-full items-center">
                                <input
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                    placeholder="Edit task"
                                    className="border border-gray-500 px-3 py-1 rounded flex-1"
                                />
                                <Button
                                    text="Save"
                                    className="bg-[#355C7D] text-white text-sm w-6 lg:w-[12%] px-5"
                                    onClick={() => handleSave(todo.id)}
                                />
                            </div>
                        ) : (
                            <>
                                <button
                                    onClick={() => toggleTodo(todo.id)}
                                >
                                    {todo.completed ? (
                                        <CircleCheckBig className="text-green-500" />
                                    ) : (
                                        <CircleCheckBig className="text-gray-500" />
                                    )}
                                </button>
                                <div className="flex items-center gap-2 flex-1 w-[90%] lg:w-[70%]">

                                    <p className={`group-hover:whitespace-normal group-hover:overflow-visible ${todo.completed ? "line-through text-gray-400" : { textColor }}`}>
                                        {todo.title}
                                    </p>
                                </div>
                                <div className="flex gap-2 shrink-0">
                                    <Button
                                        className="bg-[#355C7D] hover:bg-[#3c4852] text-white"
                                        onClick={() => handleEdit(todo.id, todo.title)}
                                        icon={<PencilLine className="w-4 h-4" />}
                                    />
                                    <Button
                                        className="bg-[#C06C84] hover:bg-[#a45d71] text-white"
                                        onClick={() => handleDelete(todo.id)}
                                        icon={<Trash className="w-4 h-4" />}
                                    />
                                </div>
                            </>
                        )}
                    </div>
                ))
            ) : (
                <div className="text-center mt-6 text-gray-500 text-xl">
                    <p>Nothing to do yet.</p>
                </div>
            )}
        </div>
    );
};

export default TodoList;
