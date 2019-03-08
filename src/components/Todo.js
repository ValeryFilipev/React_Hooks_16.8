//Hooks use only in the root of the code without any nesting (for, if and so on)
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const todo = props => {
  const [todoName, setTodoName] = useState('');
  const [todoList, setTodoList] = useState([]);
  
  // const [todoState, setTodoState] = useState({ userInput: '', todoList: [] });
  
  useEffect(() => {
    axios.get('https://test-326e3.firebaseio.com/todos.json')
      .then(result => {
        console.log(result);
        
        const todoData = result.data;
        const todos = [];
        for (const key in todoData) {
          if (todoData.hasOwnProperty(key)) {
            todos.push({
              id: key,
              name: todoData[key].name})
          }
        }
        setTodoList(todos);
      });
  });
  
  const inputChangeHandler = event => {
    // setTodoState({
    //   userInput: event.target.value,
    //   todoList: todoState.todoList
    // });
    setTodoName(event.target.value);
  };
  
  const todoAddHandler = () => {
    // setTodoState({
    //   userInput: todoState.userInput,
    //   todoList: todoState.todoList.concat(todoState.userInput)
    // });
    setTodoList(todoList.concat(todoName));
    axios.post('https://test-326e3.firebaseio.com/todos.json', {
      name: todoName
    })
      .then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
    })
  };
  
  return (
    <>
      <input
        type="text"
        placeholder="Todo"
        onChange={inputChangeHandler}
        value={todoName}
      />
      <button type="button" onClick={todoAddHandler}>
        Add
      </button>
      <ul>
        {todoList.map(todo => (
          <li key={todo.id}>{todo.name}</li>
        ))}
      </ul>
    </>
  );
};

export default todo;