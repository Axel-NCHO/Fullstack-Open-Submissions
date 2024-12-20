import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = (token) => {
  const request = axios
      .get(baseUrl, {headers: {'Authorization': `Bearer ${token}`}})
  return request.then(response => response.data)
}

const addBlog = (blog, token) => {
  const request = axios
      .post(baseUrl, blog, {headers: {'Authorization': `Bearer ${token}`}})
  return request.then(response => response.data)
}

export default { getAll, addBlog }