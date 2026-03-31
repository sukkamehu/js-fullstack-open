import axios from 'axios'
const baseUrl = '/fullstackopen/puhelinluettelo/api/notes'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export default { getAll }