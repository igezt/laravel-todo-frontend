import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from 'react-native';
import Todo from '../types/Todo';
import {styles} from '../styles/styles';
import TodoItem from './TodoItem';
import useTodo from '../hooks/useTodo';
import {deleteTodo, postTodo, updateTodo} from '../database/todoService';

interface TodoListProps {
  id: number;
  title: string;
}

export default function TodoList({id, title}: TodoListProps) {
  const [todo, setTodo] = useState('');

  const {
    todos,
    setTodos,
    isLoading,
    handleTrigger: triggerTodoReload,
  } = useTodo(id);

  const handleAddTodo = () => {
    if (!todo.length) {
      return;
    }
    postTodo(todo, id).then(item => {
      setTodo('');
      setTodos(items => [...items, item]);
    });
  };

  const handleDeleteTodo = (todoId: number) => {
    deleteTodo(todoId).then(todo => {
      setTodos(items => items.filter(item => item.id !== todoId));
    });
  };

  const handleUpdateTodo = (todoId: number, newTodo: Todo) => {
    updateTodo(todoId, newTodo).then(newItem =>
      setTodos(items =>
        items.map(item => (item.id !== todoId ? item : newItem)),
      ),
    );
  };

  return (
    <>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={triggerTodoReload}
          />
        }
        contentContainerStyle={{flexGrow: 1}}
        bounces={false}>
        {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
        <View style={styles.container}>
          {todos.map(item => (
            <TodoItem
              todo={item}
              onDelete={handleDeleteTodo}
              onUpdate={handleUpdateTodo}
              key={item.id}
            />
          ))}
          <TextInput
            style={styles.input}
            placeholder="Add todo"
            onChangeText={text => setTodo(text)}
            value={todo}
          />
          <Button title="Add" onPress={handleAddTodo} />
        </View>
      </ScrollView>
    </>
  );
}
