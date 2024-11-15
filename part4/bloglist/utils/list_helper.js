import _ from "lodash";
import User from "../models/user.js";

const initialBlogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }
];

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

/**
 * Returns all users in db
 * @returns {Array} all users in db
 */
async function usersInDB() {
    const users = await User.find({});

    return users.map(u => u.toJSON());
}

export default {
    initialBlogs,
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
    usersInDB
};
