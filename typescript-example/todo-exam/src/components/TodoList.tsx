import { useState } from 'react';
import TodoModal from './TodoModal';

type TodoProps = {
  id: number;
  text: string;
  isChecked: boolean;
};

export default function TodoList() {
  const title: string = '오늘 할 일';
  const [todos, setTodos] = useState<TodoProps[]>([
    { id: 1, text: '공부하기', isChecked: false },
    { id: 2, text: '잠자기', isChecked: false },
    { id: 3, text: '미팅하기', isChecked: false },
  ]);

  const [inputText, setInputText] = useState<string>('');

  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedTodo, setSelectedTodo] = useState<TodoProps | null>(null);

  const handleCheckChange = (id: number) => {
    setTodos((prevTodo) =>
      prevTodo.map((todo) =>
        todo.id === id ? { ...todo, isChecked: todo.isChecked } : todo
      )
    );
  };

  const addTodo = () => {
    if (inputText.trim() !== '') {
      setTodos([
        ...todos,
        { id: Date.now(), text: inputText, isChecked: false },
      ]);
      setInputText('');
    }
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleTodoClick = (todo: TodoProps) => {
    setShowModal(true);
    setSelectedTodo(todo);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <h1>{title}</h1>
      <div>
        <input
          type="text"
          placeholder="할 일 입력"
          onChange={(e) => setInputText(e.target.value)}
          value={inputText}
        ></input>
        <button onClick={addTodo}>추가</button>
      </div>
      <div>
        <ul>
          {todos.map((todo, id) => {
            return (
              <li key={id}>
                <input
                  type="checkbox"
                  onChange={() => handleCheckChange(todo.id)}
                  checked={todo.isChecked}
                ></input>
                <span onClick={() => handleTodoClick(todo)}>
                  {todo.isChecked ? <del>{todo.text}</del> : todo.text}
                </span>
                <button onClick={() => removeTodo(todo.id)}>삭제</button>
              </li>
            );
          })}
        </ul>
      </div>
      <TodoModal
        show={showModal}
        todo={selectedTodo}
        handleClose={handleCloseModal}
      />
    </>
  );
}
