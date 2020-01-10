import React from 'react'
import { connect } from 'react-redux'

const User = (props) => {
    return (
        <div>
            <h3>added blogs</h3>
            <ul>
                {props.users.userClicked.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
            </ul>
        </div>
      )
}

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}
export default connect(mapStateToProps, null)(User)
