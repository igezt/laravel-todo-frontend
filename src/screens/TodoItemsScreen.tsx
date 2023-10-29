import TodoList from '../components/TodoList';
import {useRoute} from '@react-navigation/native';
import * as React from 'react';

export interface TodoItemsRouteParams {
  todoListId: number;
  todoListTitle: string;
}

export default function TodoItemsScreen() {
  // Typically I would use the correct typing here for the routing, but since I know 22 Media uses javascript for their frontend,
  // ill be using the any type a bit more liberally
  const route: any = useRoute();
  //   const todoItemsId: number[] = route.params?.todoItems;
  const todoListId: number = route.params?.todoListId;
  const todoListTitle: string = route.params?.todoListTitle;

  return <TodoList id={todoListId} title={todoListTitle} />;
}
