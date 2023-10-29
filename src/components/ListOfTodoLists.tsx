import {styles} from '../styles/styles';
import TodoListEntity from '../types/TodoList';
import React, {useState} from 'react';
import {
  View,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  Text,
  Button,
} from 'react-native';
import TodoListItem from './TodoListItem';
import {useNavigation} from '@react-navigation/native';
import useTodoList from '../hooks/useTodoList';
import {
  deleteTodoList,
  postTodoList,
  updateTodoList,
} from '../database/todoListService';

export default function ListOfTodoLists() {
  const {
    todoLists,
    setTodolists,
    handleTrigger: triggerTodoListReload,
    isLoading,
  } = useTodoList();
  const [newTodoListName, setNewTodoListName] = useState<string>('');

  // I understand that 22 Media uses JS, so I will use any more liberally throughout this project.
  const navigation = useNavigation<any>();
  const navigateToTodoList = (todoListId: number, todoListTitle: string) => {
    navigation.navigate('TodoItems', {
      todoListId,
      todoListTitle,
    });
  };

  const handleAddTodoList = () => {
    if (newTodoListName.length === 0) {
      return;
    }

    postTodoList(newTodoListName).then(todoList => {
      setNewTodoListName('');
      setTodolists(items => [...items, todoList]);
    });
  };

  const handleDeleteTodoList = (todoListId: number) => {
    deleteTodoList(todoListId).then(todolist =>
      setTodolists(items => items.filter(list => list.id !== todoListId)),
    );
  };

  const handleUpdateTodoList = (
    todoListId: number,
    newTodo: TodoListEntity,
  ) => {
    updateTodoList(todoListId, newTodo).then(todoList =>
      setTodolists(items =>
        items.map(item => (item.id !== todoListId ? item : todoList)),
      ),
    );
  };

  return (
    <>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Home</Text>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={triggerTodoListReload}
          />
        }
        contentContainerStyle={{flexGrow: 1}}
        bounces={false}>
        {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
        <View style={styles.container}>
          {todoLists.map(item => (
            <TouchableOpacity
              key={item.id}
              onPress={() => navigateToTodoList(item.id, item.name)}>
              <TodoListItem onDelete={handleDeleteTodoList} todoList={item} />
            </TouchableOpacity>
          ))}
          <TextInput
            style={styles.input}
            placeholder="Add new todo list"
            onChangeText={text => setNewTodoListName(text)}
            value={newTodoListName}
          />
          <Button title="Add" onPress={handleAddTodoList} />
        </View>
      </ScrollView>
    </>
  );
}
