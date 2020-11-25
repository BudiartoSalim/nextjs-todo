//import Link from 'next/link'
import { FormEvent, useState } from 'react'
import todoAPI from '../api/todoapi'

export default function AddTodo(props: any) {
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');

  async function submitNewTodo(event: FormEvent) {
    event.preventDefault();
    try {
      const response = await todoAPI({
        method: 'POST',
        url: '/todo',
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          title: newTitle,
          description: newDescription
        }
      })
      resetFormValue();
      props.setError('');
      props.setTodos(response.data);

    } catch (err) {
      resetFormValue();
      props.fetchTodos();
      props.setError(err.response.data.message);
    }
  }

  function resetFormValue() {
    setNewDescription('');
    setNewTitle('');
  }

  return (
    <>
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
            onSubmit={(event: FormEvent) => submitNewTodo(event)}
            style={{ display: 'flex', flexDirection: 'column', fontFamily: 'arial, sans-serif' }}>
            <h1 style={{ alignSelf: 'center' }}>Add new todo</h1>
            <label>
              <strong>New todo title: </strong>
            </label>
            <input
              type="text"
              value={newTitle}
              onChange={(val: any) => setNewTitle(val.target.value)}
              style={{ flex: 1, marginBottom: '15px' }}
            />
            <label>
              <strong>New todo description: </strong>
            </label>
            <input
              type="text"
              value={newDescription}
              onChange={(val: any) => setNewDescription(val.target.value)}
              style={{ flex: 1, marginBottom: '15px' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => resetFormValue()}
                style={{
                  backgroundColor: "red",
                  color: "white",
                  fontSize: '20px',
                  padding: '10px',
                  borderRadius: '10px'
                }}>Clear</button>

              <button
                type="submit"
                style={{
                  backgroundColor: "green",
                  color: "white",
                  fontSize: '20px',
                  padding: '10px',
                  borderRadius: '10px'
                }}>Submit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

