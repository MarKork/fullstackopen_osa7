import React  from 'react'
import { connect } from 'react-redux'
import { settingUserClicked, settingUserNotClicked } from '../reducers/userReducer'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Bloglist = ({blogs}) => {

    return (
        <div >
            <Table striped>
                <tbody>
                    {blogs.map(blog =>
                        <tr key={blog.id}>
                            <td>
                                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>        
    )
}

const mapStateToProps = (state) => {
    return { 
        blogs: state.blogs
    }
}

const mapDispatchToProps = {
    settingUserClicked,
    settingUserNotClicked
}

export default connect(mapStateToProps, mapDispatchToProps)(Bloglist)