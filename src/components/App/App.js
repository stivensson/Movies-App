import React, { Component } from 'react'
import { Pagination, Input } from 'antd'
import { debounce } from 'lodash'

import './App.css'

import CardList from '../CardList'
import GenreList from '../GenreList'
import { MoviesApiProvider } from '../MoviesApiContext'
import MoviesApi from '../../services/MoviesApi'

export default class App extends Component {
  componentDidMount() {
    this.getMovies()
  }

  state = {
    moviesData: [],
    loading: true,
    page: 1,
    search: '',
    genreData: [],
  }

  moviesApi = new MoviesApi()

  showMovies = (moviesData) => {
    this.setState({
      moviesData,
      loading: false,
      genreData: [],
    })
  }

  getGenre() {
    this.moviesApi.genresMovies().then((genreData) => {
      this.setState({ genreData })
    })
  }

  getMovies(page = this.state.page) {
    const search = this.state.search
    search
      ? this.moviesApi.searchMovies(search, page).then(this.showMovies)
      : this.moviesApi.defaultMovies(page).then(this.showMovies) && this.getGenre()
  }

  getPages = (e) => {
    this.getMovies(e)
    this.setState({
      page: e,
      loading: !this.state.loading,
    })
  }

  debounceFn = debounce(this.getMovies, 500)

  onInputText = (e) => {
    this.setState({
      search: e.target.value.trimStart(),
    })
    this.debounceFn()
    this.setState({
      page: 1,
    })
  }

  render() {
    return (
      <MoviesApiProvider value={this.state}>
        <section>
          <Input
            style={{ marginBottom: 20 }}
            placeholder="Type to search..."
            value={this.state.search}
            onChange={this.onInputText}
          />
          <GenreList />
          <CardList />
          <div className="pagination">
            <Pagination
              showSizeChanger={false}
              defaultCurrent={1}
              current={this.state.page}
              total={100}
              onChange={this.getPages}
            />
          </div>
        </section>
      </MoviesApiProvider>
    )
  }
}
