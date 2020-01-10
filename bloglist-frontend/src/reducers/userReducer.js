import loginService from '../services/login'
import blogService from '../services/blogs'
import userService from '../services/users'

const initialState = {
    users: [],
    userNow: null,
    userClicked: null
}
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INIT_USERS':
            return { ...state, users: action.data }
        case 'LOGIN_USER':
            return { ...state, userNow: action.data }
        case 'USER_CLICKED':
            return { ...state, userClicked: action.data}
        case 'USER_NOT_CLICKED':
            return { ...state, userClicked: null}
        case 'SET_TOKEN':
            return { ...state, userNow: action.data }
        case 'LOGOUT_USER':
            return { ...state, userNow: null}
        default:
            return state
        }
}

export const initializeUsers = () => {
    return async dispatch => {
        const users = await userService.getAll()
        dispatch({
            type: 'INIT_USERS',
            data: users,
        })
    }
}

export const loginUser = (username, password) => {
    return async dispatch => {
        const user = await loginService.login(username, password) 
        await blogService.setToken(user.token)
        window.localStorage.setItem(
            'loggedNoteappUser', JSON.stringify(user)
        )
        dispatch({
            type: 'LOGIN_USER',
            data: user,
        })
    }
}

export const settingToken = (user) => {
    return async dispatch => {
        await blogService.setToken(user.token)
        dispatch({
            type: 'SET_TOKEN'
        })
    }
}

export const settingUserClicked = (user) => {
    return dispatch => {
        dispatch({
            type: 'USER_CLICKED',
            data: user,
        })
    }
}

export const settingUserNotClicked = (user) => {
    return dispatch => {
        dispatch({
            type: 'USER_NOT_CLICKED'
        })
    }
}

export const logPreviousUser = (user) => {
    return async dispatch => {
        blogService.setToken(user.token)
        dispatch ({
            type: 'LOGIN_USER',
            data: user
        })
    }
}

export const logOutUser = (user) => {
    return async dispatch => {
        blogService.setToken(null)
        window.localStorage.removeItem('loggedNoteappUser')
        dispatch ({
            type: 'LOGOUT_USER'
        })
    }
}
export default userReducer