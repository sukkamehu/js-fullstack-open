import { useState, useEffect } from 'react'
import Footer from './components/Footer'
import Note from './components/Note'
import Notification from './components/Notification'
import noteService from './services/notes'
import loginService from './services/login'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    noteService.getAll().then(initialNotes => {
      setNotes(initialNotes)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )       
      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
    noteService.setToken(null)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <label>
          username
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
      </div>
      <button type="submit">login</button>
    </form>
  )  

  const addNote = event => {
    event.preventDefault()
    const noteObject = {
      name: newNote,
      number: newNumber
    }

    noteService.create(noteObject).then(returnedNote => {
      setNotes(notes.concat(returnedNote))
      setNewNote('')
      setNewNumber('')
    })
  }

  const handleDeleteNote = id => {
    noteService.remove(id)
      .then(() => {
        setNotes(notes.filter(note => note.id !== id))
      })
      .catch(() => {
        setErrorMessage('Failed to delete note')
        setTimeout(() => setErrorMessage(null), 5000)
      })
  }

  const noteForm = () => (
    <form onSubmit={addNote}>
      <input
        placeholder="name"
        value={newNote}
        onChange={e => setNewNote(e.target.value)}
      />
      <input
        placeholder="number"
        value={newNumber}
        onChange={e => setNewNumber(e.target.value)}
      />
      <button type="submit">save</button>
    </form>
  )


  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      
      {!user && loginForm()}
      {user && (
        <div>
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
          {noteForm()}
        </div>
      )}

      {user && (
        <>
          <div>
            <button onClick={() => setShowAll(!showAll)}>
              show {showAll ? 'important' : 'all'}
            </button>
          </div>
          <ul>
            {notesToShow.map(note => (
              <Note
                key={note.id}
                note={note}
                onDelete={() => handleDeleteNote(note.id)}
              />
            ))}
          </ul>
        </>
      )}
      <Footer />
    </div>
  )
}

export default App