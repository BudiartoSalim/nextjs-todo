import React from 'react';
import { ITodo } from '../interfaces/index';
import todoAPI from '../api/todoapi';

export default function Todo({ todo, setTodos, setError, fetchTodos }:
  { todo: ITodo, setTodos: any, setError: any, fetchTodos: any }) {

  function getTodoStyle() {
    if (todo.status_id === 1) {
      return {
        backgroundColor: "LightGray"
      }
    }
    if (todo.status_id === 2) {
      return {
        backgroundColor: "Gold"
      }
    }
    if (todo.status_id === 3) {
      return {
        backgroundColor: "LightGreen"
      }
    }
  }

  async function progressStatus() {
    try {
      const response = await todoAPI({
        method: 'PUT',
        url: `/todo/${todo.id}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          title: todo.title,
          description: todo.description,
          status_id: Number(todo.status_id) + 1
        }
      })
      setError('');
      setTodos(response.data);
    } catch (err) {
      fetchTodos();
      setError(err.response.data.message);
    }
  }

  async function gobackStatus() {
    try {
      const response = await todoAPI({
        method: 'PUT',
        url: `/todo/${todo.id}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          title: todo.title,
          description: todo.description,
          status_id: Number(todo.status_id) - 1
        }
      })
      setError(null);
      setTodos(response.data);
    } catch (err) {
      fetchTodos();
      setError(err.response.data.message);
    }
  }

  async function deleteTodo() {
    try {
      const response = await todoAPI({
        method: 'DELETE',
        url: `/todo/${todo.id}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
      setError(null);
      setTodos(response.data.data);
    } catch (err) {
      fetchTodos();
      setError(err.response.data.message);
    }
  }

  return (
    <>
      <tr style={{ backgroundColor: "white" }}>
        <td>{todo.title}</td>
        <td>{todo.description}</td>
        <td style={getTodoStyle()}>{todo.status_description}</td>
        <td style={{ textAlign: 'center' }}>
          {
            todo.status_id > 1 &&
            <button
              type="button"
              onClick={() => { gobackStatus() }}
              style={{ backgroundColor: "yellow", borderRadius: "5px" }}>
              Go Back
            </button>
          }
          {
            todo.status_id < 3 &&
            <button
              type="button"
              onClick={() => { progressStatus() }}
              style={{ backgroundColor: "lightgreen", borderRadius: "5px" }}>
              Progress
            </button>
          }
        </td>
        <td style={{ textAlign: 'center' }}>
          <button
            type="button"
            onClick={() => { deleteTodo() }}
            style={{ backgroundColor: "pink", borderRadius: "5px" }}>
            Delete
          </button>
        </td>
      </tr>
    </>
  )
}