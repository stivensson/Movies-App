export default class MoviesApi {
  apiBase = 'https://api.themoviedb.org/3/'
  apiKey = 'api_key=3fdae1fc8a70746b361718a81549b033'

  async getResource(url) {
    const res = await fetch(`${this.apiBase}${url}${this.apiKey}`)

    if (!res.ok) {
      throw new Error(`Could not fetch ${this.apiBase}${url}` + `, received ${res.status}`)
    }

    return await res.json()
  }

  async searchMovies(search, page) {
    const res = await this.getResource(`search/movie?query=${search}&page=${page}&`)
    return res.results.map(this.transformData)
  }

  async defaultMovies(page) {
    const res = await this.getResource(`movie/popular?page=${page}&`)
    return res.results.map(this.transformData)
  }

  async genresMovies() {
    const res = await this.getResource('genre/movie/list?')
    return res.genres
  }

  transformData(movies) {
    return {
      id: movies.id,
      poster: movies.poster_path,
      title: movies.title,
      date: movies.release_date,
      genre: movies.genre_ids,
      overview: movies.overview,
    }
  }
}
