import React, { useState }  from 'react'
import { connect } from 'react-redux'
import User from '../components/User'
import { settingUserClicked, settingUserNotClicked } from '../reducers/userReducer'

const UsersList = (props) => {
    const [isVisible, setVisible] = useState(false)
    const showWhenNotVisible = { display: isVisible ? '' : 'none' }
    const showWhenVisible = { display: isVisible ? 'none' : '' }

    const userClickedInList = (user) => {
        setVisible(!isVisible)
        props.settingUserClicked(user)
    }

    const showingUsersBlogs = () => {
        if (props.users.userClicked){
            return (
                <div>
                    <h2 onClick = {() => userClickedInList(props.users.userClicked)}>
                        {props.users.userClicked.username}
                    </h2>
                    <div>
                        <User />
                    </div>
                </div>
            )
        }
    }

    return(
        <div>
            <div style = {showWhenVisible}>
                <h2>Users</h2>
                <table>
                <thead>
                    <tr>
                    <th></th>
                    <th>blogs created</th>
                    </tr>
                </thead>
                {props.users.users.map(u => 
                <tbody key={u.id}>
                    <tr onClick = {() => userClickedInList(u)}>
                    <td>{u.username}</td>
                    <td>{u.blogs.length}</td>
                    </tr>
                </tbody>)}
                </table>
            </div>

            <div style = {showWhenNotVisible}>
                <div>
                    {showingUsersBlogs()}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        users: state.users,
        user: state.userClicked
    }
}

const mapDispatchToProps = {
    settingUserClicked,
    settingUserNotClicked
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersList)