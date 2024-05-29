const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
})

export const getPhotos = async (_limit) => {
  try {
    const response = await api.get('/photos', {
      params: {
        _limit
      }
    })

    return response.data
  } catch (e) {
    console.log(e)
  }
}
