import React, { Component } from 'react'
import { Col, Row } from 'antd'

import './CardList.css'

import Cards from '../Cards/Cards'
import MoviesApi from '../../services/MoviesApi'

export default class CardList extends Component {
  constructor() {
    super(), this.searchMovies()
  }

  state = {
    cardData: [],
  }

  moviesApi = new MoviesApi()

  searchMovies() {
    const search = 'return'
    this.moviesApi.getMovies(search).then((movies) => {
      this.setState({
        cardData: movies,
      })
    })
  }

  render() {
    return (
      <Row gutter={[48, 48]}>
        {this.state.cardData &&
          this.state.cardData.map((item) => (
            <Col span={12} key={item.id}>
              <Cards
                poster={item.poster_path}
                title={item.title}
                date={item.release_date}
                genre={item.genre_ids}
                overview={item.overview}
              />
            </Col>
          ))}
      </Row>
    )
  }
}
