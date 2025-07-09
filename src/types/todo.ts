export interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

export interface TodoStore {
    todos: Todo[];
    totalTasks: number;
    isLoading: boolean;
    error: string | null;
    isDarkMode: boolean;
    getTodo: () => Promise<void>;
    addTodo: (text: string) => void;
    editTodo: (id: number, newTitle: string) => void;
    deleteTodo: (id: number) => void;
    toggleTodo: (id: number) => void;
    toggleDarkMode: () => void;
}

type btnSize = 'default' | 'lg' | 'sm'
export interface ButtonProps {
    className?: string;
    size?: btnSize;
    text?: string;
    pending?: boolean;
    onClick?: () => void;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    icon?: React.ReactNode
}