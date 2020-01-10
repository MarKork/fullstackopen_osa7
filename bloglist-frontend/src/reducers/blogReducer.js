import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT_BLOGS':
            return action.data
        case 'NEW_BLOG':
            return [...state, action.data]
        case 'ADD_LIKES':
            return state.map(blog =>blog.id === action.data.id ? action.data : blog)
        case 'DELETING_BLOG':
            return action.data
        default:
            return state
    }
}

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs,
        })
    }
}

export const createBlog = content => {
    return async dispatch => {
      const newBlog = await blogService.create(content)
      dispatch({
        type: 'NEW_BLOG',
        data: newBlog,
      })
    }
}

export const addLikesToBlog = (id) => {
    return async (dispatch) => {
        const blogs = await blogService.getAll()
        const blogToChange = blogs.find(b => b.id === id)
        const changedBlog = {
            ...blogToChange, likes: blogToChange.likes + 1
        }
        const changedNow= await blogService.update(changedBlog.id,changedBlog)
    dispatch({
        type: 'ADD_LIKES',
        data: changedNow
        })
    }
}

export const deletingBlog = (id) => {
    return async dispatch => {
        const allBlogs=await blogService.deleteBlog(id)
        dispatch({
            type: 'DELETING_BLOG',
            data: allBlogs
        })
    }
}


export default blogReducer