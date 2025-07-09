import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoInput from '../TodoInput';
import useTodoStore from '../../stores/useTodoStore';
import { showSuccessAlert } from '../../utils/alert';

jest.mock('../../stores/useTodoStore');
jest.mock('../../utils/alert');

describe('TodoInput', () => {
    const mockAddTodo = jest.fn();

    jest.mock('../../stores/useTodoStore', () => ({
        __esModule: true,
        default: jest.fn(),
    }));

    const mockedUseTodoStore = useTodoStore as jest.MockedFunction<typeof useTodoStore>;

    beforeEach(() => {
        mockedUseTodoStore.mockReturnValue({
            addTodo: mockAddTodo,
        });
        jest.clearAllMocks();
    });

    it('renders input and button', () => {
        render(<TodoInput />);
        expect(screen.getByPlaceholderText(/add a task/i)).toBeTruthy();
        expect(screen.getByRole('button', { name: /add/i })).toBeTruthy();
    });

    it('allows typing in the input', async () => {
        render(<TodoInput />);
        const input = screen.getByPlaceholderText(/add a task/i);
        await userEvent.type(input, 'Test Task');
        expect((input as HTMLInputElement).value).toBe('Test Task');
    });

    it('does not call addTodo or showSuccessAlert if input is empty', async () => {
        render(<TodoInput />);
        const button = screen.getByRole('button', { name: /add/i });
        await userEvent.click(button);
        expect(mockAddTodo).not.toHaveBeenCalled();
        expect(showSuccessAlert).not.toHaveBeenCalled();
    });

    it('calls addTodo and showSuccessAlert on valid input', async () => {
        render(<TodoInput />);
        const input = screen.getByPlaceholderText(/add a task/i);
        const button = screen.getByRole('button', { name: /add/i });

        await userEvent.type(input, 'Write tests');
        await userEvent.click(button);

        expect(mockAddTodo).toHaveBeenCalledWith('Write tests');
        expect(showSuccessAlert).toHaveBeenCalledWith('Task added successfully!');
        expect((input as HTMLInputElement).value).toBe('');
    });
});
