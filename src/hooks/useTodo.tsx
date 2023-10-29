import Todo from '@/types/Todo';
import {getAllTodoLists} from '../database/todoListService';
import TodoListEntity from '../types/TodoList';
import {useState, useEffect} from 'react';
import {getAllTodosByList} from '../database/todoService';

const useTodo = (todoListId: number) => {
  const [isLoading, setIsLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  //   const handleTrigger = () => {
  //     setTrigger(!trigger); // Toggles the trigger state
  //   };

  useEffect(() => {
    setIsLoading(true);
    getAllTodosByList(todoListId)
      .then(items => {
        if (!items) {
          setTodos([]);
        } else {
          setTodos(items);
        }
        setIsLoading(false);
      })
      .catch(error => {
        console.error(JSON.stringify(error));
      });
  }, [todoListId]);

  const handleTrigger = () => {
    setIsLoading(true);
    getAllTodosByList(todoListId)
      .then(items => {
        if (!items) {
          setTodos([]);
        } else {
          setTodos(items);
        }
        setIsLoading(false);
      })
      .catch(error => {
        console.error(JSON.stringify(error));
      });
  };
  return {todos, setTodos, isLoading, handleTrigger};
};

export default useTodo;
