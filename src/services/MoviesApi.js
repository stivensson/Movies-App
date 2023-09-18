export default class MoviesApi {
  url = new URL('https://api.themoviedb.org')
  apiKey = '3fdae1fc8a70746b361718a81549b033'

  async resStatus(res, url) {
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`)
    }

    return await res.json()
  }

  async addRating(moviesId, guestId, body) {
    const newUrl = new URL(`/3/movie/${moviesId}/rating`, this.url)
    newUrl.searchParams.set('guest_session_id', guestId)
    newUrl.searchParams.set('api_key', this.apiKey)

    await fetch(newUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: body }),
    }).then((res) => this.resStatus(res, newUrl))
  }

  async deleteRating(moviesId, guestId) {
    const newUrl = new URL(`//movie/${moviesId}/rating`, this.url)
    newUrl.searchParams.set('guest_session_id', guestId)
    newUrl.searchParams.set('api_key', this.apiKey)

    await fetch(newUrl, {
      method: 'DELETE',
    }).then((res) => this.resStatus(res, newUrl))
  }

  async getRating(guestId) {
    const newUrl = new URL(`/3/guest_session/${guestId}/rated/movies`, this.url)
    newUrl.searchParams.set('api_key', this.apiKey)

    const res = await fetch(newUrl).then((res) => this.resStatus(res, newUrl))
    return res.results
  }

  async totalRating(guestId) {
    const newUrl = new URL(`/3/guest_session/${guestId}/rated/movies`, this.url)
    newUrl.searchParams.set('api_key', this.apiKey)

    const res = await fetch(newUrl).then((res) => this.resStatus(res, newUrl))
    return res.total_pages
  }

  async searchMovies(search, page) {
    const newUrl = new URL('/3/search/movie', this.url)
    newUrl.searchParams.set('query', search)
    newUrl.searchParams.set('page', page)
    newUrl.searchParams.set('api_key', this.apiKey)

    const res = await fetch(newUrl).then((res) => this.resStatus(res, newUrl))

    return res.results
  }

  async totalSearchMovies(search) {
    const newUrl = new URL('/3/search/movie', this.url)
    newUrl.searchParams.set('query', search)
    newUrl.searchParams.set('api_key', this.apiKey)

    const res = await fetch(newUrl).then((res) => this.resStatus(res, newUrl))
    return res.total_pages
  }

  async defaultMovies(page) {
    const newUrl = new URL('/3/movie/popular', this.url)
    newUrl.searchParams.set('page', page)
    newUrl.searchParams.set('api_key', this.apiKey)

    const res = await fetch(newUrl).then((res) => this.resStatus(res, newUrl))

    return res.results
  }

  async totalDefaultMovies() {
    const newUrl = new URL('/3/movie/popular', this.url)
    newUrl.searchParams.set('api_key', this.apiKey)

    const res = await fetch(newUrl).then((res) => this.resStatus(res, newUrl))
    return res.total_pages
  }

  async genresMovies() {
    const newUrl = new URL('/3/genre/movie/list', this.url)
    newUrl.searchParams.set('api_key', this.apiKey)

    const res = await fetch(newUrl).then((res) => this.resStatus(res, newUrl))
    return res.genres
  }

  async guestSession() {
    const newUrl = new URL('/3/authentication/guest_session/new', this.url)
    newUrl.searchParams.set('api_key', this.apiKey)

    const res = await fetch(newUrl).then((res) => this.resStatus(res, newUrl))
    return res.guest_session_id
  }
}
