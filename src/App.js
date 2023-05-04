import React, { useState, useEffect } from 'react';
import {
  Button,
  InputContainer,
  PageWrapper,
  TodoCard,
  TodoContainer,
  TodoHeader,
  TodoListContainer,
} from './components/styles';
import nextId from 'react-id-generator';
import { useDispatch, useSelector } from 'react-redux';
import { __addToDo, __deleteTodo } from './redux/modules/todosSlice';
import axios from 'axios';

function App() {
  const id = nextId();
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.list);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get('http://localhost:4000/todos');
        dispatch({ type: 'todos/setTodos', payload: response.data });
      } catch (error) {
        console.error(error);
      }
    };
    fetchTodos();
  }, [dispatch]);

  const onAddTodo = () => {
    dispatch(__addToDo({
      id,
      title,
      body
    }))
    setTitle('')
    setBody('')
  };

  const onDeleteTodo = (id) => {
    dispatch(__deleteTodo(id))
  };

  const onChangeTitle = (e) => setTitle(e.target.value);
  const onChangeBody = (e) => setBody(e.target.value);
  return (
    <PageWrapper>
      <TodoContainer>
        <TodoHeader>🐢 SLOW TODO LIST 🐢</TodoHeader>
        <form onSubmit={(e) => {
          e.preventDefault()
          onAddTodo()
        }}>
          <InputContainer>
            <span>제목: </span>
            <input
              value={title}
              placeholder="할 일 제목"
              onChange={onChangeTitle}
            />
            <span>내용: </span>
            <input
              value={body}
              placeholder="할 일 내용"
              onChange={onChangeBody}
            />

            <Button type="submit">+ 추가하기</Button>
          </InputContainer>
        </form>
        <TodoListContainer>
          {todos.map((todo) => (
            <TodoCard key={todo.id}>
              <span>제목: {todo.title}</span>
              <span>할 일: {todo.body}</span>
              <Button onClick={() => onDeleteTodo(todo.id)}>삭제하기</Button>
            </TodoCard>
          ))}
        </TodoListContainer>
      </TodoContainer>
    </PageWrapper>
  );
}

export default App;
