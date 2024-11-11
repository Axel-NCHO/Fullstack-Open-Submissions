import axios from "axios";

const baseUrl = "/api/persons";

const getAll = () => {
    return axios
        .get(baseUrl)
        .then(res => res.data)
}

const createPerson = (person) => {
    return axios
        .post(baseUrl, person)
        .then(res => res.data)
}

const updatePerson = (id, person) => {
    return axios
        .put(`${baseUrl}/${id}`, person)
        .then(res => res.data)
}

const deletePerson = (id) => {
    return axios
        .delete(`${baseUrl}/${id}`)
        .then(res => res.data)
}

export default { getAll, createPerson, updatePerson, deletePerson }