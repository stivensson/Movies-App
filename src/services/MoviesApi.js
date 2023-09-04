export default class MoviesApi {
  apiBase = 'https://api.themoviedb.org/3/'
  apiKey = 'api_key=3fdae1fc8a70746b361718a81549b033'

  async resource(url) {
    const res = await fetch(`${this.apiBase}${url}${this.apiKey}`)

    if (!res.ok) {
      throw new Error(`Could not fetch ${this.apiBase}${url}` + `, received ${res.status}`)
    }

    return await res.json()
  }

  async addRating(moviesId, guestId, body) {
    await fetch(`${this.apiBase}movie/${moviesId}/rating?guest_session_id=${guestId}&${this.apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: body }),
    })
  }

  async deleteRating(moviesId, guestId) {
    await fetch(`${this.apiBase}movie/${moviesId}/rating?guest_session_id=${guestId}&${this.apiKey}`, {
      method: 'DELETE',
    })
  }

  async getRating(guestId) {
    const res = await this.resource(`guest_session/${guestId}/rated/movies?`)
    return res.results.map(this.transformData)
  }

  async searchMovies(search, page) {
    const res = await this.resource(`search/movie?query=${search}&page=${page}&`)
    return res.results.map(this.transformData)
  }

  async defaultMovies(page) {
    const res = await this.resource(`movie/popular?page=${page}&`)
    return res.results.map(this.transformData)
  }

  async genresMovies() {
    const res = await this.resource('genre/movie/list?')
    return res.genres
  }

  async guestSession() {
    const res = await this.resource('authentication/guest_session/new?')
    return res.guest_session_id
  }

  transformData(movies) {
    return {
      id: movies.id,
      poster: movies.poster_path,
      title: movies.title,
      date: movies.release_date,
      genre: movies.genre_ids,
      overview: movies.overview,
      allRating: movies.vote_average,
      rating: movies.rating,
    }
  }
}
