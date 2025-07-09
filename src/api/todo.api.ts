import axios from 'axios';

const TODO_BASE_API_ENDPOINT = 'https://jsonplaceholder.typicode.com/users/2/todos';

export const getTasks = (limit = 6) => axios.get(`${TODO_BASE_API_ENDPOINT}?_limit=${limit}`);