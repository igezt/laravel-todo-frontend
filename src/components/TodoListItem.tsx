import {styles} from '../styles/styles';
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import TodoListEntity from '@/types/TodoList';

interface TodoListItemProps {
  todoList: TodoListEntity;
  onDelete: (todoId: number) => void;
}

export default function TodoListItem({todoList, onDelete}: TodoListItemProps) {
  return (
    <View style={styles.buttonContainer}>
      <View style={styles.todoTopView}>
        <Text>{todoList.name}</Text>
        <Text>{'Date Created: ' + todoList.created_at}</Text>
        <Text>{'Date Updated: ' + todoList.updated_at}</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => onDelete(todoList.id)}>
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}
