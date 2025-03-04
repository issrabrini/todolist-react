import { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import FilterButtons from './components/FilterButtons';
import SearchBar from './components/SearchBar';
import { Check, ListTodo } from 'lucide-react';


// Define the Todo type
export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

// Define the filter type
type FilterType = 'all' | 'active' | 'completed';

function App() {
  // State for todos, filter, and search
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [filter, setFilter] = useState<FilterType>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Add a new todo
  const addTodo = (text: string) => {
    if (text.trim()) {
      const newTodo: Todo = {
        id: Date.now().toString(),
        text: text.trim(),
        completed: false,
      };
      setTodos([...todos, newTodo]);
    }
  };

  // Delete a todo
  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Toggle todo completion status
  const toggleComplete = (id: string) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Edit a todo
  const editTodo = (id: string, newText: string) => {
    if (newText.trim()) {
      setTodos(
        todos.map(todo =>
          todo.id === id ? { ...todo, text: newText.trim() } : todo
        )
      );
    }
  };

  // Filter todos based on current filter and search term
  const filteredTodos = todos
    .filter(todo => {
      if (filter === 'active') return !todo.completed;
      if (filter === 'completed') return todo.completed;
      return true;
    })
    .filter(todo =>
      todo.text.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Get counts for the summary
  const totalCount = todos.length;
  const completedCount = todos.filter(todo => todo.completed).length;
  const activeCount = totalCount - completedCount;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-indigo-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold flex items-center">
              <ListTodo className="mr-2" size={24} />
              Task Manager
            </h1>
            <div className="bg-white text-indigo-600 rounded-full p-1">
              <Check size={20} />
            </div>
          </div>
          <p className="mt-2 text-indigo-200">Organize your tasks efficiently</p>
          
          {/* Task summary */}
          <div className="flex justify-between mt-4 text-sm">
            <div className="bg-indigo-500 rounded-lg px-3 py-1">
              Total: {totalCount}
            </div>
            <div className="bg-yellow-500 rounded-lg px-3 py-1">
              Active: {activeCount}
            </div>
            <div className="bg-green-500 rounded-lg px-3 py-1">
              Completed: {completedCount}
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <TodoForm addTodo={addTodo} />
          
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <FilterButtons filter={filter} setFilter={setFilter} />
              <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>
            
            <TodoList
              todos={filteredTodos}
              deleteTodo={deleteTodo}
              toggleComplete={toggleComplete}
              editTodo={editTodo}
            />
            
            {filteredTodos.length === 0 && (
              <p className="text-center text-gray-500 my-6">
                {todos.length === 0
                  ? "You don't have any tasks yet. Add one above!"
                  : "No tasks match your current filter."}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;