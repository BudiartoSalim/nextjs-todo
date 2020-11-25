//import Link from 'next/link'
import { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import axios from 'axios';
import AddTodo from '../../components/AddTodo'
import { useRouter } from 'next/router';
import Todo from '../../components/Todo'

export default function IndexPage() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState('');
  const router = useRouter();

  async function getTodos() {
    try {

      const { data } = await axios({
        method: "GET",
        url: "http://localhost:4000/todo",
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      });
      setError('');
      setTodos(data);
    } catch (err) {
      setError(err);
      logout();
    }
  }

  function logout() {
    localStorage.clear();
    router.push('/');
  }

  useEffect(() => {
    getTodos();
  }, [])


  return (
    <>
      <Layout title="Todo App">
        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '20px' }}>
          <div style={{ display: 'flex', alignContent: 'space-around' }}>
            <h1 style={{ flex: 1 }}>My Todos</h1>
            <button
              type="button"
              onClick={() => { logout() }}
              style={{ backgroundColor: 'red', color: 'white', borderRadius: '10px' }}>
              <strong>Logout</strong>
            </button>
          </div>
          <AddTodo setTodos={setTodos} setError={setError} fetchTodos={getTodos} />
          <div style={{ display: 'flex', alignSelf: 'center', width: '80vw' }}>
            <table style={{
              marginTop: '10px',
              width: '100%',
              backgroundColor: 'darkslategray',
              fontFamily: "arial, sans-serif"
            }}>
              <thead>
                <tr style={{ color: 'white' }}>
                  <th style={{ width: '15%' }}>Todo Title</th>
                  <th style={{ width: '50%' }}>Description</th>
                  <th style={{ width: '10%' }}>Status</th>
                  <th style={{ width: '15%' }}>Actions</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {!error && todos.map((todo, idx) => {
                  return (
                    <Todo key={idx} todo={todo} setTodos={setTodos} setError={setError} fetchTodos={getTodos} />
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </Layout>
    </>
  )
}

