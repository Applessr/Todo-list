import { render, screen, fireEvent } from "@testing-library/react";
import TodoList from "../TodoList";
import useTodoStore from "../../stores/useTodoStore";
import { showDeleteConfirm } from "../../utils/alert";

jest.mock("../../stores/useTodoStore");
jest.mock("../../utils/alert", () => ({
  showDeleteConfirm: jest.fn(),
}));

const mockedUseTodoStore = useTodoStore as jest.MockedFunction<typeof useTodoStore>;

describe("TodoList", () => {
  const mockEditTodo = jest.fn();
  const mockDeleteTodo = jest.fn();
  const mockToggleTodo = jest.fn();
  const mockGetTodo = jest.fn();

  beforeEach(() => {
    mockedUseTodoStore.mockReturnValue({
      todos: [
        { id: 1, title: "Test Task 1", completed: false, userId: 1 },
        { id: 2, title: "Test Task 2", completed: true, userId: 1 },
      ],
      totalTasks: 2,
      isLoading: false,
      error: null,
      editTodo: mockEditTodo,
      deleteTodo: mockDeleteTodo,
      toggleTodo: mockToggleTodo,
      getTodo: mockGetTodo,
      addTodo: jest.fn(),
    });
    jest.clearAllMocks();
  });

  it("renders todos correctly", () => {
    render(<TodoList />);
    expect(screen.getByText("Test Task 1")).toBeTruthy();
    expect(screen.getByText("Test Task 2")).toBeTruthy();
  });

  it("calls toggleTodo when checkbox is clicked", () => {
    render(<TodoList />);
    const checkbox = screen.getAllByRole("checkbox")[0];
    fireEvent.click(checkbox);
    expect(mockToggleTodo).toHaveBeenCalledWith(1);
  });

  it("enters edit mode and saves edited task", () => {
    render(<TodoList />);
    const editButton = screen.getAllByRole("button")[0]; 
    fireEvent.click(editButton);

    const input = screen.getByPlaceholderText("Edit task");
    fireEvent.change(input, { target: { value: "Updated Task" } });

    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);

    expect(mockEditTodo).toHaveBeenCalledWith(1, "Updated Task");
  });

  it("calls showDeleteConfirm when delete button is clicked", () => {
    render(<TodoList />);
    const deleteButton = screen.getAllByRole("button")[1]; 
    fireEvent.click(deleteButton);
    expect(showDeleteConfirm).toHaveBeenCalled();
  });

  it("displays loading state", () => {
    mockedUseTodoStore.mockReturnValue({
      todos: [],
      totalTasks: 0,
      isLoading: true,
      error: null,
      editTodo: mockEditTodo,
      deleteTodo: mockDeleteTodo,
      toggleTodo: mockToggleTodo,
      getTodo: mockGetTodo,
      addTodo: jest.fn(),
    });
    render(<TodoList />);
    expect(screen.getByText("Loading todos...")).toBeTruthy();
  });

  it("displays error state with retry button", () => {
    mockedUseTodoStore.mockReturnValue({
      todos: [],
      totalTasks: 0,
      isLoading: false,
      error: "Failed to load todos",
      editTodo: mockEditTodo,
      deleteTodo: mockDeleteTodo,
      toggleTodo: mockToggleTodo,
      getTodo: mockGetTodo,
      addTodo: jest.fn(),
    });
    render(<TodoList />);
    expect(screen.getByText("Failed to load todos")).toBeTruthy();
    const retryButton = screen.getByRole("button", { name: /retry/i });
    fireEvent.click(retryButton);
    expect(mockGetTodo).toHaveBeenCalled();
  });

  it("displays 'Nothing to do yet.' when todos are empty", () => {
    mockedUseTodoStore.mockReturnValue({
      todos: [],
      totalTasks: 0,
      isLoading: false,
      error: null,
      editTodo: mockEditTodo,
      deleteTodo: mockDeleteTodo,
      toggleTodo: mockToggleTodo,
      getTodo: mockGetTodo,
      addTodo: jest.fn(),
    });
    render(<TodoList />);
    expect(screen.getByText("Nothing to do yet.")).toBeTruthy();
  });
});
