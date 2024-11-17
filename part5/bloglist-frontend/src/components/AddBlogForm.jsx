const AddBlogForm = ({ title, author, url,
                     setTitle, setAuthor, setUrl, handleAddBlog }) => {
    return (
        <>
            <h3>Add a blog</h3>
            <form onSubmit={handleAddBlog}>
                <div>
                    Title
                    <input
                        type="text"
                        value={title}
                        name="Title"
                        onChange={({target}) => setTitle(target.value)}
                    />
                </div>
                <div>
                    Author
                    <input
                        type="text"
                        value={author}
                        name="Author"
                        onChange={({target}) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    URL
                    <input
                        type="text"
                        value={url}
                        name="URL"
                        onChange={({target}) => setUrl(target.value)}
                    />
                </div>
                <button type="submit">Add</button>
            </form>
        </>
    )
}

export default AddBlogForm