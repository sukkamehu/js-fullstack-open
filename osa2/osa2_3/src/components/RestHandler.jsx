import axios from 'axios'

const baseUrl =  'http://localhost:8888/fullstackopen/puhelinluettelo/api/notes'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (personObject) => {
    const request = axios.post(baseUrl, personObject)
    return request.then(response => response.data)
      .catch(error => {
        console.error('Create error:', error)
        throw error
      })
}

const patch = (id, newObject) => {
    const request = axios.patch(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
      .catch(error => {
        console.error('Patch error:', error)
        throw error
      })
}

const remove = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(() => id)
      .catch(error => {
        console.error('Delete error:', error)
        throw error
      })
}

const personService = { getAll, create, remove, patch } 

export default personService