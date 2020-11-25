//import Link from 'next/link'
import { FormEvent, useEffect, useState } from 'react'
import todoAPI from '../api/todoapi'
import Layout from '../components/Layout'
import { useRouter } from 'next/router';

export default function AddTodo() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  function resetInputBox() {
    setEmail('');
    setUsername('');
    setPassword('');
  }

  async function login() {
    try {
      const response = await todoAPI({
        method: 'POST',
        url: '/login',
        data: {
          email: email,
          password: password
        }
      })
      resetInputBox();
      localStorage.setItem('access_token', response.data.access_token);
      router.push('/todo');
    } catch (err) {
      resetInputBox();
    }
  }

  async function register(event: FormEvent) {
    event.preventDefault();
    try {
      await todoAPI({
        method: 'POST',
        url: '/register',
        data: {
          email: email,
          username: username,
          password: password
        }
      })
      login();
    } catch (err) {
      resetInputBox();
    }
  }

  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      router.push('/todo');
    }
  }, [])

  return (
    <>
      <Layout>
        <div style={{
          display: 'flex',
          justifyContent: 'center'
        }}>
          <div style={{
            width: "50vw",
            border: '1px solid black',
            borderRadius: '20px',
            margin: '15px',
            padding: '10px',
            flexWrap: 'wrap'
          }}>
            <form
              onSubmit={(event: FormEvent) => register(event)}
              style={{ display: 'flex', flexDirection: 'column', fontFamily: 'arial, sans-serif' }}>
              <h1 style={{ alignSelf: 'center' }}>Register</h1>
              <label>
                <strong>Email </strong>
              </label>
              <input
                type="text"
                value={email}
                onChange={(val: any) => setEmail(val.target.value)}
                style={{ flex: 1, marginBottom: '15px' }}
              />
              <label>
                <strong>Username </strong>
              </label>
              <input
                type="text"
                value={username}
                onChange={(val: any) => setUsername(val.target.value)}
                style={{ flex: 1, marginBottom: '15px' }}
              />
              <label>
                <strong>Password </strong>
              </label>
              <input
                type="password"
                value={password}
                onChange={(val: any) => setPassword(val.target.value)}
                style={{ flex: 1, marginBottom: '15px' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => { router.push('/') }}
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    fontSize: '20px',
                    padding: '10px',
                    borderRadius: '10px'
                  }}>Cancel</button>

                <button
                  type="submit"
                  style={{
                    backgroundColor: "blue",
                    color: "white",
                    fontSize: '20px',
                    padding: '10px',
                    borderRadius: '10px'
                  }}>Register</button>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </>
  )
}

