import React, { Component } from 'react'
import { debounce } from 'lodash'
import { Tabs } from 'antd'

import './App.css'

import SearchTab from '../SearchTab'
import RatedTab from '../RatedTab'
import ErrorMessage from '../ErrorMessage'
import { MoviesApiProvider } from '../MoviesApiContext'
import MoviesApi from '../../services/MoviesApi'

export default class App extends Component {
  componentDidMount() {
    this.getMovies()
  }

  state = {
    moviesData: [],
    ratingData: [],
    genreData: [],
    totalSearchPages: '',
    totalRatedPages: '',
    search: '',
    loading: true,
    error: false,
    page: 1,
    guestId: localStorage.getItem('guestIdMoviesApi'),
  }

  moviesApi = new MoviesApi()

  onError = () => {
    this.setState({
      error: true,
    })
  }

  getTotalDefaultPages = () => {
    this.moviesApi.totalDefaultMovies().then((res) => {
      if (res > 99) res = 99
      this.setState({
        totalSearchPages: res,
      })
    })
  }

  getTotalSearchPages = () => {
    const search = this.state.search
    this.moviesApi.totalSearchMovies(search).then((res) => {
      if (res > 99) res = 99
      this.setState({
        totalSearchPages: res,
      })
    })
  }

  getTotalRatedPages = () => {
    const guestId = this.state.guestId
    this.moviesApi.totalRating(guestId).then((res) => {
      this.setState({
        totalRatedPages: res,
      })
    })
  }

  getGenre = () => {
    this.moviesApi
      .genresMovies()
      .then((genreData) => {
        this.setState({ genreData })
      })
      .catch(this.onError)
  }

  getMovies = (page = this.state.page) => {
    const search = this.state.search
    this.getGenre()
    this.getGuestId()

    search
      ? this.moviesApi.searchMovies(search, page).then(this.showMovies).then(this.getTotalSearchPages)
      : this.moviesApi.defaultMovies(page).then(this.showMovies).then(this.getTotalDefaultPages).catch(this.onError)
  }

  getPages = (e) => {
    this.getMovies(e)
    this.setState({
      page: e,
      loading: !this.state.loading,
    })
  }

  getGuestId = () => {
    !localStorage.getItem('guestIdMoviesApi') &&
      this.moviesApi
        .guestSession()
        .then((guestId) => {
          localStorage.setItem('guestIdMoviesApi', guestId)
        })
        .catch(this.onError)
  }

  showMovies = (moviesData) => {
    this.moviesApi
      .getRating(this.state.guestId)
      .then((ratingData) => {
        moviesData.forEach((item) => {
          ratingData.forEach((el) => {
            if (item.id === el.id) item.rating = el.rating
          })
        })
        this.setState(() => {
          return {
            moviesData: moviesData,
            ratingData: ratingData,
            loading: false,
          }
        })
      })
      .then(this.getTotalRatedPages)
  }

  debounceSearch = debounce(this.getMovies, 500)

  changeRating = (moviesId, guestId, body) => {
    body >= 0.5 && this.moviesApi.addRating(moviesId, guestId, body).then(setTimeout(this.getMovies, 2000))
    body < 0.5 && this.moviesApi.deleteRating(moviesId, guestId).then(setTimeout(this.getMovies, 2000))
  }

  onInputText = (e) => {
    this.setState({
      search: e.target.value.trimStart(),
    })
    this.debounceSearch()
    this.setState({
      page: 1,
    })
  }

  render() {
    const tabItems = [
      {
        key: 1,
        label: 'Search',
        children: <SearchTab inputText={this.onInputText} getPages={this.getPages} changeRating={this.changeRating} />,
      },
      {
        key: 2,
        label: 'Rated',
        children: <RatedTab changeRating={this.changeRating} getPages={this.getPages} />,
      },
    ]

    return (
      <MoviesApiProvider value={this.state}>
        {this.state.error ? <ErrorMessage /> : <Tabs destroyInactiveTabPane centered items={tabItems} />}
      </MoviesApiProvider>
    )
  }
}
