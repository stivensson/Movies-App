import React from 'react'
import { Spin } from 'antd'

import './CardList.css'

import Cards from '../Cards'
import { MoviesApiConsumer } from '../MoviesApiContext'

const CardList = ({ changeRating, data }) => {
  return (
    <MoviesApiConsumer>
      {({ loading, genreData }) => {
        return (
          <div className="card-list">
            {data.map((item) => (
              <Spin spinning={loading} tip="Загрузка..." size="large" key={item.id}>
                <Cards
                  poster={item.poster_path}
                  title={item.title}
                  date={item.release_date}
                  genre={item.genre_ids}
                  overview={item.overview}
                  genreData={genreData}
                  allRating={item.vote_average}
                  rating={item.rating}
                  changeRating={changeRating}
                  moviesId={item.id}
                />
              </Spin>
            ))}
          </div>
        )
      }}
    </MoviesApiConsumer>
  )
}

export default CardList
