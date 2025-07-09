import { useEffect, useMemo } from 'react';
import useTodoStore from '../stores/useTodoStore';
import TodoInput from './TodoInput';
import TodoList from './TodoList';
import { getTodoFormTheme } from '../utils/theme';

const TodoForm = () => {
  const { getTodo, todos, isDarkMode } = useTodoStore();

  useEffect(() => {
    getTodo();
  }, []);

  const theme = getTodoFormTheme(isDarkMode);

  const completedCount = useMemo(() => {
    return todos.filter(todo => todo.completed).length;
  }, [todos]);

  return (
    <div className={theme.container}>
      <h1 className={theme.title}>Todo List</h1>
      <h2 className={theme.subTitle}>Task completed {completedCount}⚡</h2>
      <div className="flex flex-col gap-4 w-full pt-2 items-center">
        <TodoInput />
        <div className="w-full max-h-[50vh] overflow-y-auto">
          <TodoList />
        </div>
      </div>
    </div>
  );
};

export default TodoForm;
