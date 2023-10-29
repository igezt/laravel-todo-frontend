import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {styles} from '../styles/styles';
import Todo from '../types/Todo';
import React from 'react';
import {View, Text, Button, TouchableOpacity} from 'react-native';

interface TodoItemProps {
  todo: Todo;
  onDelete: (todoId: number) => void;
  onUpdate: (todoId: number, todo: Todo) => void;
}

export default function TodoItem({todo, onDelete, onUpdate}: TodoItemProps) {
  const handleTickButton = (isChecked: boolean) => {
    //TODO: Update using server
    onUpdate(todo.id, {...todo, is_done: isChecked});
  };

  return (
    <View style={styles.buttonContainer}>
      <BouncyCheckbox
        size={25}
        fillColor="red"
        unfillColor="#FFFFFF"
        iconStyle={{borderColor: 'red'}}
        innerIconStyle={{borderWidth: 2}}
        onPress={handleTickButton}
        isChecked={todo.is_done}
      />
      <View style={styles.todoTopView}>
        <Text>{todo.description}</Text>
        <Text>{'Date Created: ' + todo.created_at}</Text>
        <Text>{'Date Updated: ' + todo.updated_at}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => onDelete(todo.id)}>
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}
