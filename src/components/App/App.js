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
    this.getGuestId()
    this.getGenre()
  }

  state = {
    moviesData: [],
    ratingData: [],
    genreData: [],
    totalSearchPages: '',
    totalRatedPages: '',
    search: '',
    loading: true,
    errorConnect: false,
    error: false,
    page: 1,
  }

  moviesApi = new MoviesApi()

  onErrorConnect = () => {
    this.setState({
      errorConnect: true,
    })
  }

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
    const guestId = localStorage.getItem('guestIdMoviesApi')
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
      .catch(this.onErrorConnect)
  }

  getMovies = (page = this.state.page) => {
    const search = this.state.search

    if (search) {
      this.moviesApi.searchMovies(search, page).then(this.showMovies).then(this.getTotalSearchPages).catch(this.onError)
    } else {
      this.moviesApi
        .defaultMovies(page)
        .then(this.showMovies)
        .then(this.getTotalDefaultPages)
        .catch(this.onErrorConnect)
    }
  }

  getPages = (e) => {
    this.getMovies(e)
    this.setState({
      page: e,
      loading: !this.state.loading,
    })
  }

  getGuestId = async () => {
    !localStorage.getItem('guestIdMoviesApi') &&
      (await this.moviesApi
        .guestSession()
        .then((guestId) => {
          localStorage.setItem('guestIdMoviesApi', guestId)
        })
        .catch(this.onErrorConnect))

    this.getMovies()
  }

  showMovies = (moviesData) => {
    const guest = localStorage.getItem('guestIdMoviesApi')

    this.moviesApi
      .getRating(guest)
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

  changeRating = (moviesId, body) => {
    const guestId = localStorage.getItem('guestIdMoviesApi')
    body >= 0.5 &&
      this.moviesApi.addRating(moviesId, guestId, body).then(setTimeout(this.getMovies, 2000)).catch(this.onError)
    body < 0.5 &&
      this.moviesApi.deleteRating(moviesId, guestId).then(setTimeout(this.getMovies, 2000)).catch(this.onError)
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
        {this.state.errorConnect ? <ErrorMessage /> : <Tabs destroyInactiveTabPane centered items={tabItems} />}
      </MoviesApiProvider>
    )
  }
}
