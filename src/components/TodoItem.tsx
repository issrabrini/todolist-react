import React, { useState } from 'react';
import { Trash2, Edit, Check, X } from 'lucide-react';
import { Todo } from '../App';

interface TodoItemProps {
  todo: Todo;
  deleteTodo: (id: string) => void;
  toggleComplete: (id: string) => void;
  editTodo: (id: string, text: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  deleteTodo,
  toggleComplete,
  editTodo,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    if (editText.trim() !== todo.text) {
      editTodo(todo.id, editText);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  return (
    <li className={`bg-white border rounded-lg overflow-hidden shadow-sm transition-all duration-300 ${todo.completed ? 'border-green-300 bg-green-50' : 'border-gray-200'}`}>
      {isEditing ? (
        <div className="flex p-3">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="flex-grow p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            autoFocus
          />
          <button
            onClick={handleEdit}
            className="ml-2 p-1 text-green-600 hover:text-green-800"
            aria-label="Save"
          >
            <Check size={20} />
          </button>
          <button
            onClick={handleCancel}
            className="ml-1 p-1 text-red-600 hover:text-red-800"
            aria-label="Cancel"
          >
            <X size={20} />
          </button>
        </div>
      ) : (
        <div className="flex items-center p-3 group">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleComplete(todo.id)}
            className="h-5 w-5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500 cursor-pointer"
          />
          <span
            onClick={() => toggleComplete(todo.id)}
            className={`flex-grow ml-3 cursor-pointer ${
              todo.completed ? 'line-through text-gray-500' : 'text-gray-800'
            }`}
          >
            {todo.text}
          </span>
          <div className="flex opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => setIsEditing(true)}
              className="p-1 text-blue-600 hover:text-blue-800"
              aria-label="Edit"
            >
              <Edit size={18} />
            </button>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="p-1 text-red-600 hover:text-red-800 ml-1"
              aria-label="Delete"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      )}
    </li>
  );
};

export default TodoItem;