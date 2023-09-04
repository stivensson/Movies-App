import React, { Component } from 'react'
import { debounce } from 'lodash'
import { Tabs } from 'antd'

import './App.css'

import SearchTab from '../SearchTab'
import RatedTab from '../RatedTab'
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
    guestId: localStorage.getItem('guestIdMoviesApi'),
    ratingData: [],
  }

  moviesApi = new MoviesApi()

  getGenre = () => {
    this.moviesApi.genresMovies().then((genreData) => {
      this.setState({ genreData })
    })
  }

  getMovies = (page = this.state.page) => {
    const search = this.state.search
    this.getGenre()
    this.getGuestId()

    search
      ? this.moviesApi.searchMovies(search, page).then(this.showMovies)
      : this.moviesApi.defaultMovies(page).then(this.showMovies)
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
      this.moviesApi.guestSession().then((guestId) => {
        localStorage.setItem('guestIdMoviesApi', guestId)
      })
  }

  showMovies = (moviesData) => {
    this.moviesApi.getRating(this.state.guestId).then((ratingData) => {
      this.setState(() => {
        moviesData.forEach((item) => {
          ratingData.forEach((el) => {
            if (item.id === el.id) item.rating = el.rating
          })
        })

        return {
          moviesData: moviesData,
          ratingData: ratingData,
          loading: false,
        }
      })
    })
  }

  debounceSearch = debounce(this.getMovies, 500)
  debounceRating = debounce(this.getMovies, 2000)

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
        children: <RatedTab changeRating={this.changeRating} />,
      },
    ]

    return (
      <MoviesApiProvider value={this.state}>
        <>
          <Tabs destroyInactiveTabPane centered items={tabItems} />
        </>
      </MoviesApiProvider>
    )
  }
}
