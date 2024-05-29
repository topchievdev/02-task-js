const api = axios.create({
  baseURL: 'https://currency-exchange.p.rapidapi.com',
  headers: {
    'x-rapidapi-key': 'debcbf42ffmshdcd00406cd701a8p1744a0jsnd8970e5a1ab8',
    'x-rapidapi-host': 'currency-exchange.p.rapidapi.com'
  }
})

export const getCurrency = async ({ from, to = 'rub', q = '1.0' }) => {
  try {
    const response = await api.get('/exchange', {
      params: {
        from,
        to,
        q
      }
    })

    return response
  } catch (e) {
    console.log(e)
  }
}
