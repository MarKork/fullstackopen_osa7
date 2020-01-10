import React from 'react'
import { connect } from 'react-redux'
import { addLikesToBlog, deletingBlog } from '../reducers/blogReducer'
import { setNotification, notificationClean, notificationChange } from '../reducers/notificationReducer'
import { Button } from 'react-bootstrap'

const Blog = (props) => {

  if (props.blog === undefined) {
    return null
  }

  const addLikesOf = async (blog) => {
    try{
      await props.addLikesToBlog(blog.id)
      props.setNotification(`blog ${props.blog.title} by ${props.blog.author} liked!`, 5) 
    }catch (error) {
      props.setNotification(error, 5)
    } 
  }

  const handleDelete = async (blog) => {
    const titleOfBlog = blog.title
    const authorOfBlog = blog.author
    try{
      if(window.confirm(`Do you want to delete ${blog.title} by ${blog.author}?`)){
        await props.deletingBlog(blog.id)
      }
      props.setNotification(`blog ${titleOfBlog} by ${authorOfBlog} removed!`, 5)
    }catch (error){
      props.setNotification('Deleting failed', 5)
    }
  }

  const showingRemoveButton = (blog) => {
    let blogUserName=''
    if(blog.user){
      blogUserName = blog.user.username
    }

    let currentUserName=''
    if(props.users.userNow){
      currentUserName=props.users.userNow.username
    }
    if(currentUserName && currentUserName === blogUserName) 
      { 
        return <Button onClick={() => handleDelete(blog)}>remove</Button>
      }
  }

  return (
    <div>
      <h2>{props.blog.title} by {props.blog.author}</h2>
      <a href = {props.blog.url}>{props.blog.url} </a>
      <div>{props.blog.likes} likes  <Button onClick = {() => addLikesOf(props.blog)}>like</Button></div>
      <div>added by {props.blog.user.username}</div>
      <div>{showingRemoveButton(props.blog)}</div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    users: state.users,
  }
}

const mapDispatchToProps = {
  addLikesToBlog,
  deletingBlog,
  setNotification,
  notificationClean, 
  notificationChange
}

export default (connect(
  mapStateToProps,
  mapDispatchToProps
)(Blog))