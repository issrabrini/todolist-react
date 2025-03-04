import React from 'react';
import TodoItem from './TodoItem';
import { Todo } from '../App';

interface TodoListProps {
  todos: Todo[];
  deleteTodo: (id: string) => void;
  toggleComplete: (id: string) => void;
  editTodo: (id: string, text: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  deleteTodo,
  toggleComplete,
  editTodo,
}) => {
  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          deleteTodo={deleteTodo}
          toggleComplete={toggleComplete}
          editTodo={editTodo}
        />
      ))}
    </ul>
  );
};

export default TodoList;