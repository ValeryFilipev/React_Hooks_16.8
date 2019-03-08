//Hooks use only in the root of the code without any nesting (for, if and so on)
import React, { useState } from 'react';

const todo = props => {
  // const [todoName, setTodoName] = useState('');
  // const [todoList, setTodoList] = useState([]);
  
  const [todoState, setTodoState] = useState({ userInput: '', todoList: [] });
  
  const inputChangeHandler = event => {
    setTodoState({
      userInput: event.target.value,
      todoList: todoState.todoList
    });
  };
  
  const todoAddHandler = () => {
    setTodoState({
      userInput: todoState.userInput,
      todoList: todoState.todoList.concat(todoState.userInput)
    });
  };
  
  return (
    <>
      <input
        type="text"
        placeholder="Todo"
        onChange={inputChangeHandler}
        value={todoState.userInput}
      />
      <button type="button" onClick={todoAddHandler}>
        Add
      </button>
      <ul>
        {todoState.todoList.map(todo => (
          <li key={todo}>{todo}</li>
        ))}
      </ul>
    </>
  );
};

export default todo;