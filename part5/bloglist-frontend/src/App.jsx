import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import authService from './services/auth'
import Notification from "./components/Notification.jsx";
import LoginForm from "./components/LoginForm.jsx";
import BlogList from "./components/BlogList.jsx";
import AddBlogForm from "./components/AddBlogForm.jsx";

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notif, setNotif] = useState({message: "", type: ""})

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedBlogListUser")
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
    }
  }, []);

  useEffect(() => {
    if (user) {
      blogService.getAll(user.token).then(blogs =>
          setBlogs(blogs)
      )
    }
  }, [user])

  const handleLogin = (event) => {
    event.preventDefault()

    authService
        .login({username, password})
        .then((user) => {
          setUser(user)
          window.localStorage.setItem("loggedBlogListUser", JSON.stringify(user))
          setUsername('')
          setPassword('')
        })
        .catch(() => {
          setNotif({message: "Wrong credentials", type: "error"})
          setTimeout(() => {
            setNotif({message: "", type: ""})
          }, 5000)
        })
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem("loggedBlogListUser")
  }

  const handleAddBlog = (event) => {
    event.preventDefault()

    const newBlog = { title, author, url }
    blogService
        .addBlog(newBlog, user.token)
        .then(() => {
          setNotif({message: `Added ${title} by ${author}`, type: "success"})
          setTimeout(() => {
            setNotif({message: "", type: ""})
          }, 5000)
          setTitle('')
          setAuthor('')
          setUrl('')
          blogService
              .getAll(user.token)
              .then(blogs => setBlogs(blogs))
        })
        .catch((err) => {
          setNotif({message: err.message, type: "error"})
          setTimeout(() => {
            setNotif({message: "", type: ""})
          }, 5000)
        })
  }

  return (
    <div>
      <Notification message={notif.message} type={notif.type} />
      {
        user
          ? <div>
              <h2>Blogs</h2>
              <p>{user.name} logged in</p>
              <AddBlogForm title={title}
                           author={author}
                           url={url}
                           setTitle={setTitle}
                           setAuthor={setAuthor}
                           setUrl={setUrl}
                           handleAddBlog={handleAddBlog}
              />
              <br/>
              <BlogList blogs={blogs} user_name={user.name}/>
              <br/>
              <button onClick={handleLogout}>Logout</button>
            </div>
            : <LoginForm username={username}
                   setUsername={setUsername}
                   password={password}
                   setPassword={setPassword}
                   handleLogin={handleLogin}
            />
      }
    </div>
  )
}

export default App