import './App.css';
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Blog from './components/Blog'
import UsersList from './components/UsersList'
import Bloglist from './components/Bloglist'
import Notification from './components/Notification'
import  { useField } from './hooks'
import { setNotification, notificationClean, notificationChange } from './reducers/notificationReducer'
import { initializeBlogs, addLikesToBlog, deletingBlog, createBlog } from './reducers/blogReducer'
import { initializeUsers, loginUser, settingToken, logPreviousUser, logOutUser } from './reducers/userReducer'
import {
  BrowserRouter as Router,
  Route, Link
} from 'react-router-dom'
import { Form, Button, Navbar, Nav } from 'react-bootstrap'

const App = (props) => {
  const [createVisible, setCreateVisible] = useState(false)
  const usernameInLogin = useField('text')
  const passwordInLogin = useField('password')
  const blogTitle = useField('text')
  const blogAuthor = useField('text')
  const blogUrl = useField('text')
  
  useEffect(() => {
      props.initializeBlogs()
      props.initializeUsers()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      props.logPreviousUser(user)
    }
  }, [] )

  const padding = { padding: 5 }

  const blogById = (id) => {
    return(
    props.blogs.find(blog => blog.id === id)
    )
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      await props.loginUser({
        username: usernameInLogin.value,
        password: passwordInLogin.value,
      })
      usernameInLogin.reset()
      passwordInLogin.reset()
    } catch (exception) {
      props.setNotification('wrong username or password',5)
    }
  }

  const blogForm = () => {
    const hideWhenVisible = { display: createVisible ? 'none' : '' }
    const showWhenVisible = { display: createVisible ? '' : 'none' }

    return(  
      <div>
        <div style={hideWhenVisible}>
          <Button onClick={() => setCreateVisible(true)}>new blog</Button>
        </div>
        <div style = {showWhenVisible}>
        <h2>create new</h2>
        <Form onSubmit={addBlog}>
            <Form.Label>title:</Form.Label>
            <Form.Control
              type="text"
              name="username"
              {...blogTitle}
            />
            <Form.Label>author:</Form.Label>
            <Form.Control
              type="text"
             name="username"
              {...blogAuthor}
            />
            <Form.Label>url:</Form.Label>
            <Form.Control
              type="text"
              name="username"
              {...blogUrl}
            />
            <Button type = "submit">create</Button>
          </Form>
          <Button onClick = {() => setCreateVisible(false)}>cancel</Button>
          </div>
      </div>
    )
  }

  const handleLogout = (event) => {
    event.preventDefault()
    props.logOutUser(props.users.userNow)
  }
  
  const addBlog = async (event) => {
      event.preventDefault()
      const blogObject = {
        title: blogTitle.value,
        author: blogAuthor.value,
        url: blogUrl.value,
        likes:0,
        user: props.users.userNow.username
      }
      await props.createBlog(blogObject)
      props.setNotification( `Added new blog: ${blogTitle.value} by ${blogAuthor.value}`,5)
      blogTitle.reset()
      blogAuthor.reset()
      blogUrl.reset()
  }

  if (props.users.userNow === null) {
    return (
      <div class="container">
        <Router>
         <Notification />
            <h2>Log in to application</h2>
              <div>
              <Form method="post" onSubmit={handleLogin}>
                <Form.Group>
                  <Form.Label>username: </Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    {...usernameInLogin}
                  />
                  <Form.Label>password: </Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    {...passwordInLogin}
                  />
                <Button variant="primary" type="submit">login</Button>
                </Form.Group>
              </Form>
            </div>
          </Router>
      </div>
    )
  }

  return (
    <div class="container">
      <Router>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/">blogs</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/users">users</Link>
            </Nav.Link>
            <p>{props.users.userNow.username}logged in 
            <Button onClick = {handleLogout}>logout</Button></p>
          </Nav>
          </Navbar.Collapse>
        </Navbar>
        <h2>blog app</h2>
        <Notification />
        <Route exact path="/" render={() => (
          <div>
            {blogForm()}
            <Bloglist blogs={props.blogs.sort((a,b) => b.likes - a.likes)}/>
          </div>  
          )} />
        <Route exact path="/blogs/:id" render={({match}) => <Blog blog={blogById(match.params.id)}/>}/>
        <Route path="/users" render={() => <UsersList />} />
      </Router>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    notification: state.notification,
    users: state.users,
    }
}

const mapDispatchToProps = {
  setNotification,
  notificationChange,
  notificationClean,
  initializeBlogs,
  addLikesToBlog,
  deletingBlog,
  createBlog,
  loginUser,
  settingToken,
  initializeUsers,
  logPreviousUser, 
  logOutUser,
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
  )(App)