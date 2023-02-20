import axios from 'axios'

const ACCESS_TOKEN =
  'paW9vfAwam6XKNjAJxa3VLbwSVYxNTJ00mYtOzQ4wNKDVj4cEOzEqfzbzM4d'

const requestParams = {
  params: {
    access_token: ACCESS_TOKEN,
  },
  headers: {
    'Content-Type': 'application/json',
  },
}

const config = {
  headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
}

const zendoFu = () => {
  axios
    .post('https://zenodo.org/api/deposit/depositions', requestParams, config)
    .then((response) => {
      console.log(response.status)
      // 201
      console.log(response.data)
    })
    .catch((error) => {
      console.log(error.response.data)
    })
}

zendoFu()

export default zendoFu
