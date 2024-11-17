import Blog from "./Blog.jsx";

const BlogList = ({ blogs, user_name }) => {
    return (
        <>
            {
                blogs.map(blog =>
                    <Blog key={blog.id} blog={blog}/>)
            }
        </>

    )
}

export default BlogList;