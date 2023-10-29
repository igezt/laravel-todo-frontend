import axios from 'axios';
// import env from 'react-native-dotenv';
import {BACKEND} from '@env';
import TodoListEntity from '@/types/TodoList';
// import Config from 'react-native-config';

const BASE_URL = `${BACKEND}/api/todo-lists`;

export const getAllTodoLists = async () => {
  console.log('Getting all todo lists');
  return await axios
    .get(`${BASE_URL}`)
    .then(res => {
      return res.data.data ?? [];
    })
    .catch(err => console.error(JSON.stringify(err)));
};

export const getOneTodoList = async (todoListId: number) => {
  console.log(`Getting one todo list with todoListId: ${todoListId}`);
  return await axios
    .get(`${BASE_URL}/${todoListId}`)
    .then(res => res.data.data)
    .catch(err => console.error(err));
};

export const deleteTodoList = async (todoListId: number) => {
  console.log(`Deleting todo list with todoListId: ${todoListId}`);
  return await axios
    .delete(`${BASE_URL}/${todoListId}`)
    .then(res => res.data.data)
    .catch(err => console.error(err));
};

export const updateTodoList = async (
  todoListId: number,
  data: Partial<TodoListEntity>,
) => {
  console.log(`Updating todo list with todoListId: ${todoListId}`);
  return await axios
    .put(`${BASE_URL}/${todoListId}`, {})
    .then(res => res.data.data)
    .catch(err => console.error(err));
};

export const postTodoList = async (name: string) => {
  console.log('Creating new todo list');
  return await axios
    .post(`${BASE_URL}`, {name})
    .then(res => res.data.data)
    .catch(err => console.error(err));
};
