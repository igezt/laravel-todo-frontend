import {getAllTodoLists} from '../database/todoListService';
import TodoListEntity from '../types/TodoList';
import {useState, useEffect} from 'react';

const useTodoList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [todoLists, setTodolists] = useState<TodoListEntity[]>([]);

  useEffect(() => {
    setIsLoading(true);
    getAllTodoLists()
      .then(items => {
        // if (!items) {
        //   setTodolists([]);
        // } else {
        //   setTodolists(items);
        // }
        setIsLoading(false);
      })
      .catch(error => {
        console.error(JSON.stringify(error));
      });
  }, []);

  const handleTrigger = () => {
    setIsLoading(true);
    getAllTodoLists()
      .then(items => {
        if (!items) {
          setTodolists([]);
        } else {
          setTodolists(items);
        }
        setIsLoading(false);
      })
      .catch(error => {
        console.error(JSON.stringify(error));
      });
  };

  return {todoLists, setTodolists, isLoading, handleTrigger};
};

export default useTodoList;
