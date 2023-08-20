export default class MoviesApi {
  _apiBase = 'https://api.themoviedb.org/3/'
  _apiKey = '&api_key=3fdae1fc8a70746b361718a81549b033'

  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}${this._apiKey}`)

    if (!res.ok) {
      throw new Error(`Could not fetch ${this._apiBase}${url}` + `, received ${res.status}`)
    }

    return await res.json()
  }

  async getMovies(search) {
    const res = await this.getResource(`search/movie?query=${search}`)
    return res.results
  }

  // getPerson(id) {
  //   return this.getResource(`people/${id}/`)
  // }

  // async getAllStarships() {
  //   const res = await this.getResource('starships/')
  //   return res.results
  // }

  // getStarship(id) {
  //   return this.getResource(`starships/${id}/`)
  // }

  // async getAllPlanets() {
  //   const res = await this.getResource('planets/')
  //   return res.results
  // }

  // getPlanet(id) {
  //   return this.getResource(`planets/${id}/`)
  // }
}
