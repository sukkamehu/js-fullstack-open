import axios from 'axios'
const baseUrl = '/fullstackopen/puhelinluettelo/api/notes'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}


const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => {
    if (Array.isArray(response.data)) {
      return response.data
    } else if (response.data && Array.isArray(response.data.notes)) {
      return response.data.notes
    } else {
      return []
    }
  })
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newObject, config)

  return response.data

}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

export default { getAll, create, update, setToken }
