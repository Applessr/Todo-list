import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { getTasks } from "../api/todo.api";
import type { Todo, TodoStore } from "../types/todo";



const useTodoStore = create<TodoStore>()(
    persist(
        (set) => ({
            todos: [],
            totalTasks: 0,
            isLoading: false,
            error: null,
            isDarkMode: false,
            getTodo: async () => {
                set({ isLoading: true, error: null });
                try {
                    const res = await getTasks();
                    const data = res.data;
                    const totalRes = await getTasks(100);
                    const totalTasks = totalRes.data.length;

                    set({ todos: data, totalTasks, isLoading: false });
                } catch (error) {
                    console.error('Error fetching tasks:', error);
                    set({ error: "Failed to load todos", isLoading: false });
                }
            },
            addTodo: (text) => {
                const newTodo: Todo
                    = {
                    id: Date.now(),
                    title: text,
                    completed: false,
                    userId: 0,
                };

                set((state) => ({
                    todos: [newTodo, ...state.todos],
                    totalTasks: state.totalTasks + 1,
                }));
            },

            editTodo: (id, newTitle) =>
                set((state) => ({
                    todos: state.todos.map((todo) =>
                        todo.id === id ? { ...todo, title: newTitle } : todo
                    ),
                })),

            deleteTodo: (id) =>
                set((state) => ({
                    todos: state.todos.filter((todo) => todo.id !== id),
                    totalTasks: state.totalTasks - 1,
                })),

            toggleTodo: (id) =>
                set((state) => ({
                    todos: state.todos.map((todo) =>
                        todo.id === id ? { ...todo, completed: !todo.completed } : todo
                    ),
                })),
            toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode }))
        }),
        {
            name: "todo-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useTodoStore;
