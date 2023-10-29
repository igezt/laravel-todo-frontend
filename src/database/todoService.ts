import axios from 'axios';
// import env from 'react-native-dotenv';
import {BACKEND} from '@env';
import TodoListEntity from '@/types/TodoList';
import Todo from '@/types/Todo';
// import Config from 'react-native-config';

const BASE_URL = `${BACKEND}/api/todos`;
const TODO_LIST_BASE_URL = `${BACKEND}/api/todo-lists`;

export const getAllTodosByList = async (todoListId: number) => {
  console.log(`Get all todos with list id: ${todoListId}`);
  return await axios
    .get(`${TODO_LIST_BASE_URL}/${todoListId}`)
    .then(res => {
      return res.data.data.todos ?? [];
    })
    .catch(err => console.error(JSON.stringify(err)));
};

// export const getOneTodoList = async (todoListId: number) => {
//   return await axios
//     .get(`${BASE_URL}/${todoListId}`)
//     .then(res => res.data)
//     .catch(err => console.error(err));
// };

export const deleteTodo = async (todoId: number) => {
  console.log(`Delete todo with todoId: ${todoId}`);
  return await axios
    .delete(`${BASE_URL}/${todoId}`)
    .then(res => res.data.data)
    .catch(err => console.error(err));
};

export const updateTodo = async (todoId: number, data: Partial<Todo>) => {
  console.log(`Update todo with todoId: ${todoId}`);
  return await axios
    .put(`${BASE_URL}/${todoId}`, data)
    .then(res => res.data.data)
    .catch(err => console.error(err));
};

export const postTodo = async (description: string, todoListId: number) => {
  console.log('Creating new todo');
  return await axios
    .post(`${BASE_URL}`, {
      description,
      is_done: false,
      todo_list_id: todoListId,
    })
    .then(res => res.data.data)
    .catch(err => console.error(err));
};
