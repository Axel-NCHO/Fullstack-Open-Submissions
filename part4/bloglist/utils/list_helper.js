import _ from "lodash";

/**
 * Dummy
 * @param {Array} blogs blogs
 * @returns {number} 1
 */
// eslint-disable-next-line no-unused-vars -- Dummy test function
function dummy(blogs) {
    return 1;
}

/**
 * Total likes of and array of blogs
 * @param {Array} blogs blogs
 * @returns {number} total likes of and array of blogs
 */
function totalLikes(blogs) {
    return blogs
        .reduce((total, current) => total + current.likes, 0);
}

/**
 * Find the most liked blog
 * @param {Array} blogs blogs
 * @returns {Object} most liked blog
 */
function favoriteBlog(blogs) {
    if (blogs.length === 0) {
        return null;
    }

    let maxLikes = 0;

    blogs
        .forEach(blog => {
            if (maxLikes < blog.likes) {
                maxLikes = blog.likes;
            }
        });

    const favBlog = blogs
        .find(blog => blog.likes === maxLikes);

    return {
        title: favBlog.title,
        author: favBlog.author,
        likes: favBlog.likes
    };
}

/**
 * Find the author with most blogs
 * @param {Array} blogs blogs
 * @returns {Object} the author with most blogs
 */
function mostBlogs(blogs) {
    if (blogs.length === 0) {
        return null;
    }

    const groupedByAuthor = _.groupBy(blogs, "author");

    const authorBlogsCount = _.map(groupedByAuthor, (blgs, author) => ({
        author,
        blogs: blgs.length
    }));

    return _.maxBy(authorBlogsCount, "blogs");
}

/**
 * Find the author with most blog likes
 * @param {Array} blogs blogs
 * @returns {Object} the author with most blog likes
 */
function mostLikes(blogs) {
    if (blogs.length === 0) {
        return null;
    }

    const groupedByAuthor = _.groupBy(blogs, "author");

    const authorBlogsCount = _.map(groupedByAuthor, (blgs, author) => ({
        author,
        likes: blgs.reduce((total, current) => total + current.likes, 0)
    }));

    return _.maxBy(authorBlogsCount, "likes");
}

export default {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
};
