import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './App.css';

const Todo = props => {
  return (
    <div
      style={{ textDecoration: props.todo.completed ? 'line-through' : '' }}
      className='todo'
    >
      {props.todo.text}
      <div>
        <button onClick={props.markComplete.bind(this, props.index)}>
          Complete
        </button>
        <button onClick={props.deleteTodo.bind(this, props.index)}>
          Delete
        </button>
      </div>
    </div>
  );
};

const TodoForm = props => {
  const [value, setValue] = useState('');

  const handleSubmit = event => {
    event.preventDefault();

    if (!value) return;
    props.addTodo(value);
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        className='input'
        value={value}
        onChange={event => setValue(event.target.value)}
        placeholder='Add todo...'
      />
      <input type='submit' value='Submit' />
    </form>
  );
};

const App = props => {
  const [todos, setTodos] = useState([
    { text: 'Learn Hooks', completed: false },
    { text: 'Meet friends for lunch', completed: false },
    { text: 'Build cool Todo app', completed: false }
  ]);

  const addTodo = text => {
    const newTodos = [...todos, { text: text, completed: false }];
    setTodos(newTodos);
  };

  const markComplete = indexCompleted => {
    /* CACH 1
    const newTodos = todos.map((todo, index) => {
      if (index === indexCompleted) todo.completed = !todo.completed;
      return todo;
    });*/

    const newTodos = [...todos];
    newTodos[indexCompleted].completed = !newTodos[indexCompleted].completed;

    setTodos(newTodos);
  };

  const deleteTodo = indexDelete => {
    const newTodos = todos.filter((todo, index) => index !== indexDelete);
    setTodos(newTodos);
  };

  return (
    <div className='app'>
      <div className='todo-list'>
        {todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            markComplete={markComplete}
            deleteTodo={deleteTodo}
          />
        ))}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
};

App.propTypes = {};

export default App;
